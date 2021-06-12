import * as Sentry from '@sentry/react-native'

export function initSentry() {
    return Sentry.init({
        dsn: 'https://e718b35c2d1c4f5cbb44584ef644e3aa@o833200.ingest.sentry.io/5812922',
    })
}

export function sendError(error) {
    if(!__DEV__) return Sentry.captureException(error)
    else return null
}