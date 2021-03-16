import AsyncStorage from '@react-native-community/async-storage';
import { sendError } from './../../../app/services/error/error-service'

export async function saveTokenDevice(device) {
        const token = await AsyncStorage.getItem('userToken')

        return null

        try {
                return fetch('https://wiins-backend.herokuapp.com/user/token/setting', {
                        method: 'POST',
                        headers: {
                                Accept: 'application/json', 'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + token,
                        },
                        body: JSON.stringify({ device })
                })
                        .then((response) => response.json())
                        .then(console.log)
        } catch (error) {
                return sendError(error)
        }

}
