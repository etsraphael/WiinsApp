import AsyncStorage from '@react-native-community/async-storage'
import RNFetchBlob from 'rn-fetch-blob'

export async function cacheOneTube(tube, actions) {

    if(!tube.videoLink) return null

    // check if the cache tube cache exist
    let tubeRefCache = await AsyncStorage.getItem('tubeRefCache');
    if (!tubeRefCache) await AsyncStorage.setItem('tubeRefCache', JSON.stringify([]))

    // pars the json to manipulate it
    tubeRefCache = JSON.parse(tubeRefCache)

    // add the ref if the file in the cache doesn't exist, we create it
    const path = RNFetchBlob.fs.dirs.tubeDir + "/" + tube.videoLink.split('/')[3] + '.mp4'
    tubeRefCache.push({ url: tube.videoLink, path: path, updatedAt: Date.now(), views: 1, state: 'progressing' })
    await AsyncStorage.setItem('tubeRefCache', JSON.stringify(tubeRefCache))

    // get the index of the new object
    const indextube = tubeRefCache.map(x => x.url).indexOf(tube.videoLink)

    // pending animation everywhere
    // await actions.addTubeInCacheActions(tube)

    // add the file in the cache
    RNFetchBlob.config({ path })
        .fetch("GET", tube.videoLink)
        .progress((received, total) => {
            console.log('progress', Math.round(received / total * 100) + '%')
        })
        .then(async (result) => {
            tubeRefCache[indextube] = {
                url: tube.videoLink,
                path: result.path(),
                updatedAt: Date.now(),
                state: 'confirmed'
            }
            // set the playlist store here
            // await actions.settubePlaylistInTheCacheActionSuccess(tube.videoLink)
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
            // set the playlist store here
            // await actions.settubePlaylistInTheCacheActionFail(tube.videoLink)
            // regist the new file
            return AsyncStorage.setItem('tubeRefCache', JSON.stringify(tubeRefCache))
        })

}