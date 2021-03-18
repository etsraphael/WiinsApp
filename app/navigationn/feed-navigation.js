import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Feed from '../components/space/feed/feed'
import Profile from '../components/space/profile/profile'

const Stack = createStackNavigator()

export default FeedNavigation = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={'Feed'} component={Feed} />
        <Stack.Screen name={'Profile'} component={Profile} />
    </Stack.Navigator>
)