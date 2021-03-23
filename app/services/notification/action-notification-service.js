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
                default: return null
        }
}

function updateMessenger(store, notification) {


        console.log(store.getState().Rooms)

        // if the room exist on the store
        // to get the list





        // if the room has never been created
        return store.dispatch({ type: 'UPDATE_ROOM_NOTIFICATION', notification: notification.data })
}