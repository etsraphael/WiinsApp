import AsyncStorage from '@react-native-community/async-storage'
import RNFetchBlob from 'rn-fetch-blob'

export async function cacheOneTube(tube, actions) {

    if (!tube.videoLink) return null

    // check if the cache tube cache exist
    let tubeRefCache = await AsyncStorage.getItem('tubeRefCache');
    if (!tubeRefCache) await AsyncStorage.setItem('tubeRefCache', JSON.stringify([]))

    // pars the json to manipulate it
    tubeRefCache = JSON.parse(tubeRefCache)

    // add the ref if the file in the cache doesn't exist, we create it
    const path = RNFetchBlob.fs.dirs.MovieDir + "/" + tube.videoLink.split('/')[3] + '.mp4'

    tubeRefCache.push({ url: tube.videoLink, path: path, updatedAt: Date.now(), views: 1, state: 'progressing' })
    await AsyncStorage.setItem('tubeRefCache', JSON.stringify(tubeRefCache))

    // get the index of the new object
    const indextube = tubeRefCache.map(x => x.url).indexOf(tube.videoLink)

    // pending animation everywhere
    await actions.downloadTubeStartActions()

    // add the file in the cache
    RNFetchBlob.config({ path })
        .fetch("GET", tube.videoLink)
        .progress((received, total) => {
            actions.downloadTubeProgressActions(Math.round(received / total * 100))
        })
        .then(async (result) => {

            tubeRefCache[indextube] = {
                url: tube.videoLink,
                path: result.path(),
                updatedAt: Date.now(),
                state: 'confirmed'
            }

            // set the store
            await actions.addTubeInCacheSuccessActions({ ...tube, videoLink: result.path() })
            // regist the new file
            return AsyncStorage.setItem('tubeRefCache', JSON.stringify(tubeRefCache))
        })
        .catch(async () => {

            tubeRefCache[indextube] = {
                url: tube.videoLink,
                path: result.path(),
                updatedAt: Date.now(),
                state: 'failed'
            }
            // set the store
            await actions.addTubeInCacheFailedActions(tube)
            // regist the new file
            return AsyncStorage.setItem('tubeRefCache', JSON.stringify(tubeRefCache))
        })

}

export async function getCacheLinkOrSeverLinkForTube(url) {

    // verification
    if (!url) return null

    // get the tubeRefCache
    let tubeRefCache = await AsyncStorage.getItem('tubeRefCache')

    // pars the json to manipulate it
    tubeRefCache = JSON.parse(tubeRefCache)

    // replace the link if it's in the cache
    const tubeFound = tubeRefCache.find(tube => (tube.url === url) && (tube.state == 'confirmed'))

    if (tubeFound) return true
    else return false

}

export async function resetAllRefTube() {

    let tubeRefCache = await AsyncStorage.getItem('tubeRefCache')
    if (!tubeRefCache) return AsyncStorage.setItem('tubeRefCache', JSON.stringify([]))
    else {

        // pars the json to manipulate it
        tubeRefCache = JSON.parse(tubeRefCache)

        // delete each musics
        for (let tube of tubeRefCache) {
            await resetRefTubeByUrl(tube.url)
        }

    }

}

export async function resetRefTubeByUrl(url) {
    return RNFetchBlob.fs.unlink(RNFetchBlob.fs.dirs.MovieDir + "/" + url.split('/')[3] + '.mp4')
        .then(async () => {

            // get the tube ref
            let tubeRefCache = await AsyncStorage.getItem('tubeRefCache')

            // pars the json to manipulate it
            tubeRefCache = JSON.parse(tubeRefCache)

            // delete the ref 
            tubeRefCache = tubeRefCache.filter(tube => tube.url !== url)

            return AsyncStorage.setItem('tubeRefCache', JSON.stringify(tubeRefCache))
        })
}