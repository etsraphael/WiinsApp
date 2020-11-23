import * as ActionTypes from './constants'
import AsyncStorage from '@react-native-community/async-storage'

export function getMusicPlaylistSuccess(payload) {
    return { 
        type: ActionTypes.GET_MUSIC_PLAYLIST_SUCCESS,
        payload
    }
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
                .then( async (response) => {
                    console.log(response)
                    if (response.status == 200) return dispatch(getMusicPlaylistSuccess(response.playlist))
                    return dispatch(getMusicPlaylistFail(response.message))
                })
        } catch (error) {
            return dispatch(getMusicPlaylistFail(error));
        }
    }
}