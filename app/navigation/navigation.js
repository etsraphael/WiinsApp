import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import Sign from '../components/sign/sign'
import HomeApp from '../components/core/homeApp'

const BeforeSign = createStackNavigator(
    { Sign: { screen: Sign } },
    { headerMode: 'none', initialRouteName: 'Sign' }
)

const AfterSign = createStackNavigator(
    { HomeApp: { screen: HomeApp } },
    { headerMode: 'none', initialRouteName: 'HomeApp' }
)

const MainNavigation = createStackNavigator(
    { 
        Auth: BeforeSign,
        App: AfterSign
     },
    { headerMode: 'none', initialRouteName: 'Auth' }
)

export default createAppContainer(MainNavigation)

