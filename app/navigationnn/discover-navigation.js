import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import Profile from '../components/space/profile/profile'
import MyProfile from '../components/space/profile/my-profile'
import Discover from '../components/space/discover/discover'
import Page from '../components/space/page/page'

const DiscoverFeedRoute = createStackNavigator(
    { Discover: { screen: Discover } },
    { headerMode: 'none', initialRouteName: 'Discover' }
)

const ProfileRoute = createStackNavigator(
    {
        Profile: { screen: ({ navigation }) => <Profile screenProps={{ rootNavigation: navigation }} /> }
    },
    { headerMode: 'none', initialRouteName: 'Profile' }
)

const MyProfileRoute = createStackNavigator(
    {
        MyProfile: { screen: ({ navigation }) => <MyProfile screenProps={{ rootNavigation: navigation }} /> }
    },
    { headerMode: 'none', initialRouteName: 'MyProfile' }
)

const PageRoute = createStackNavigator(
    { Page: { screen: Page } },
    { headerMode: 'none', initialRouteName: 'Page' }
)


const DiscoverNavigation = createStackNavigator(
    {
        Discover: DiscoverFeedRoute,
        Profile: ProfileRoute,
        MyProfile: MyProfileRoute,
        Page: PageRoute
    },
    { headerMode: 'none', initialRouteName: 'Discover' }
)

export default createAppContainer(DiscoverNavigation)