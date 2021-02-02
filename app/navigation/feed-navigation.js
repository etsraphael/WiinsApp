import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import Feed from '../components/space/feed/feed'
import Profile from '../components/space/profile/profile'
import Page from '../components/space/page/page'
import MyProfile from '../components/space/profile/my-profile'
import Sign from '../components/sign/sign'
import Setting from '../components/space/setting/setting'
import SettingProfile from '../components/space/setting/setting-profile'
import SettingLedger from '../components/space/setting/setting-ledger'
import SettingOther from '../components/space/setting/setting-other'
import SettingPassword from '../components/space/setting/setting-password'
import SettingCertification from '../components/space/setting/setting-certification'

const FeedRoute = createStackNavigator(
    { Feed: { screen: Feed } },
    { headerMode: 'none', initialRouteName: 'Feed' }
)

const SettingRoute = createStackNavigator(
    { 
        Setting: { screen: ({ navigation }) => <Setting screenProps={{ rootNavigation: navigation }} /> }, 
        SettingProfile: { screen: ({ navigation }) => <SettingProfile screenProps={{ rootNavigation: navigation }} /> },
        SettingLedger: { screen: ({ navigation }) => <SettingLedger screenProps={{ rootNavigation: navigation }} /> }, 
        SettingOther: { screen: ({ navigation }) => <SettingOther screenProps={{ rootNavigation: navigation }} /> }, 
        SettingPassword: { screen: ({ navigation }) => <SettingPassword screenProps={{ rootNavigation: navigation }} /> }, 
        SettingCertification: { screen: ({ navigation }) => <SettingCertification screenProps={{ rootNavigation: navigation }} /> }, 
    },
    { headerMode: 'none', initialRouteName: 'Setting' }
)

const ProfileRoute = createStackNavigator(
    { Profile: { screen: ({ navigation }) => <Profile screenProps={{ rootNavigation: navigation }} /> } },
    { headerMode: 'none', initialRouteName: 'Profile' }
)

const PageRoute = createStackNavigator(
    { Page: { screen: Page } },
    { headerMode: 'none', initialRouteName: 'Page' }
)

const MyProfileRoute = createStackNavigator(
    {
        MyProfile: { screen: ({ navigation }) => <MyProfile screenProps={{ rootNavigation: navigation }} /> },
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
        Setting: SettingRoute
    },
    { headerMode: 'none', initialRouteName: 'Feed' }
)

export default createAppContainer(FeedNavigation)

