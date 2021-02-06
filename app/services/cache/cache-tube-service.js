import AsyncStorage from '@react-native-community/async-storage'
import RNFetchBlob from 'rn-fetch-blob'

export async function cacheOneTube(tube, actions) {

    if(!tube.file) return null

    // check if the cache tube cache exist
    let tubeRefCache = await AsyncStorage.getItem('tubeRefCache');
    if (!tubeRefCache) await AsyncStorage.setItem('tubeRefCache', JSON.stringify([]))

    // pars the json to manipulate it
    tubeRefCache = JSON.parse(tubeRefCache)

    // add the ref if the file in the cache doesn't exist, we create it
    const path = RNFetchBlob.fs.dirs.tubeDir + "/" + tube.file.split('/')[3] + '.mp3'
    tubeRefCache.push({ url: tube.file, path: path, updatedAt: Date.now(), views: 1, state: 'progressing' })
    await AsyncStorage.setItem('tubeRefCache', JSON.stringify(tubeRefCache))

    // get the index of the new object
    const indextube = tubeRefCache.map(x => x.url).indexOf(tube.file)

    // pending animation everywhere
    await actions.settubeInTheCacheAction(tube.file)
    await actions.settubePlaylistInTheCacheAction(tube.file)

    // add the file in the cache
    RNFetchBlob.config({ path })
        .fetch("GET", tube.file)
        .then(async (result) => {
            tubeRefCache[indextube] = {
                url: tube.file,
                path: result.path(),
                updatedAt: Date.now(),
                views: 1,
                state: 'confirmed'
            }
            // set the favorite store here 
            await actions.settubeInTheCacheActionSuccess(tube.file)
            // set the playlist store here
            await actions.settubePlaylistInTheCacheActionSuccess(tube.file)
            // regist the new file
            return AsyncStorage.setItem('tubeRefCache', JSON.stringify(tubeRefCache))
        })
        .catch(async () => {
            tubeRefCache[indextube] = {
                url: tube.file,
                path: result.path(),
                updatedAt: Date.now(),
                views: 1,
                state: 'failed'
            }
            // set the playlist store here
            await actions.settubeInTheCacheActionFail(tube.file)
            // set the playlist store here
            await actions.settubePlaylistInTheCacheActionFail(tube.file)
            // regist the new file
            return AsyncStorage.setItem('tubeRefCache', JSON.stringify(tubeRefCache))
        })

}