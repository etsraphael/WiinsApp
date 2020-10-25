import { createStore, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { AsyncStorage } from 'react-native';
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import MyUserReducer from './../../redux/MyUser/reducer'
import FeedPublicationsReducer from './../../redux/FeedPublications/reducer'
import PublicationsProfileReducer from './../../redux/ProfilePublications/reducer'
import PublicationsDiscoverReducer from './../../redux/DiscoverPublications/reducer'
import PlayerReducer from './../../redux/Player/reducer'
import SearchReducer from './../../redux/SearchBar/reducer'
import PageReducer from './../../redux/Page/reducer'
import RoomReducer from './../../redux/OneRoom/reducer'
import MyProfileReducer from './../../redux/MyProfile/reducer'
import MusicProjectList from './../../redux/MusicProjectList/reducer'
import ProfileReducer from './../../redux/Profile/reducer'
import TopHastagReducer from './../../redux/TopHastag/reducer'
import MyFavMusicReducer from './../../redux/MyFavMusic/reducer'
import MusicMenuReducer from './../../redux/MusicMenu/reducer'
import PlaylistPageReducer from './../../redux/PlaylistMusicPage/reducer'
import RoomListReducer from './../../redux/RoomList/reducer'
import CommentListReducer from './../../redux/CommentList/reducer'
import PendingPublicationsReducer from './../../redux/PendingPublications/reducer'
import StoriesReducer from './../../redux/Stories/reducer'
import MyStoryReducer from './../../redux/MyStory/reducer'
import TubeMenuReducer from './../../redux/TubeMenu/reducer'
import TubePageReducer from './../../redux/TubePage/reducer'

const rootReducer = combineReducers(
    { 
        MyUser: MyUserReducer,
        FeedPublications: FeedPublicationsReducer,
        Search: SearchReducer,
        MyProfile: MyProfileReducer,
        MusicProjectList: MusicProjectList,
        Profile: ProfileReducer,
        TopHastag: TopHastagReducer,
        DiscoverPublication: PublicationsDiscoverReducer,
        MyFavMusic: MyFavMusicReducer,
        MusicMenu: MusicMenuReducer,
        TubeMenu: TubeMenuReducer,
        TubePage: TubePageReducer,
        PlaylistPage: PlaylistPageReducer,
        CommentList: CommentListReducer,
        publicationProfile: PublicationsProfileReducer,
        Page: PageReducer,
        Rooms: RoomListReducer,
        Room: RoomReducer,
        Player: PlayerReducer,
        PendingPublications: PendingPublicationsReducer,
        Stories: StoriesReducer,
        MyStory: MyStoryReducer
    }
)

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const configureStore = () => {
    let store = createStore(persistedReducer, applyMiddleware(thunk))
    let persistor = persistStore(store)
    return { store, persistor }
}
