import AsyncStorage from '@react-native-community/async-storage'
import messaging from '@react-native-firebase/messaging'
import { TabActions } from '@react-navigation/native'

export async function checkNotification(navigation) {
        return messaging().getInitialNotification().then((notification) => {
                if (!!notification) {
                        switch (notification.data.type) {
                                case 'message-received': return openMessengerRoom(navigation, notification.data)
                                default: return null
                        }
                }
        })
}

function openMessengerRoom(navigation, data) {
        const jumpToAction = TabActions.jumpTo('MAIN_MESSENGER', { notification: data })
        return navigation.dispatch(jumpToAction)
}

export function updateStoreOnNotification(store, notification) {
        switch (notification.type) {
                case 'message-received': return updateMessenger(store, notification)
                case 'feed-publication-tag-comment': return goToCommentTagPublicationInNewFeed(store, notification)
                case 'playlist-music-tag-comment': return goToCommentTagPublicationInMusic(store, notification)
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

async function goToCommentTagPublicationInNewFeed(store, notification) {
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
                                return store.dispatch({ type: 'PUT_PUBLICATION_IN_MODAL', payload: response.publication })
                        }
                })
}

async function goToCommentTagPublicationInMusic(store, notification) {

        const token = await AsyncStorage.getItem('userToken')
        const url = 'https://wiins-backend.herokuapp.com/NA' + notification.playlist
        // TO DO..

        return null
}