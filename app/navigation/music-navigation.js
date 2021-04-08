import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeMusic from '../components/space/music/home-music'
import PlaylistPage from '../components/space/music/playlist-page'
import CommentPage from './../components/core/reusable/comment/comment-page'

const Stack = createStackNavigator()

export default MusicNavigation = () => (
    <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={'Music'}
    >
        <Stack.Screen name={'Music'} component={HomeMusic} />
        <Stack.Screen name={'PlaylistPage'} component={PlaylistPage} />
        <Stack.Screen name={'Comments'} component={CommentPage} />
    </Stack.Navigator>
)

