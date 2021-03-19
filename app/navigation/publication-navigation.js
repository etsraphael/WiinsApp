import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Camera from '../components/space/publication/camera'
import PendingPublication from '../components/space/publication/pending-publication'
import MyStory from '../components/space/publication/my-story'

const Stack = createStackNavigator()

export default PublicationModalNavigation = (propsInitial) => (

    <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={'Camera'}
    >
        <Stack.Screen name={'Camera'}>
            {() => <Camera closeModal={propsInitial.closeModal} />}
        </Stack.Screen>
        <Stack.Screen name={'PendingPublication'} component={PendingPublication} />
        <Stack.Screen name={'MyStory'} component={MyStory} />
    </Stack.Navigator>
)