import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import Feed from '../components/space/feed/feed'
import Profile from '../components/space/profile/profile'
import Page from '../components/space/page/page'
import MyProfile from '../components/space/profile/my-profile'
import { createAppContainer } from 'react-navigation'
import Sign from '../components/sign/sign'

const FeedRoute = createStackNavigator(
    { Feed: { screen: Feed } },
    { headerMode: 'none', initialRouteName: 'Feed' }
)

const ProfileRoute = createStackNavigator(
    { 
        Profile: { screen: ({ navigation }) => <Profile screenProps={{ rootNavigation: navigation }}/> }
    },
    { headerMode: 'none', initialRouteName: 'Profile' }
)

const PageRoute = createStackNavigator(
    { Page: { screen: Page } },
    { headerMode: 'none', initialRouteName: 'Page' }
)

const MyProfileRoute = createStackNavigator(
    { 
        MyProfile: { screen: ({ navigation }) => <MyProfile screenProps={{ rootNavigation: navigation }}/> },
        Nested: { screen: Sign }
    },
    { headerMode: 'none', initialRouteName: 'MyProfile' }
)

const FeedNavigation = createStackNavigator(
    {
        Feed: FeedRoute,
        Profile: ProfileRoute,
        Page: PageRoute,
        MyProfile: MyProfileRoute,
    },
    { headerMode: 'none', initialRouteName: 'Feed' }
)

export default createAppContainer(FeedNavigation)

