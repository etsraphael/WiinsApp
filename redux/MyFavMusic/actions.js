import * as ActionTypes from './constants'
import AsyncStorage from '@react-native-community/async-storage'
import RNFetchBlob from 'rn-fetch-blob'

export function getMyFavMusicSuccess(musics) {
    return { type: ActionTypes.GET_MY_FAV_MUSIC_SUCCESS, payload: musics }
}

export function getMyFavMusicStart() {
    return { type: ActionTypes.GET_MY_FAV_MUSIC }
}

export function getMyFavMusicFail(error) {
    return { type: ActionTypes.GET_MY_FAV_MUSIC_FAIL, payload: error }
}

export function requestFileCache(key) {
    return { type: ActionTypes.FILE_CACHE_REQUESTED, key }
}

export function beginFileCache(url, path) {
    return { type: ActionTypes.FILE_CACHE_IN_PROGRESS, path, url }
}

export function completeFileCache(url, path) {
    return { type: ActionTypes.FILE_CACHE_SUCCEEDED, url, path }
}

export function failFileCache(key) {
    return { type: ActionTypes.FILE_CACHE_FAILED, key }
}

export function removeFileCache(url) {
    return { type: ActionTypes.REMOVE_FILE_IN_CACHE, url }
}

export function removeAllFileInCache() {
    return { type: ActionTypes.REMOVE_ALL_FILE_IN_CACHE }
}

export function getMyMusic() {
    return async (dispatch) => {
        try {
            dispatch(getMyFavMusicStart())
            const token = await AsyncStorage.getItem('userToken')
            const url = 'https://wiins-backend.herokuapp.com/music/myfavorite/'

            return fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((response) => response.json())
                .then(async (response) => {
                    if (response.status == 201) return dispatch(getMyFavMusicSuccess(response.playlist))
                    return dispatch(getMyFavMusicFail(response.message))
                })
        } catch (error) {
            return dispatch(getMyFavMusicFail(error));
        }
    };
}

export function saveFileInCache(url) {
    return async (dispatch) => {
        try {
            const path = RNFetchBlob.fs.dirs.DocumentDir + "/" + url.split('/')[3] + '.mp3'
            await dispatch(beginFileCache(url, path))
            return RNFetchBlob.config({ path })
                .fetch("GET", url)
                .then(() => dispatch(completeFileCache(url, path)))
                .catch(() => dispatch(failFileCache(url)))
        } catch (error) {
            return dispatch(failFileCache(url))
        }
    }
}

export function removeFileCacheActions(url) {
    return async (dispatch) => {
        return RNFetchBlob.fs.unlink(RNFetchBlob.fs.dirs.DocumentDir + "/" + url.split('/')[3] + '.mp3')
        .then(() => dispatch(removeFileCache(url)))
    }
}

export function removeAllFileInCacheActions() {
    return (dispatch) => { return dispatch(removeAllFileInCache()) }
}