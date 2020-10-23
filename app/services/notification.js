import { AsyncStorage } from 'react-native'

// to be connected to the socket
export const getSocket = async () => {
    return new WebSocket('wss://wiins-web-socket.herokuapp.com?token=' + await AsyncStorage.getItem('userToken'))
}