import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import HomeTube from '../components/space/tube/home-tube'
import TubePage from '../components/space/tube/tube-page'

const HomeTubeRoute = createStackNavigator(
    { HomeTube: { screen: HomeTube } },
    { headerMode: 'none', initialRouteName: 'HomeTube' }
)

const TubePageRoute = createStackNavigator(
    { 
        TubePage: { screen: ({ navigation }) => <TubePage screenProps={{ rootNavigation: navigation }}/> }
    },
    { headerMode: 'none', initialRouteName: 'TubePage' }
)

const TubeNavigation = createStackNavigator(
    {
        Home: HomeTubeRoute,
        TubePage: TubePageRoute
    },
    { headerMode: 'none', initialRouteName: 'Home' }
)

export default createAppContainer(TubeNavigation)

