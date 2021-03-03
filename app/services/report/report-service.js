import AsyncStorage from '@react-native-community/async-storage'
import { sendError } from './../error/error-service'

export function sendReport(report) {
    switch (report.type) {
        case 'feed-publication': return sendFeedReport(report)
        case 'profile': return null
        case 'comment-feed-publication': return null
        case 'tube': return null
        case 'comment-playlist-music': return null
        case 'group': return null
        case 'page': return null
        case 'music': return null
        case 'musicProject-report': return null
        case 'comment-tube-report': return null
    }
}

async function sendFeedReport(report) {
    try {

        const token = await AsyncStorage.getItem('userToken')

        return fetch('https://wiins-backend.herokuapp.com/report/addOne', {
            method: 'POST',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({ report })
        })
            .then((response) => response.json())
            .then(() => { return true })
    } catch (error) {
        return sendError(error)
    }
}