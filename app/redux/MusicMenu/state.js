export const initialState = {
    menu: {
        playlitsSuggestion: {
            lastestPlaylist: [],
            followingUsersPlaylist: []
        },
        stylesSuggestion: {
            rap: [],
            pop: [],
            kPop: [],
            dance: []
        }
    },
    isLoading: false,
    isRefreshing: false,
    error: null,
}