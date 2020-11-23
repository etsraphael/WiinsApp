import * as ActionTypes from './constants'
import AsyncStorage from '@react-native-community/async-storage'

export function getTopHastagSuccess(results) {
    return { 
        type: ActionTypes.GET_TOP_HASTAG_SUCCESS,
        payload: results
    }
}

export function getTopHastagStart() {
    return { type: ActionTypes.GET_TOP_HASTAG }
}

export function getTopHastagFail(error) {
    return {
        type: ActionTypes.GET_TOP_HASTAG_FAIL,
        payload: error,
    }
}

export function getTopHastag() {
    return async (dispatch) => {
        try {
            
            dispatch(getTopHastagStart())
            const url = 'https://wiins-backend.herokuapp.com/publication/discover/topHastag'
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
                    if (response.status == 201) return dispatch(getTopHastagSuccess(response.hastags))
                    return dispatch(getTopHastagFail(response.message))
                })
        } catch (error) {
            return dispatch(getTopHastagFail(error));
        }
    };
}