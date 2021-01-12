import * as ActionTypes from './constants'
import TrackPlayer from 'react-native-track-player'

export function continueMusic() {
    return { type: ActionTypes.CONTINUE_MUSIC }
}

export function progressTimer(payload) {
    return {
        type: ActionTypes.PROGRESS_UPDATE,
        payload
    }
}

export function nextMusic() {
    return { type: ActionTypes.NEXT_MUSIC }
}

export function previousMusic() {
    return { type: ActionTypes.PREV_MUSIC }
}

export function playMusic(music, trackList) {
    return {
        type: ActionTypes.PLAY_MUSIC,
        music,
        trackList
    }
}

export function pauseMusic() {
    return {
        type: ActionTypes.PAUSE_MUSIC
    }
}

export function resetPlayer() {
    return {
        type: ActionTypes.RESET_PLAYER
    }
}

export function resetPlayerActions() {
    return (dispatch) => {
        TrackPlayer.reset()
        return dispatch(resetPlayer())
    }
}

export function continuePlayerActions() {
    return async (dispatch) => {
        TrackPlayer.play()
        return dispatch(continueMusic())
    }
}

export function pausePlayerActions() {
    return async (dispatch) => {
        TrackPlayer.pause()
        return dispatch(pauseMusic())
    }
}

export function stopPlayer() {
    return { type: ActionTypes.STOP_PLAYER }
}

export function progessTimerActions(position, duration) {
    return (dispatch) => {

        if (position <= 0) return null
        const minutes = Math.floor(position / 60)
        let seconds = Math.round(position - minutes * 60)
        if (seconds < 10) seconds = '0' + seconds

        const payload = {
            start: (minutes + ':' + seconds),
            end: (minutes - Math.floor(duration / 60) + ':' + -(seconds - 60)),
            position,
            duration
        }

        return dispatch(progressTimer(payload))
    }
}

export function stopPlayerActions() {
    return async (dispatch) => {
        await TrackPlayer.stop()
        return dispatch(stopPlayer())
    }
}

export function playMusicActions(music, payload) {
    return async (dispatch) => {
        try {

            // reset the player
            await dispatch(resetPlayer())
            await TrackPlayer.reset()

            let tracklist = payload

            for(let [i, music] of tracklist.entries()){  
                tracklist[i] = {
                    id: music._id,
                    url: music.file,
                    title: music.name,
                    artist: music.profile._meta.pseudo,
                    artwork: music.imgUrl,
                    profile: music.profile
                }
            }

            TrackPlayer.setupPlayer().then(async () => {
                await TrackPlayer.add(tracklist)
                TrackPlayer.skip(music._id)
                TrackPlayer.play()
            })

            return dispatch(playMusic(tracklist[tracklist.map(x => x.id).indexOf(music._id)], tracklist))

        } catch (error) { return null }
    }
}

export function playRandomMusicInPlaylistActions(payload) {
    return async (dispatch) => {
        try {

            // reset the player
            await dispatch(resetPlayer())
            await TrackPlayer.reset()

            let tracklist = payload
            for(let [i, music] of tracklist.entries()){

                tracklist[i] = {
                    id: music._id,
                    url: music.file,
                    title: music.name,
                    artist: music.profile._meta.pseudo,
                    artwork: music.imgUrl,
                    profile: music.profile
                }

            }

            // choose the music
            const randomNumber = Math.abs(Math.round((Math.random() * tracklist.length) - 1))
            const firstMusic = tracklist[randomNumber]
            let musicList = tracklist.filter(x => x !== firstMusic)

            musicList = musicList
                .map((a) => ({ sort: Math.random(), value: a }))
                .sort((a, b) => a.sort - b.sort)
                .map((a) => a.value)

            // finally the playlist
            const musicListFormat = [firstMusic, ...musicList]

            TrackPlayer.setupPlayer().then(async () => {
                await TrackPlayer.add(musicListFormat)
                TrackPlayer.play()
            })

            return dispatch(playMusic(firstMusic, musicListFormat))
        } catch (error) { return null }
    }
}

export function nextMusicActions() {
    return (dispatch) => {
        TrackPlayer.skipToNext()
        return dispatch(nextMusic())
    }
}

export function previousMusicActions() {
    return async (dispatch) => {
        await TrackPlayer.skipToPrevious()
        return dispatch(previousMusic())
    }
}