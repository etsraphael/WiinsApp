export const initialState = {
    trackList: [],
    musicIsPlaying: null,
    isPlayling: false,
    isLoading: false,
    error: null,
    displayMiniPlayer: false,
    repeatMode: 'none',
    random: false,
    timer: {
        start: '00:00',
        end: '00:00',
        position: 0,
        duration: 0
    }
}