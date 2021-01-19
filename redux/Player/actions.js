import * as ActionTypes from './constants'
import TrackPlayer from 'react-native-track-player'
import AsyncStorage from '@react-native-community/async-storage'
import { likeMusicSuccess, dislikeMusicSuccess } from './../PlaylistMusicPage/actions'
import { addMusicAfterLiked, pullMusicAfterDisliked } from './../MyFavMusic/actions'

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
    return (dispatch, props) => {

        // control the loops
        if ( ((Math.round(duration) - Math.round(position)) < 0.5 ) && props().Player.repeatMode == 'music') {
            TrackPlayer.seekTo(0)
            return null
        }

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

            for (let [i, music] of tracklist.entries()) {
                tracklist[i] = {
                    id: music._id,
                    url: music.file,
                    title: music.name,
                    artist: music.profile._meta.pseudo,
                    artwork: music.imgUrl,
                    profile: music.profile,
                    isLiked: music.isLiked,
                    music: music
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
            for (let [i, music] of tracklist.entries()) {

                tracklist[i] = {
                    id: music._id,
                    url: music.file,
                    title: music.name,
                    artist: music.profile._meta.pseudo,
                    artwork: music.imgUrl,
                    profile: music.profile,
                    isLiked: music.isLiked,
                    music: music
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

export function likeMusicFromPlayer(id) {
    return { type: ActionTypes.LIKE_MUSIC_FROM_PLAYER, id }
}

export function likeMusicFromPlayerSuccess(id) {
    return { type: ActionTypes.LIKE_MUSIC_FROM_PLAYER_SUCCESS, id }
}

export function likeMusicFromPlayerFail(id) {
    return { type: ActionTypes.LIKE_MUSIC_FROM_PLAYER_FAIL, id }
}

export function dislikeMusicFromPlayer(id) {
    return { type: ActionTypes.DISLIKE_MUSIC_FROM_PLAYER, id }
}

export function dislikeMusicFromPlayerSuccess(id) {
    return { type: ActionTypes.DISLIKE_MUSIC_FROM_PLAYER_SUCCESS, id }
}

export function dislikeMusicFromPlayerFail(id) {
    return { type: ActionTypes.DISLIKE_MUSIC_FROM_PLAYER_FAIL, id }
}

export function likeMusicFromPlayerAction(music) {
    return async (dispatch) => {
        try {

            if (!music) return null

            dispatch(likeMusicFromPlayer(music._id))
            const url = 'https://wiins-backend.herokuapp.com/music/liked/' + music._id
            const token = await AsyncStorage.getItem('userToken')

            return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
                .then((response) => response.json())
                .then(async (response) => {
                    if (response.status == 200) {

                        // update the music in the playlist
                        dispatch(likeMusicSuccess(music._id))

                        // add the music in the favorite playlist
                        dispatch(addMusicAfterLiked(music))

                        return dispatch(likeMusicFromPlayerSuccess(music._id))
                    }
                    return dispatch(likeMusicFromPlayerFail(music._id))
                })
        } catch (error) {
            return dispatch(likeMusicFromPlayerFail(music._id))
        }
    }
}

export function dislikeMusicFromPlayerAction(id) {
    return async (dispatch) => {
        try {

            dispatch(dislikeMusicFromPlayer(id))
            const url = 'https://wiins-backend.herokuapp.com/music/dislike/' + id
            const token = await AsyncStorage.getItem('userToken')

            return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
                .then((response) => response.json())
                .then(async (response) => {
                    if (response.status == 200) {

                        // update the music in the playlist
                        dispatch(dislikeMusicSuccess(id))

                        // add the music in the favorite playlist
                        dispatch(pullMusicAfterDisliked(id))

                        return dispatch(dislikeMusicFromPlayerSuccess(id))
                    }
                    return dispatch(dislikeMusicFromPlayerFail(id))
                })
        } catch (error) {
            return dispatch(dislikeMusicFromPlayer(id))
        }
    }
}

export function followArtist(id) {
    return { type: ActionTypes.FOLLOW_ARTIST, id }
}

export function followArtistSuccess() {
    return { type: ActionTypes.FOLLOW_ARTIST_SUCCESS }
}

export function followArtistFail(id) {
    return { type: ActionTypes.FOLLOW_ARTIST_FAIL, id }
}

export function followArtistActions(musicId, profileId) {
    return async (dispatch) => {
        try {
            dispatch(followArtist())

            const token = await AsyncStorage.getItem('userToken')
            return fetch('https://wiins-backend.herokuapp.com/profile/follow/' + profileId, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((response) => response.json())
                .then(response => {
                    if (response.status == 200) return dispatch(followArtistSuccess())
                    dispatch(followArtistFail(response.status))
                })

        } catch (error) {
            dispatch(followArtistFail(error))
        }
    }
}

export function controlRepeatOneMusic() {
    return { type: ActionTypes.CONTROL_REPEAT_ONE_MUSIC }
}

export function controlRepeatOnePlaylist() {
    return { type: ActionTypes.CONTROL_REPEAT_ONE_PLAYLIST }
}

export function controlRepeatDeactivated() {
    return { type: ActionTypes.CONTROL_REPEAT_DEACTIVATED }
}

export function shuffleMusics() {
    return { type: ActionTypes.SHUFFLE_MUSIC }
}

export function unShuffleMusics() {
    return { type: ActionTypes.UNSHUFFLE_MUSIC }
}

export function shuffleMusicsAction() {
    return async (dispatch) => {

        // get the old queue
        let musicQueue = await TrackPlayer.getQueue()

        // reset the queue
        await TrackPlayer.removeUpcomingTracks()

        // shake the queue
        musicList = musicQueue
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value)

        // update the queue
        await TrackPlayer.add(musicList)
        
        return dispatch(shuffleMusics())
    }
}

export function unshuffleMusicsAction() {
    return (dispatch) => dispatch(unShuffleMusics())
}

export function controlRepeatOneMusicAction() {
    return (dispatch) => dispatch(controlRepeatOneMusic())
}

export function controlRepeatOnePlaylistAction() {
    return (dispatch) => dispatch(controlRepeatOnePlaylist())
}

export function controlRepeatDeactivatedAction() {
    return (dispatch) => dispatch(controlRepeatDeactivated())
}