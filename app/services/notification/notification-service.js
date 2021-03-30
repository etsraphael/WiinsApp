import PushNotificationIOS from '@react-native-community/push-notification-ios'
import PushNotification from 'react-native-push-notification'
import firebase from '@react-native-firebase/app'
import { sendError } from './../../services/error/error-service'
import { saveTokenDeviceInStorage } from './token-service'
import { updateStoreOnNotification } from './action-notification-service'

export function configureNotification(store) {
        PushNotification.configure({
                onRegister: function (response) {
                        switch (response.os) {
                                case 'ios': return requestUserPermissionForIos()
                                case 'android': return saveTokenDeviceInStorage({ token: response.token, support: 'android' })
                                default: return null
                        }
                },
                onNotification: function (notification) {
                        updateStoreOnNotification(store, notification.data)
                        notification.finish(PushNotificationIOS.FetchResult.NoData)
                },
                onAction: function (notification) {
                        console.log('ACTION:', notification.action);
                        console.log('NOTIFICATION:', notification);
                },
                onRegistrationError: function (err) {
                        sendError(err)
                },
                permissions: { alert: true, badge: true, sound: true },
                popInitialNotification: true,
                requestPermissions: true,
        })
}

export async function requestUserPermissionForIos() {
        const enabled = await firebase.messaging().hasPermission()
        if (enabled) { getToken() }
        else { requestPermission() }
}

async function requestPermission() {
        try {
                await firebase.messaging().requestPermission()
                getToken()
        } catch (error) {
                sendError(error)
        }
}

async function getToken() {
        try {
                const enabled = await firebase.messaging().hasPermission()
                if (!enabled) {
                        await firebase.messaging().requestPermission()
                }

                const fcmToken = await firebase.messaging().getToken()
                if (fcmToken) {
                        return saveTokenDeviceInStorage({ token: fcmToken, support: 'ios' })
                }
        } catch (error) {
                sendError(error)
        }
}