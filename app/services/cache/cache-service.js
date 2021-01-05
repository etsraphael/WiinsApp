import AsyncStorage from '@react-native-community/async-storage'
import RNFetchBlob from 'rn-fetch-blob'

export async function addRefMusic(url) {

    // resetAllRefMusic()
    // return null


    // check if the cache music cache exist
    let musicRefCache = await AsyncStorage.getItem('musicRefCache');
    if (!musicRefCache) resetAllRefMusic()

    // check if the ref exist to increment it
    // to do..



    musicRefCache = JSON.parse(musicRefCache);
    musicRefCache.push({
        url: url,
        path: path,
        updatedAt: Date.now(),
        views: 1,
        state: 'progressing'
    })



    const musicRefCacheUpdated = JSON.stringify(musicRefCache)
    await AsyncStorage.setItem('musicRefCache', musicRefCacheUpdated)


    

    const test = await AsyncStorage.getItem('musicRefCache')
    console.log(test)



    return null

    // add the ref if the file in the cache doesn't exist, we create it
    const path = RNFetchBlob.fs.dirs.MusicDir + "/" + url.split('/')[3] + '.mp3'
    await AsyncStorage.setItem('musicRefCache',
        JSON.stringify(musicRefCache.concat([{
            url: url,
            path: path,
            updatedAt: Date.now(),
            views: 1,
            state: 'progressing'
        }]))
    )



    const key2 = await AsyncStorage.getItem('musicRefCache')
    console.log(JSON.parse(key2))

    // add the file in the cache
    // RNFetchBlob.config({ path })
    //     .fetch("GET", url)
    //     .then((result) => dispatch(completeFileCache(url, result.path())))
    //     .catch(() => dispatch(failFileCache(url)))


}











export function resetAllRefMusic() {
    return  AsyncStorage.setItem('musicRefCache', JSON.stringify([]))
}



