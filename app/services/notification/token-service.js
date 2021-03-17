import AsyncStorage from '@react-native-community/async-storage';
import { sendError } from './../../../app/services/error/error-service'

export async function saveTokenDevice(device) {
        const token = await AsyncStorage.getItem('userToken')
        try {
                return fetch('https://wiins-backend.herokuapp.com/device/token/register', {
                        method: 'POST',
                        headers: {
                                Accept: 'application/json', 'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + token,
                        },
                        body: JSON.stringify({ device })
                })
        } catch (error) {
                return sendError(error)
        }

}
