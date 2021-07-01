import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import OnBoarding from '../components/sign/on-boarding'
import Sign from '../components/sign/sign'
import { NavigationContainer } from '@react-navigation/native'


const Stack = createStackNavigator()

export default SignNavigation = () => (
    <NavigationContainer>
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={'OnBoarding'}
        >
            <Stack.Screen name={'OnBoarding'} component={OnBoarding} />
            <Stack.Screen name={'Sign'} component={Sign} />
        </Stack.Navigator>
    </NavigationContainer>
)