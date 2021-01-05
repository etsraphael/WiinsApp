import * as ActionTypes from './constants'
import AsyncStorage from '@react-native-community/async-storage'

export function getMyFavMusicSuccess(musics) {
    return { type: ActionTypes.GET_MY_FAV_MUSIC_SUCCESS, payload: musics }
}

export function getMyFavMusicStart() {
    return { type: ActionTypes.GET_MY_FAV_MUSIC }
}

export function getMyFavMusicFail(error) {
    return { type: ActionTypes.GET_MY_FAV_MUSIC_FAIL, payload: error }
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
