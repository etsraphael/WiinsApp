import * as ActionTypes from './constants'
import AsyncStorage from '@react-native-community/async-storage'
import { uploadImageFile, uploadVideoFile, getFileNameUploaded } from '../../../app/services/upload/upload'
import { v4 as uuidv4 } from 'uuid';
import { sendError } from './../../../app/services/error/error-service'
import { updateWithMyNewStory } from './../Stories/actions'
import { addOnePublicationOnFeed } from './../FeedPublications/actions'

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

export function deleteItemInPendingList(date) {
    return { type: ActionTypes.DELETE_ITEM_IN_PENDING_LIST, date }
}

export function cancelPublicationActions(date) {
    return (dispatch) => dispatch(cancelPublication(date))
}

export function addPublicationInPendingList(publication, refreshPage) {
    return async (dispatch) => {
        try {
            await dispatch(addPublication(publication))
            return dispatch(sendPublication(publication, refreshPage))
        } catch (error) {
            sendError(error)
            return dispatch(addPublicationFail(error));
        }
    }
}

export function addPublicationStoryInPendingList(publication, refreshStory) {
    return async (dispatch, props) => {
        try {
            await dispatch(addPublication(publication))
            return dispatch(sendStoryPublication(
                publication,
                props().MyProfile.profile._id,
                refreshStory
            ))
        } catch (error) {
            sendError(error)
            return dispatch(addPublicationFail(error));
        }
    }
}

export function sendStoryPublication(publication, myProfileId, refreshStory) {
    return async (dispatch) => {
        try {
            const token = await AsyncStorage.getItem('userToken')
            const url = 'https://wiins-backend.herokuapp.com/stories/post'

            switch (publication.type) {
                case 'PostStory': return dispatch(sendPostStory(publication, token, url, myProfileId, refreshStory))
                case 'PictureStory': return dispatch(sendPictureStory(publication, token, url, myProfileId, refreshStory))
                case 'VideoStory': return dispatch(sendVideoStory(publication, token, url, myProfileId, refreshStory))
            }
        } catch (error) {
            return dispatch(addPublicationFail(error));
        }
    }
}

export function sendPublication(publication, refreshPage) {
    return async (dispatch) => {
        try {

            const token = await AsyncStorage.getItem('userToken')
            const url = 'https://wiins-backend.herokuapp.com/publication'

            switch (publication.type) {
                case 'PostPublication': return dispatch(sendPostPublication(publication, token, url, refreshPage))
                case 'PicturePublication': return dispatch(sendImagePublication(publication, token, url, refreshPage))
                case 'PublicationVideo': return dispatch(sendVideoPublication(publication, token, url, refreshPage))
            }

        } catch (error) {
            return dispatch(addPublicationFail(error));
        }
    }
}

// send publications

export function sendPostPublication(publication, token, url, refreshPage) {
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
            .then(async (response) => {
                if (response.status == 201) {

                    // update the feed
                    await dispatch(addOnePublicationOnFeed(response.publication))

                    // refresh the page
                    refreshPage()

                    return dispatch(deleteItemInPendingList(publication.savingDate))
                }
                return dispatch(addPublicationFail(error))
            })
    }

}

export function sendImagePublication(publicationReceived, token, url, refreshPage) {
    return async (dispatch) => {
        try {

            const picture = await uploadPicture(publicationReceived.file, token, 'eps-file-feed-publication-image')
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
                .then(async (response) => {
                    if (response.status == 201) {

                        // update the feed
                        await dispatch(addOnePublicationOnFeed(response.publication))

                        // refresh the page
                        refreshPage()

                        return dispatch(deleteItemInPendingList(publication.savingDate))
                    }
                    return dispatch(addPublicationFail(error))
                })
                .catch((error) => dispatch(addPublicationFail(error)))

        }
        catch (error) {
            return dispatch(addPublicationFail(error))
        }

    }
}

export function sendVideoPublication(publicationReceived, token, url, refreshPage) {
    return async (dispatch) => {
        try {

            const picture = await uploadPicture(publicationReceived.filePicture, token, 'eps-file-feed-publication-poster')
            const video = await uploadVideo(publicationReceived.fileVideo, token, 'eps-file-feed-publication-video')

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
                .then(async (response) => {
                    if (response.status == 201) {

                        // update the feed
                        await dispatch(addOnePublicationOnFeed(response.publication))

                        // refresh the page
                        refreshPage()

                        return dispatch(deleteItemInPendingList(publication.savingDate))
                    }
                    return dispatch(addPublicationFail(error))
                }).catch((error) => dispatch(addPublicationFail(error)))
        }
        catch (error) {
            return dispatch(addPublicationFail(error))
        }

    }


}

// send stories

export function sendPostStory(publication, token, url, myProfileId, refreshStory) {

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
            .then(async (response) => {
                if (response.status == 201) {

                    // udpate the stories trending
                    await dispatch(updateWithMyNewStory(publication, myProfileId))

                    // update the personal story
                    await refreshStory()

                    // delete the item in the pending list
                    return dispatch(deleteItemInPendingList(publication.savingDate))
                }
                return dispatch(addPublicationFail(response))
            })
    }

}

export function sendPictureStory(publicationReceived, token, url, myProfileId, refreshStory) {
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
                .then(async (response) => {
                    if (response.status == 201) {

                        // udpate the stories trending
                        await dispatch(updateWithMyNewStory(publication, myProfileId))

                        // update the personal story
                        await refreshStory()

                        // delete the item in the pending list
                        return dispatch(deleteItemInPendingList(publication.savingDate))
                    }
                    return dispatch(addPublicationFail(error))
                })
                .catch(() => dispatch(addPublicationFail(response.status)))

        }
        catch (error) {
            return dispatch(addPublicationFail(error))
        }

    }
}

export function sendVideoStory(publicationReceived, token, url, myProfileId, refreshStory) {

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
                .then(async (response) => {
                    if (response.status == 201) {

                        // udpate the stories trending
                        await dispatch(updateWithMyNewStory(publication, myProfileId))

                        // update the personal story
                        await refreshStory()

                        // delete the item in the pending list
                        return dispatch(deleteItemInPendingList(publication.savingDate))
                    }
                    return dispatch(addPublicationFail(response))
                })
        }
        catch (error) {
            return dispatch(addPublicationFail(error))
        }

    }
}

// upload files

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