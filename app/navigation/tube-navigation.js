import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeTube from '../components/space/tube/home-tube'
import TubePage from '../components/space/tube/tube-page'
import TubeListPage from '../components/space/tube/tube-list-page'

const Stack = createStackNavigator()

export default TubeNavigation = () => (
    <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={'HomeTube'}
    >
        <Stack.Screen name={'HomeTube'} component={HomeTube} />
        <Stack.Screen name={'TubePage'} component={TubePage} />
        <Stack.Screen name={'TubeListPage'} component={TubeListPage} />
    </Stack.Navigator>
)
