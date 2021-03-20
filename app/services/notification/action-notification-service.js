import messaging from '@react-native-firebase/messaging'
import { TabActions } from '@react-navigation/native'

export async function checkNotification(navigation) {
        return messaging().getInitialNotification().then((notification) => {
                if (!!notification) {


                        console.log('my data')
                        console.log(notification.data)

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