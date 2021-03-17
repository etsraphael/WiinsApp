import AsyncStorage from '@react-native-community/async-storage';
import { sendError } from './../../../app/services/error/error-service'

export function saveTokenDeviceInStorage(device) {
        return AsyncStorage.setItem('deviceInfo', JSON.stringify({ device }))
}

export async function sendTokenDevice() {
        const token = await AsyncStorage.getItem('userToken')
        const device = await AsyncStorage.getItem('deviceInfo')

        try {
                return fetch('https://wiins-backend.herokuapp.com/device/token/register', {
                        method: 'POST',
                        headers: {
                                Accept: 'application/json', 'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + token,
                        },
                        body: device
                })
        } catch (error) {
                return sendError(error)
        }
}
