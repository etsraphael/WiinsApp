import TrackPlayer from 'react-native-track-player';

// to list the music is playing
export function listenerMusic(actions) {


    notificationControlMusicEvent(actions)

    return TrackPlayer.addEventListener('playback-state', async (data) => {

        let progress = null

        switch (data.state) {
            case 'ready': {
                progress = timer(actions)
                break
            }
            case 'idle':
            case 'paused': {
                clearInterval(progress)
                break
            }
            default: return null
        }

    })
}

// to set a timer for the music
export function timer(actions) {
    return setInterval(async () => {
        const position = await TrackPlayer.getPosition()
        const duration = await TrackPlayer.getDuration()
        actions.progessTimerActions(position, duration)
    }, 1000)
}


notificationControlMusicEvent = (actions) => {

    TrackPlayer.addEventListener('remote-play', () => {
        actions.continuePlayerActions()
    })

    TrackPlayer.addEventListener('remote-pause', () => {
        actions.pausePlayerActions()
    })

    TrackPlayer.addEventListener('remote-previous', () => {
        actions.previousMusicActions()
    })

    TrackPlayer.addEventListener('remote-next', () => {
        actions.nextMusicActions()
    })


}