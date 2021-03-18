import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Profile from '../components/space/profile/profile'
import MyProfile from '../components/space/profile/my-profile'
import Discover from '../components/space/discover/discover'
import Page from '../components/space/page/page'


const Stack = createStackNavigator()

export default DiscoverNavigation = () => (
    <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={'Discover'}
    >
        <Stack.Screen name={'Discover'} component={Discover} />
        <Stack.Screen name={'Profile'} component={Profile} />
        <Stack.Screen name={'MyProfile'} component={MyProfile} />
        <Stack.Screen name={'Page'} component={Page} />
    </Stack.Navigator>
)