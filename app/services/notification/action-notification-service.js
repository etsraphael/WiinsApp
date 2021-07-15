import AsyncStorage from '@react-native-community/async-storage'
import messaging from '@react-native-firebase/messaging'
import { TabActions } from '@react-navigation/native'

export async function checkNotification(navigation, actions) {
        return messaging().getInitialNotification().then((notification) => {
                if (!!notification) {
                        switch (notification.data.type) {
                                case 'message-received': return openMessengerRoom(navigation, notification.data)
                                case 'feed-publication-tag-comment': return goToCommentTagPublicationInNewFeed(navigation, notification.data, actions)
                                case 'playlist-music-tag-comment': return goToCommentTagPublicationInMusic(navigation, notification.data, actions)
                                case 'friend-request': return goToRequestNotification(navigation, notification.data)
                                default: return null
                        }
                }
        })
}

function openMessengerRoom(navigation, data) {
        const jumpToAction = TabActions.jumpTo('MAIN_MESSENGER', { notification: data })
        return navigation.dispatch(jumpToAction)
}

function goToRequestNotification(navigation, data){
        alert('boum')

        console.log('navigation')
        console.log(navigation)

        console.log('data')
        console.log(data)

        return null
}

export function updateStoreOnNotification(store, notification) {
        switch (notification.type) {
                case 'message-received': return updateMessenger(store, notification)
                case 'friend-request': return updateFriendRequestList(store, notification)
                default: return null
        }
}

function updateMessenger(store, notification) {

        const foundInRoomList = store.getState().Rooms.rooms.find(x => x._id === notification.roomId)

        if (!!store.getState().Room.room) {
                const roomOpen = store.getState().Room.room._id
                if (roomOpen == notification.roomId) {
                        return store.dispatch({ type: 'UPDATE_OPEN_ROOM', notification })
                }
        }

        // if the room exist on the store
        if (foundInRoomList) {
                return store.dispatch({ type: 'UPDATE_ROOM_BY_ID', notification })
        }

        // if the room it's not in the list
        else {

        }

}

function updateFriendRequestList(store, notification){

        console.log('store')
        console.log(store)

        console.log('notification')
        console.log(notification)


        return null
}

async function goToCommentTagPublicationInNewFeed(notification, actions) {
        const token = await AsyncStorage.getItem('userToken')
        const url = 'https://wiins-backend.herokuapp.com/publication/id/' + notification.publicationId

        return fetch(url, {
                method: 'GET',
                headers: {
                        Accept: 'application/json', 'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                },
        })
                .then((response) => response.json())
                .then(async (response) => {
                        if (response.status == 200) {
                                return actions.openToggleModal({ publication: response.publication })
                        }
                })
}

async function goToCommentTagPublicationInMusic(notification, actions) {
        const token = await AsyncStorage.getItem('userToken')
        const url = 'https://wiins-backend.herokuapp.com/NA' + notification.playlist
        // TO DO..

        return null
}