import * as ActionTypes from './constants'
import AsyncStorage from '@react-native-community/async-storage';

export function searchSuccess(publication) {
    return {
        type: ActionTypes.SEARCH_SUCCESS,
        payload: publication,
    }
}

export function searchStart() {
    return { type: ActionTypes.SEARCH }
}

export function searchFail(error) {
    return {
        type: ActionTypes.SEARCH_FAIL,
        payload: error,
    }
}

export function searchReset() {
    return { type: ActionTypes.SEARCH_RESET }
}

export function searchResetActions() {
    return async (dispatch) => dispatch(searchReset())
}

export function discoverSearch(name) {
    return async (dispatch) => {
        try {
            dispatch(searchStart())
            
            const token = await AsyncStorage.getItem('userToken')
            const url = `https://wiins-backend.herokuapp.com/search?q=${name}&p=1`

            return fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((response) => response.json())
                .then(async (response) => {
                    if (response.status == 200) return dispatch(searchSuccess(response.results))
                    return dispatch(searchFail(response.message))
                })
        } catch (error) {
            return dispatch(searchFail(error));
        }
    };
}

export function friendsearch(name) {
    return async (dispatch) => {

        try {
            dispatch(searchStart())
            const token = await AsyncStorage.getItem('userToken')
            const url = 'https://wiins-backend.herokuapp.com/friends/profiles?q=' + name

            return fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((response) => response.json())
                .then(async (response) => {                    
                    if (response.status == 200) return dispatch(searchSuccess(response.results))
                    return dispatch(searchFail(response.message))
                })
        } catch (error) {
            return dispatch(searchFail(error));
        }
    };
}