import PushNotificationIOS from '@react-native-community/push-notification-ios'
import PushNotification from 'react-native-push-notification'
import firebase from '@react-native-firebase/app'
import { sendError } from './../../services/error/error-service'

export function configureNotification() {

        // Must be outside of any component LifeCycle (such as `componentDidMount`).
        PushNotification.configure({
                // (optional) Called when Token is generated (iOS and Android)
                onRegister: function (token) {
                        console.log('TOKEN:', token);
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
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) { getToken() }
        else { requestPermission() }
}

async function requestPermission() {
        try {
                await firebase.messaging().requestPermission();
                // User has authorised
                this.getToken();
        } catch (error) {
                // User has rejected permissions
                console.log('permission rejected');
        }
}

async function getToken() {
        try {
                const enabled = await firebase.messaging().hasPermission();
                if (!enabled) {
                        await firebase.messaging().requestPermission();
                }

                const fcmToken = await firebase.messaging().getToken();
                if (fcmToken) {
                        console.log('fcm token:', fcmToken); //-->use this token from the console to send a post request via postman
                        return fcmToken;
                }
        } catch (error) {
                console.warn('notification token error', error);
        }
}