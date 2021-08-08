import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import OnBoarding from '../components/sign/on-boarding'
import { NavigationContainer } from '@react-navigation/native'
import { Navigator, AppRegistry, View } from 'react-native'
import { SignIn, SignUp, UseCondition, ForgotPassword } from '../components/sign'
import { Component } from 'react'


const Stack = createStackNavigator()

export default SignNavigation = () => (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={'OnBoarding'}>
            <Stack.Screen name={'OnBoarding'} component={OnBoarding} />
            <Stack.Screen name={'SignIn'} component={SignIn} />
            <Stack.Screen name={'SignUp'} component={SignUp} />
            <Stack.Screen name={'ForgotPassword'} component={ForgotPassword} />
            <Stack.Screen name={'UseCondition'} component={UseCondition} />
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