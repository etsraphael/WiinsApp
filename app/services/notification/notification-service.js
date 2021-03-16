import PushNotificationIOS from '@react-native-community/push-notification-ios'
import PushNotification from 'react-native-push-notification'
import firebase from '@react-native-firebase/app'
import messaging from '@react-native-firebase/messaging'
import { sendError } from './../../services/error/error-service'
import { saveTokenDevice } from './token-service'

export function configureNotification() {

        // Must be outside of any component LifeCycle (such as `componentDidMount`).
        PushNotification.configure({
                
                // (optional) Called when Token is generated (iOS and Android)
                onRegister: function (response) {
                        switch (response.os) {
                                case 'ios': return requestUserPermissionForIos()
                                case 'android': return saveTokenDevice({ token: response.token, support: 'android' }) 
                                default: return null
                        }

                },

                // (required) Called when a remote is received or opened, or local notification is opened
                onNotification: function (notification) {
                        console.log('NOTIFICATION:', notification);

                        // process the notification

                        // (required) Called when a remote is received or opened, or local notification is opened
                        notification.finish(PushNotificationIOS.FetchResult.NoData);
                },

                // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
                onAction: function (notification) {
                        console.log('ACTION:', notification.action);
                        console.log('NOTIFICATION:', notification);

                        // process the action
                },

                // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
                onRegistrationError: function (err) {
                        sendError(err)
                },

                // IOS ONLY (optional): default: all - Permissions to register.
                permissions: {
                        alert: true,
                        badge: true,
                        sound: true,
                },

                // Should the initial notification be popped automatically
                // default: true
                popInitialNotification: true,

                /**
                 * (optional) default: true
                 * - Specified if permissions (ios) and token (android and ios) will requested or not,
                 * - if not, you must call PushNotificationsHandler.requestPermissions() later
                 * - if you are not using remote notification or do not have Firebase installed, use this:
                 *     requestPermissions: Platform.OS === 'ios'
                 */
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
                this.getToken()
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
                        return saveTokenDevice({ token: fcmToken, support: 'ios' })
                }
        } catch (error) {
                sendError(error)
        }
}