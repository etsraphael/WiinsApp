import * as ActionTypes from './constants'
import { AsyncStorage } from 'react-native'
import { uploadImageFile, uploadVideoFile, getFileNameUploaded } from '../../app/services/upload/upload'
import { v4 as uuidv4 } from 'uuid';

export function addPublication(payload) {
    return { type: ActionTypes.ADD_PUBLICATIONS_PENDING, payload }
}

export function addPublicationFail(error) {
    return { type: ActionTypes.ADD_PUBLICATIONS_PENDING_FAIL, payload: error }
}

export function addPublicationSuccess() {
    return { type: ActionTypes.ADD_PUBLICATIONS_PENDING_SUCCESS }
}

export function cancelPublication(date) {
    return { type: ActionTypes.CANCEL_PUBLICATION, date }
}

export function publicationPosted(date) {
    return { type: ActionTypes.PUBLICATION_ADDED, date }
}

export function cancelPublicationActions(date) {
    return (dispatch) => dispatch(cancelPublication(date))
}

export function addPublicationInPendingList(publication) {
    return async (dispatch) => {
        try {
            await dispatch(addPublication(publication))
            return dispatch(sendPublication(publication))
        } catch (error) {
            return dispatch(addPublicationFail(error));
        }
    }
}

export function addPublicationStoryInPendingList(publication) {
    return async (dispatch) => {
        try {
            await dispatch(addPublication(publication))
            return dispatch(sendStoryPublication(publication))
        } catch (error) {
            return dispatch(addPublicationFail(error));
        }
    }
}

export function sendStoryPublication(publication) {
    return async (dispatch) => {
        try {
            const token = await AsyncStorage.getItem('userToken')
            const url = 'https://wiins-backend.herokuapp.com/stories/post'

            switch (publication.type) {
                case 'PostStory': return dispatch(sendPostStory(publication, token, url))
                case 'PictureStory': return dispatch(sendPictureStory(publication, token, url))
                case 'VideoStory': return dispatch(sendVideoStory(publication, token, url))
            }
        } catch (error) {
            return dispatch(addPublicationFail(error));
        }
    }
}

export function sendPublication(publication) {
    return async (dispatch) => {
        try {

            const token = await AsyncStorage.getItem('userToken')
            const url = 'https://wiins-backend.herokuapp.com/publication'

            switch (publication.type) {
                case 'PostPublication': return dispatch(sendPostPublication(publication, token, url))
                case 'PicturePublication': return dispatch(sendPublication(publication, token, url))
                case 'PublicationVideo': return dispatch(sendVideoPublication(publication, token, url))
            }

        } catch (error) {
            return dispatch(addPublicationFail(error));
        }
    }
}

// type of publication to send

export function sendPostPublication(publication, token, url) {

    return async (dispatch) => {
        return fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(publication)
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.status == 201) return dispatch(publicationPosted(publication.savingDate))
                return dispatch(addPublicationFail(error))
            })
    }

}

export function sendPublication(publicationReceived, token, url) {

    return async (dispatch) => {
        try {

            const picture = await uploadPicture(publicationReceived.file, token, 'dev-eps-file-wiins-image')
            if (!picture) return null

            const publication = { ...publicationReceived, file: picture }

            return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(publication)
            })
                .then((response) => response.json())
                .then((response) => {
                    console.log(response)
                    if (response.status == 201) return dispatch(publicationPosted(publicationReceived.savingDate))
                    return dispatch(addPublicationFail(error))
                })
                .catch((error) => dispatch(addPublicationFail(error)))

        }
        catch (error) {
            return dispatch(addPublicationFail(error))
        }

    }
}

export function sendVideoPublication(publicationReceived, token, url) {
    return async (dispatch) => {
        try {

            const picture = await uploadPicture(publicationReceived.filePicture, token, 'dev-eps-file-wiins-poster')
            const video = await uploadVideo(publicationReceived.fileVideo, token, 'dev-eps-file-wiins-video')

            if (!picture || !video) return null
            const publication = { ...publicationReceived, poster: picture, file: video }

            return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(publication)
            })
                .then((response) => response.json())
                .then((response) => {
                    if (response.status == 201) return dispatch(publicationPosted(publicationReceived.savingDate))
                    return dispatch(addPublicationFail(error))
                }).catch((error) => dispatch(addPublicationFail(error)))
        }
        catch (error) {
            return dispatch(addPublicationFail(error))
        }

    }


}

export function sendPostStory(publication, token, url) {

    return async (dispatch) => {
        return fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(publication)
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response)
                if (response.status == 201) return dispatch(publicationPosted(publication.savingDate))
                return dispatch(addPublicationFail(response))
            })
    }

}

export function sendPictureStory(publicationReceived, token, url) {
    return async (dispatch) => {
        try {

            const picture = await uploadPicture(publicationReceived.file, token, 'eps-file-story-picture')
            if (!picture) return null

            const publication = { ...publicationReceived, file: picture }

            return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(publication)
            })
                .then((response) => response.json())
                .then((response) => {
                    console.log(response)
                    if (response.status == 201) return dispatch(publicationPosted(publicationReceived.savingDate))
                    return dispatch(addPublicationFail(error))
                })
                .catch(() => dispatch(addPublicationFail(response.status)))

        }
        catch (error) {
            return dispatch(addPublicationFail(error))
        }

    }
}

export function sendVideoStory(publicationReceived, token, url) {

    return async (dispatch) => {
        try {

            // upload the file
            const picture = await uploadPicture(publicationReceived.filePicture, token, 'eps-file-story-video-poster')
            const video = await uploadVideo(publicationReceived.fileVideo, token, 'eps-file-story-video')
            if (!picture || !video) return null

            const publication = { ...publicationReceived, poster: picture, file: video }

            return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(publication)
            })
                .then((response) => response.json())
                .then((response) => {
                    if (response.status == 201) return dispatch(publicationPosted(publicationReceived.savingDate))
                    return dispatch(addPublicationFail(response))
                })
        }
        catch (error) {
            return dispatch(addPublicationFail(error))
        }

    }
}

export async function uploadPicture(file, token, bucketName) {

    const fileKey = uuidv4()
    const urlSigned = { Bucket: bucketName, Key: fileKey, ContentType: 'image/jpg' }

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
                } else return dispatch(addPublicationFail(picture.status))
            } else return dispatch(addPublicationFail(response.status))
        })


}

export async function uploadVideo(file, token, bucketName) {

    const fileKey = uuidv4()
    const urlSigned = { Bucket: bucketName, Key: fileKey, ContentType: 'video/mp4' }

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
                const video_response = await uploadVideoFile(response.url, file)
                if (video_response.respInfo.status == 200) {
                    return getFileNameUploaded(bucketName, fileKey)
                } else return dispatch(addPublicationFail(video_response.status))
            } else return dispatch(addPublicationFail(response.status))
        })
}