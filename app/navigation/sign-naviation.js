import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import OnBoarding from '../components/sign/on-boarding'
import Sign from '../components/sign/sign'
import { NavigationContainer } from '@react-navigation/native'
import { Navigator, AppRegistry, View } from 'react-native'
import SignIn from '../components/sign/sign-in'
import SignUp from '../components/sign/sign-up'
import { Component } from 'react'


const Stack = createStackNavigator()

export default SignNavigation = () => (
    <NavigationContainer>
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={'OnBoarding'}
        >
            <Stack.Screen name={'OnBoarding'} component={OnBoarding} />
            <Stack.Screen name={'Sign'}>
                {(props) => <Sign { ...props } />}
            </Stack.Screen>
        </Stack.Navigator>
    </NavigationContainer>
)

export const SignnNavigation = () => (
    <NavigationContainer>
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={'SignIn'}
        >
            <Stack.Screen name={'SignUp'} component={SignUp} />
            <Stack.Screen name={'SignIn'} component={SignIn} />
        </Stack.Navigator>
    </NavigationContainer>
)


class SignNavigationn extends Component {
    renderScene = (route, nav) => {
        switch (route.id) {
            case 'SignIn':
                return <SignIn navigator={nav} />
            case 'SignUp':
                return <SignUp navigator={nav} />
        }
    }
   render() {
        return (
            <View>
                <Navigator initialRouteName={{ Screen: 'SignIn' }} renderScene={renderScene} />
            </View>
        )
   }
}

AppRegistry.registerComponent('SignNavigationn', () => SignNavigationn)