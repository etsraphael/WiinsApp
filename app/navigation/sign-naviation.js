import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import OnBoarding from '../components/sign/on-boarding'
import SignIn from '../components/sign/sign-in'
import SignUp from '../components/sign/sign-up'
import { NavigationContainer } from '@react-navigation/native'


const Stack = createStackNavigator()

export default SignNavigation = () => (
    <NavigationContainer>
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={'OnBoarding'}
        >
            <Stack.Screen name={'OnBoarding'} component={OnBoarding} />
            <Stack.Screen name={'SignIn'} component={SignIn} />
            <Stack.Screen name={'Register'} component={SignUp} />
        </Stack.Navigator>
    </NavigationContainer>
)