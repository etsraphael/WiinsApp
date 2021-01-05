import AsyncStorage from '@react-native-community/async-storage'
import RNFetchBlob from 'rn-fetch-blob'

export async function addRefMusic(url) {

    // check if the cache music cache exist
    let musicRefCache = await AsyncStorage.getItem('musicRefCache');
    if (!musicRefCache) await AsyncStorage.setItem('musicRefCache', JSON.stringify([]))

    // pars the json to manipulate it
    musicRefCache = JSON.parse(musicRefCache)

    // check if the ref exist to increment, or create
    const musicFound = musicRefCache.map(x => x.url).indexOf(url)
    if (musicFound == -1) {
        return addMusicFileInCache(url, musicRefCache)
    } else {
        return incrementMusicViewInCache(musicFound, musicRefCache)
    }

}

function incrementMusicViewInCache(index, musicRefCache) {

    musicRefCache[index] = {
        ...musicRefCache[index],
        views: ++musicRefCache[index].views,
        updatedAt: Date.now()
    }

    return AsyncStorage.setItem('musicRefCache', JSON.stringify(musicRefCache))
}

async function addMusicFileInCache(url, musicRefCache) {

    // add the ref if the file in the cache doesn't exist, we create it
    const path = RNFetchBlob.fs.dirs.MusicDir + "/" + url.split('/')[3] + '.mp3'
    musicRefCache.push({ url: url, path: path, updatedAt: Date.now(), views: 1, state: 'progressing' })
    await AsyncStorage.setItem('musicRefCache', JSON.stringify(musicRefCache))

    // get the index of the new object
    const indexMusic = musicRefCache.map(x => x.url).indexOf(url)

    // add the file in the cache
    RNFetchBlob.config({ path })
        .fetch("GET", url)
        .then((result) => {
            musicRefCache[indexMusic] = {
                url,
                path: result.path(),
                updatedAt: Date.now(),
                views: 1,
                state: 'confirmed'
            }
            return AsyncStorage.setItem('musicRefCache', JSON.stringify(musicRefCache))
        })
        .catch(() => {
            musicRefCache[indexMusic] = {
                url,
                path: result.path(),
                updatedAt: Date.now(),
                views: 1,
                state: 'failed'
            }
            return AsyncStorage.setItem('musicRefCache', JSON.stringify(musicRefCache))
        })
}

export async function resetAllRefMusic() {

    let musicRefCache = await AsyncStorage.getItem('musicRefCache')
    if (!musicRefCache) return AsyncStorage.setItem('musicRefCache', JSON.stringify([]))
    else {

        // pars the json to manipulate it
        musicRefCache = JSON.parse(musicRefCache)

        // delete each musics
        for (let music of musicRefCache) {
            await resetRefMusicByUrl(music.url)
        }

    }


}

export async function resetRefMusicByUrl(url) {
    return RNFetchBlob.fs.unlink(RNFetchBlob.fs.dirs.MusicDir + "/" + url.split('/')[3] + '.mp3')
        .then(async () => {

            // get the music ref
            let musicRefCache = await AsyncStorage.getItem('musicRefCache')

            // pars the json to manipulate it
            musicRefCache = JSON.parse(musicRefCache)

            // delete the ref 
            musicRefCache = musicRefCache.filter(music => music.url !== url)

            return AsyncStorage.setItem('musicRefCache', JSON.stringify(musicRefCache))
        })
}

export async function getCacheLinkOrSeverLink(url) {

    // get the musicRefCache
    let musicRefCache = await AsyncStorage.getItem('musicRefCache')

    // pars the json to manipulate it
    musicRefCache = JSON.parse(musicRefCache)

    // replace the link if it's in the cache
    const musicFound = musicRefCache.find(music => (music.url === url) && (music.state == 'confirmed'))

    if(musicFound) return musicFound.path
    else return url

}

export async function verificationMusicCacheFormat(payload){

    // get the musicRefCache
    let musicRefCache = await AsyncStorage.getItem('musicRefCache')

    // pars the json to manipulate it
    musicRefCache = JSON.parse(musicRefCache)

    // replace the link if it's in the cache
    for([i, m] of payload.musicList.entries()){
        const musicFound = musicRefCache.find(music => (music.url == m.file) && (music.state == 'confirmed'))

        if(musicFound){
            payload.musicList[i].file = musicFound.path
            payload.musicList[i].inCache = true
        } else {
            payload.musicList[i].inCache = false 
        }
    }

    return payload
}