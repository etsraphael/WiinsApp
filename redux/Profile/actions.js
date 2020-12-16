import * as ActionTypes from './constants';
import AsyncStorage from '@react-native-community/async-storage';

// actions

export function getProfileSuccess(profile) {
    return {
        type: ActionTypes.GET_PROFILE_SUCCESS,
        payload: profile,
    }
}

export function getProfileStart() {
    return { type: ActionTypes.GET_PROFILE }
}

export function getProfileFail(error) {
    return {
        type: ActionTypes.GET_PROFILE_FAIL,
        payload: error,
    }
}

export function askFriendSuccess() {
    return {
        type: ActionTypes.ASK_FRIEND_SUCCESS
    }
}

export function askFriendStart() {
    return { type: ActionTypes.ASK_FRIEND }
}

export function askFriendFail(error) {
    return {
        type: ActionTypes.ASK_FRIEND_FAIL,
        payload: error,
    }
}

export function cancelFriendRequestSuccess() {
    return {
        type: ActionTypes.CANCEL_ASK_FRIEND_SUCCESS
    }
}

export function cancelFriendRequestStart() {
    return { type: ActionTypes.CANCEL_ASK_FRIEND }
}

export function cancelFriendRequestFail(error) {
    return {
        type: ActionTypes.CANCEL_ASK_FRIEND_FAIL,
        payload: error,
    }
}

export function followSuccess() {
    return {
        type: ActionTypes.FOLLOW_PROFILE_SUCCESS
    }
}

export function followStart() {
    return { type: ActionTypes.FOLLOW_PROFILE }
}

export function followFail(error) {
    return {
        type: ActionTypes.FOLLOW_PROFILE_FAIL,
        payload: error,
    }
}

export function unfollowSuccess() {
    return {
        type: ActionTypes.UNFOLLOW_PROFILE_SUCCESS
    }
}

export function unfollowStart() {
    return { type: ActionTypes.UNFOLLOW_PROFILE }
}

export function unfollowFail(error) {
    return {
        type: ActionTypes.UNFOLLOW_PROFILE_FAIL,
        payload: error,
    }
}

export function confirmFriendSuccess() {
    return {
        type: ActionTypes.CONFIRM_FRIEND_SUCCESS
    }
}

export function confirmFriendStart() {
    return { type: ActionTypes.CONFIRM_FRIEND }
}

export function confirmFriendFail(error) {
    return {
        type: ActionTypes.CONFIRM_FRIEND_FAIL,
        payload: error,
    }
}

// effect

export function getProfile(id) {
    return async (dispatch) => {
        try {

            dispatch(getProfileStart())
            const token = await AsyncStorage.getItem('userToken')
            return fetch('https://wiins-backend.herokuapp.com/profileId/' + id, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((response) => response.json())
                .then(async (response) => {
                    if (response.status == 200) return dispatch(getProfileSuccess(response.profile))
                    return dispatch(getProfileFail(response.message))
                })
        } catch (error) {
            return dispatch(getProfileFail(error));
        }
    };
}

export function askFriend(id) {
    return async (dispatch) => {
        try {
            dispatch(askFriendStart())
            const token = await AsyncStorage.getItem('userToken')
            return fetch('https://wiins-backend.herokuapp.com/friends/createRequest/' + id, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((response) => response.json())
                .then(response => {
                    if (response.status == 201) return dispatch(askFriendSuccess())
                    return dispatch(askFriendFail(response.error))
                })
        } catch (error) {
            return dispatch(askFriendFail(error))
        }
    };
}

export function cancelFriendRequest(id) {
    return async (dispatch) => {
        try {
            dispatch(cancelFriendRequestStart())
            const token = await AsyncStorage.getItem('userToken')
            return fetch('https://wiins-backend.herokuapp.com/friends/cancelWidthProfile/' + id, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((response) => response.json())
                .then(response => {
                    if (response.status == 200) return dispatch(cancelFriendRequestSuccess())
                    return dispatch(cancelFriendRequestFail(response.error))
                })

        } catch (error) {
            return dispatch(cancelFriendRequestFail(error))
        }
    };
}

export function follow(id) {
    return async (dispatch) => {
        try {
            dispatch(followStart())
            const token = await AsyncStorage.getItem('userToken')
            return fetch('https://wiins-backend.herokuapp.com/profile/follow/' + id, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((response) => response.json())
                .then(response => {
                    if (response.status == 200) return dispatch(followSuccess())
                    return dispatch(followFail(response.error))
                })
        } catch (error) {
            return dispatch(followFail(error))
        }
    }
}

export function unfollow(id) {
    return async (dispatch) => {
        try {
            dispatch(unfollowStart())
            const token = await AsyncStorage.getItem('userToken')
            return fetch('https://wiins-backend.herokuapp.com/profile/unfollow/' + id, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((response) => response.json())
                .then(response => {
                    if (response.status == 200) return dispatch(unfollowSuccess())
                    return dispatch(unfollowFail(response.error))
                })
        } catch (error) {
            return dispatch(unfollowFail(error))
        }
    };
}

export function confirmFriendRequest(id) {
    return async (dispatch) => {
        try {
            dispatch(confirmFriendStart())
            const token = await AsyncStorage.getItem('userToken')
            return fetch('https://wiins-backend.herokuapp.com/friends/addWithProfile/' + id, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((response) => response.json())
                .then(response => {
                    if (response.status == 201) return dispatch(confirmFriendSuccess())
                    return dispatch(followFail(response.error))
                })
        } catch (error) {
            return dispatch(confirmFriendFail(error))
        }
    };
}