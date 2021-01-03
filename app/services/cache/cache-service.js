export function canRequestCacheForKey(key, fileCacheMap) {
    const currentStatus = fileCacheMap[key];
    return (
        // If there's no current status, then we haven't tried caching the file yet
        !currentStatus ||
        // If we're currently trying to cache the file or have already cached it, don't send a request to cache it again
        (currentStatus.type !== "FileCacheInProgress" &&
            currentStatus.type !== "FileCacheSucceeded")
    )
}

export function setCacheStatus(url, status, state) {
    return {
        ...state,
        fileCacheMap: {
            ...state.fileCacheMap,
            [url]: status
        }
    }
}