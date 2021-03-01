import * as Sentry from "@sentry/react-native"

export function initSentry() {
    return Sentry.init({
        dsn: "https://61507dd63297425f8ce6a729128a91b4@o485463.ingest.sentry.io/5655642",
    })
}

export function sendError(error) {
    return Sentry.captureException(error)
}