import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import HomeMusic from '../components/space/music/home-music'
import PlaylistPage from '../components/space/music/playlist-page'

const HomeMusicRoute = createStackNavigator(
    { Music: { screen: HomeMusic } },
    { headerMode: 'none', initialRouteName: 'Music' }
)

const PlaylistPageRoute = createStackNavigator(
    {
        PlaylistPage: { screen: ({ navigation }) => <PlaylistPage screenProps={{ rootNavigation: navigation }} /> }
    },
    { headerMode: 'none', initialRouteName: 'PlaylistPage' }
)

const MusicNavigation = createStackNavigator(
    {
        Music: HomeMusicRoute,
        PlaylistPage: PlaylistPageRoute
    },
    { headerMode: 'none', initialRouteName: 'Music' }
)

export default createAppContainer(MusicNavigation)

