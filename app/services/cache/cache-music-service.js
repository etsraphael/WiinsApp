import AsyncStorage from '@react-native-community/async-storage'
import RNFetchBlob from 'rn-fetch-blob'

export async function addRefMusic(url, actions) {

    // check if the cache music cache exist
    let musicRefCache = await AsyncStorage.getItem('musicRefCache');
    if (!musicRefCache) await AsyncStorage.setItem('musicRefCache', JSON.stringify([]))

    // pars the json to manipulate it
    musicRefCache = JSON.parse(musicRefCache)

    // check if the ref exist to increment, or create
    const musicFound = musicRefCache.map(x => x.url).indexOf(url)
    if (musicFound == -1) {
        return addMusicFileInCache(url, actions, musicRefCache)
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

async function addMusicFileInCache(url, actions, musicRefCache) {

    await actions.setMusicInTheCacheAction(url)

    // add the ref if the file in the cache doesn't exist, we create it
    const path = RNFetchBlob.fs.dirs.MusicDir + "/" + url.split('/')[3] + '.mp3'
    musicRefCache.push({ url: url, path: path, updatedAt: Date.now(), views: 1, state: 'progressing' })
    await AsyncStorage.setItem('musicRefCache', JSON.stringify(musicRefCache))

    // get the index of the new object
    const indexMusic = musicRefCache.map(x => x.url).indexOf(url)

    // add the file in the cache
    RNFetchBlob.config({ path })
        .fetch("GET", url)
        .then(async (result) => {
            musicRefCache[indexMusic] = {
                url,
                path: result.path(),
                updatedAt: Date.now(),
                views: 1,
                state: 'confirmed'
            }
            // set the store here
            await actions.setMusicInTheCacheActionSuccess(url)
            // regist the new file
            return AsyncStorage.setItem('musicRefCache', JSON.stringify(musicRefCache))
        })
        .catch(async () => {
            musicRefCache[indexMusic] = {
                url,
                path: result.path(),
                updatedAt: Date.now(),
                views: 1,
                state: 'failed'
            }
            // set the store here
            await actions.setMusicInTheCacheActionFail(url)
            // regist the new file
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

    if (musicFound) return musicFound.path
    else return url

}

export async function verificationMusicCacheFormat(musicList) {

    // get the musicRefCache
    let musicRefCache = await AsyncStorage.getItem('musicRefCache')

    // pars the json to manipulate it
    musicRefCache = JSON.parse(musicRefCache)

    // replace the link if it's in the cache
    for ([i, m] of musicList.entries()) {
        const musicFound = musicRefCache.find(music => (music.url == m.file) && (music.state == 'confirmed'))

        if (musicFound) {
            musicList[i].file = musicFound.path
            musicList[i].inCache = 'confirmed'
        } else {
            musicList[i].inCache = 'not'
        }
    }

    return musicList
}

export async function downloadFavoritesMusicList(musicList, actions) {

    // start the download
    actions.startOfUploadActions()

    // get the musics not downloaded
    let musicToDownload = musicList.filter(x => x.inCache == 'not')

    // check if the cache music cache exist
    let musicRefCache = await AsyncStorage.getItem('musicRefCache');
    if (!musicRefCache) await AsyncStorage.setItem('musicRefCache', JSON.stringify([]))

    // pars the json to manipulate it
    musicRefCache = JSON.parse(musicRefCache)

    // download all the music, and change the cache state in the store
    for (let m of musicToDownload) {
        await addMusicFileInCache(m.file, actions, musicRefCache)
    }

    // end of the download
    actions.endOfUploadActions()

}