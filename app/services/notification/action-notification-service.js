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

function goToCommentTagPublicationInNewFeed(store, notification) {
        // TO DO
        return null
}

function goToCommentTagPublicationInMusic(store, notification) {
        // TO DO
        return null
}