import { GET_MY_PROFILE, GET_MY_PROFILE_SUCCESS, GET_MY_PROFILE_FAIL, EDIT_PROFILE_PHOTO, EDIT_PROFILE_PHOTO_SUCCESS, EDIT_COVER_PHOTO, EDIT_COVER_PHOTO_SUCCESS } from './constants'
import AsyncStorage from '@react-native-community/async-storage'
import { sendError } from './../../../app/services/error/error-service'
import { uploadImageFile, getFileNameUploaded } from '../../../app/services/upload/upload'
import { v4 as uuidv4 } from 'uuid';

export function editProfilePhotoSuccess(url) {
    return {
        type: EDIT_PROFILE_PHOTO_SUCCESS, url
    }
}

export function editProfilePhotoStart() {
    return { type: EDIT_PROFILE_PHOTO }
}

export function editProfilePhotoFail(error) {
    return {
        type: EDIT_PROFILE_PHOTO_FAIL,
        payload: error,
    }
}

export function editCoverPhotoSuccess(url) {
    return {
        type: EDIT_COVER_PHOTO_SUCCESS, url
    }
}

export function editCoverPhotoStart() {
    return { type: EDIT_COVER_PHOTO }
}

export function editCoverPhotoFail(error) {
    return {
        type: EDIT_COVER_PHOTO_FAIL,
        payload: error,
    }
}

export function getMyProfileSuccess(profile) {
    return {
        type: GET_MY_PROFILE_SUCCESS,
        payload: profile,
    }
}

export function getMyProfileStart() {
    return { type: GET_MY_PROFILE }
}

export function getMyProfileFail(error) {
    return {
        type: GET_MY_PROFILE_FAIL,
        payload: error,
    }
}

export function getMyProfile() {
    return async (dispatch) => {
        try {
            dispatch(getMyProfileStart())
            const token = await AsyncStorage.getItem('userToken')
            return fetch('https://wiins-backend.herokuapp.com/myprofile', {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((response) => response.json())
                .then(async (response) => {
                    if (response.status == 200) {
                        return dispatch(getMyProfileSuccess(response.profile))
                    }
                    return dispatch(getMyProfileFail(response.message))
                })
        } catch (error) {
            sendError(error)
            return dispatch(getMyProfileFail(error));
        }
    };
}

export function editPhotoProfile(url) {
    return async (dispatch) => {
        try {

            dispatch(editProfilePhotoStart())

            const token = await AsyncStorage.getItem('userToken')
            const link = await uploadPicture(url, token, 'eps-file-avatar')
            if (!link) return null

            return fetch('https://wiins-backend.herokuapp.com/profile/updatePicture/avatar', {
                method: 'POST',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({ link })
            })
                .then((response) => response.json())
                .then(async (response) => {
                    if (response.status == 202) {
                        return dispatch(editProfilePhotoSuccess(url))
                    }
                    return dispatch(editProfilePhotoFail(response.message));
                })

        } catch (error) {
            sendError(error)
            return dispatch(editProfilePhotoFail(error));
        }
    };
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
                } else return null
            } else return null
        })


}