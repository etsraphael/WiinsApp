import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import MyProfile from '../components/space/profile/my-profile'
import Page from '../components/space/page/page'
import HomeMessenger from '../components/space/messenger/home-messenger'
import OneRoom from '../components/space/messenger/one-room'

const Stack = createStackNavigator()

export default MessengerNavigation = (initialProps) => (
    <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={'HomeMessenger'}
    >
        <Stack.Screen name={'HomeMessenger'}>
            {(props) => <HomeMessenger {...props} params={initialProps.route.params}/>}
        </Stack.Screen>
        <Stack.Screen name={'OneRoom'} component={OneRoom} />
        <Stack.Screen name={'MyProfile'} component={MyProfile} />
        <Stack.Screen name={'Page'} component={Page} />
    </Stack.Navigator>
)