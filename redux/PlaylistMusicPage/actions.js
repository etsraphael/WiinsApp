import * as ActionTypes from './constants'
import AsyncStorage from '@react-native-community/async-storage'
import { verificationMusicCacheFormat } from './../../app/services/cache/cache-music-service'

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

export function setMusicInTheCache(url) {
    return { type: ActionTypes.SET_MUSIC_PLAYLIST_IN_CACHE, url }
}

export function setMusicInTheCacheSuccess(url) {
    return { type: ActionTypes.SET_MUSIC_PLAYLIST_IN_CACHE_SUCCESS, url }
}

export function setMusicInTheCacheFail(url) {
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
                        return dispatch( await getMusicPlaylistSuccess(response.playlist))
                    }
                    return dispatch(getMusicPlaylistFail(response.message))
                })
        } catch (error) {
            return dispatch(getMusicPlaylistFail(error));
        }
    }
}