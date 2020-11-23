import { GET_LIST_PUBLICATIONS_MUSIC, GET_LIST_PUBLICATIONS_MUSIC_SUCCESS, GET_LIST_PUBLICATIONS_MUSIC_FAIL, RESET_PUBLICATIONS_MUSIC} from './constants';
import AsyncStorage from '@react-native-community/async-storage';

export function getmusicProjectListSuccess(publication) {
    return {
        type: GET_LIST_PUBLICATIONS_MUSIC_SUCCESS,
        payload: publication,
    }
}

export function getmusicProjectListStart() {
    return { type: GET_LIST_PUBLICATIONS_MUSIC }
}

export function getmusicProjectListFail(error) {
    return {
        type: GET_LIST_PUBLICATIONS_MUSIC_FAIL,
        payload: error,
    }
}

export function resetmusicProjectList() {
    return {
        type: RESET_PUBLICATIONS_MUSIC
    }
}

export function getMymusicProjectList(page) {
    return async (dispatch) => {
        try {
            if(page == 1) dispatch(resetmusicProjectList())
            dispatch(getmusicProjectListStart())
            const token = await AsyncStorage .getItem('userToken')
            const url = 'https://wiins-backend.herokuapp.com/music/mymusicProject'

            return fetch(url, {
                method: 'GET',
                headers: { 
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((response) => response.json())
                .then( async (response) => {
                    if (response.status == 200) {
                        return dispatch(getmusicProjectListSuccess(response.results))
                    }
                    return dispatch(getmusicProjectListFail(response.message))
                })
        } catch (error) {
            return dispatch(getmusicProjectListFail(error));
        }
    };
}

export function getmusicProjectListByProfile(page, id) {
    return async (dispatch) => {
        try {
            if(page == 1) dispatch(resetmusicProjectList())
            dispatch(getmusicProjectListStart())
            const token = await AsyncStorage .getItem('userToken')
            const url = 'https://wiins-backend.herokuapp.com/music/profile/' + id

            return fetch(url, {
                method: 'GET',
                headers: { 
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((response) => response.json())
                .then( async (response) => {
                    if (response.status == 200) {
                        return dispatch(getmusicProjectListSuccess(response.results))
                    }
                    return dispatch(getmusicProjectListFail(response.message))
                })
        } catch (error) {
            return dispatch(getmusicProjectListFail(error));
        }
    };
}
