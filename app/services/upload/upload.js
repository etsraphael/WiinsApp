import { RNFFmpeg } from 'react-native-ffmpeg'
import * as RNFS from 'react-native-fs'
import RNFetchBlob from 'rn-fetch-blob'
import ImageResizer from 'react-native-image-resizer'
import { Image } from 'react-native'
import { v4 as uuidv4 } from 'uuid'
import AsyncStorage from '@react-native-community/async-storage'

// to get the file name uploaded
export function getFileNameUploaded(bucketName, id) {
    const amazonlink = '.s3.eu-west-3.amazonaws.com/'
    return `https://${bucketName}${amazonlink}${id}`
}

// to get the dimensions of the image
export async function getImageDimensions(imageUri) {
    return new Promise((resolve, reject) => {
        Image.getSize(imageUri, (width, height) => {
            resolve({ width, height });
        }, error => reject(error));
    }
    )
}

// to upload a image file
export async function uploadImageFile(link, file) {

    const dimensions = await getImageDimensions(file)

    return ImageResizer.createResizedImage(file, dimensions.width, dimensions.height, 'JPEG', 70, 0, null)
        .then(async (response) => {
            const resp = await fetch(response.uri);
            const imageBody = await resp.blob();
            return fetch(link, { method: 'PUT', headers: { 'Content-Type': 'image/jpg' }, body: imageBody })
        })

}

// to upload a image with the signed Url
export async function uploadImageFileWithSignedUrl(bucketName, file) {

    const fileKey = uuidv4()
    const urlSigned = { Bucket: bucketName, Key: fileKey, ContentType: 'image/jpg' }
    const token = await AsyncStorage.getItem('userToken')


    return fetch('https://wiins-backend.herokuapp.com/fs/getSignedUrl', {
        method: 'POST',
        headers: {
            Accept: 'application/json', 'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ urlSigned })
    })
        .then((response) => response.json())
        .then(async (response) => {
            if (response.status == 200) {
                const picture_response = await uploadImageFile(response.url, file)
                if (picture_response.status == 200) {
                    return getFileNameUploaded(bucketName, fileKey)
                } else return null
            } else return null
        })
}

// to upload a video file
export function uploadVideoFile(link, uri) {
    const name = '' + Math.random().toString(36).substr(2, 9) + '.mp4'
    return RNFFmpeg.execute(`-i ${uri} -vcodec h264 -acodec mp2 ${RNFS.DocumentDirectoryPath + "/" + name}`)
        .then(() => sendFormatMP4((RNFS.DocumentDirectoryPath + "/" + name), link))
}

// to compress the video to an mp4
export function sendFormatMP4(uri, link) {
    return RNFetchBlob.fetch('PUT', link, { 'Content-Type': 'video/mp4' }, RNFetchBlob.wrap(uri));
}