import * as ActionTypes from './constants'
import AsyncStorage from '@react-native-community/async-storage'
import { verificationMusicCacheFormat } from './../../app/services/cache/cache-music-service'
import { addMusicAfterLiked, pullMusicAfterDisliked } from './../MyFavMusic/actions'

export function startOfUpload() {
    return { type: ActionTypes.START_OF_UPLOAD_PLAYLIST }
}

export function endOfUpload() {
    return { type: ActionTypes.END_OF_UPLOAD_PLAYLIST }
}

export async function getMusicPlaylistSuccess(payload) {

    payload = {
        ...payload,
        musicList: await verificationMusicCacheFormat(payload.musicList)
    }

    return { type: ActionTypes.GET_MUSIC_PLAYLIST_SUCCESS, payload }
}

export function getMusicPlaylistStart() {
    return { type: ActionTypes.GET_MUSIC_PLAYLIST }
}

export function getMusicPlaylistFail(error) {
    return {
        type: ActionTypes.GET_MUSIC_PLAYLIST_FAIL,
        payload: error,
    }
}

export function setMusicPlaylistInTheCache(url) {
    return { type: ActionTypes.SET_MUSIC_PLAYLIST_IN_CACHE, url }
}

export function setMusicPlaylistInTheCacheSuccess(url) {
    return { type: ActionTypes.SET_MUSIC_PLAYLIST_IN_CACHE_SUCCESS, url }
}

export function setMusicPlaylistInTheCacheFail(url) {
    return { type: ActionTypes.SET_MUSIC_PLAYLIST_IN_CACHE_FAIL, url }
}

export function resetMusicPlaylist() {
    return { type: ActionTypes.RESET_MUSIC_PLAYLIST }
}

export function getMusicPlaylist(id) {
    return async (dispatch) => {
        try {
            dispatch(resetMusicPlaylist())
            dispatch(getMusicPlaylistStart())
            const url = 'https://wiins-backend.herokuapp.com/music/playlist/' + id
            const token = await AsyncStorage.getItem('userToken')

            return fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
                .then((response) => response.json())
                .then(async (response) => {
                    if (response.status == 200) {
                        return dispatch(await getMusicPlaylistSuccess(response.playlist))
                    }
                    return dispatch(getMusicPlaylistFail(response.message))
                })
        } catch (error) {
            return dispatch(getMusicPlaylistFail(error));
        }
    }
}

export function startOfUploadPlaylistActions() {
    return async (dispatch) => dispatch(startOfUpload())
}

export function endOfUploadPlaylistActions() {
    return async (dispatch) => dispatch(endOfUpload())
}

export function setMusicPlaylistInTheCacheAction(url) {
    return async (dispatch) => dispatch(setMusicPlaylistInTheCache(url))
}

export function setMusicPlaylistInTheCacheActionSuccess(url) {
    return async (dispatch) => dispatch(setMusicPlaylistInTheCacheSuccess(url))
}

export function setMusicPlaylistInTheCacheActionFail(url) {
    return async (dispatch) => dispatch(setMusicPlaylistInTheCacheFail(url))
}

export function likeMusic(id) {
    return { type: ActionTypes.LIKE_MUSIC, id }
}

export function likeMusicSuccess(id) {
    return { type: ActionTypes.LIKE_MUSIC_SUCCESS, id }
}

export function likeMusicFail(id) {
    return { type: ActionTypes.LIKE_MUSIC_FAIL, id }
}

export function likeMusicAction(id, music) {
    return async (dispatch) => {
        try {

            dispatch(likeMusic(id))
            const url = 'https://wiins-backend.herokuapp.com/music/liked/' + id
            const token = await AsyncStorage.getItem('userToken')

            return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
                .then((response) => response.json())
                .then(async (response) => {
                    if (response.status == 200) {
                        dispatch(addMusicAfterLiked(music))
                        return dispatch(likeMusicSuccess(id))
                    }
                    return dispatch(likeMusicFail(id))
                })
        } catch (error) {
            return dispatch(likeMusic(id));
        }
    }
}

export function dislikeMusic(id) {
    return { type: ActionTypes.DISLIKE_MUSIC, id }
}

export function dislikeMusicSuccess(id) {
    return { type: ActionTypes.DISLIKE_MUSIC_SUCCESS, id }
}

export function dislikeMusicFail(id) {
    return { type: ActionTypes.DISLIKE_MUSIC_FAIL, id }
}

export function dislikeMusicAction(id) {
    return async (dispatch) => {
        try {

            dispatch(dislikeMusic(id))
            const url = 'https://wiins-backend.herokuapp.com/music/dislike/' + id
            const token = await AsyncStorage.getItem('userToken')

            return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
                .then((response) => response.json())
                .then(async (response) => {
                    if (response.status == 200) {
                        dispatch(pullMusicAfterDisliked(id))
                        return dispatch(dislikeMusicSuccess(id))
                    }
                    return dispatch(dislikeMusicFail(id))
                })
        } catch (error) {
            return dispatch(dislikeMusic(id));
        }
    }
}