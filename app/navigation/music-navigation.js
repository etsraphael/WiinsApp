import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeMusic from '../components/space/music/home-music'
import PlaylistPage from '../components/space/music/playlist-page'
import CommentPage from './../components/core/reusable/comment/comment-page'

const Stack = createStackNavigator()

export default MusicNavigation = (initialProps) => (
    <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={'Music'}
    >
        <Stack.Screen name={'Music'}>
            {(props) => <HomeMusic {...props} params={initialProps.route.params} />}
        </Stack.Screen>
        <Stack.Screen name={'PlaylistPage'} component={PlaylistPage} />
        <Stack.Screen name={'Comments'} component={CommentPage} />
    </Stack.Navigator>
)

