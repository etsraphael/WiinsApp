import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import HomeTube from '../components/space/tube/home-tube'
import TubePage from '../components/space/tube/tube-page'
import TubeListPage from '../components/space/tube/tube-list-page'
import CommentPage from './../components/core/reusable/comment/comment-page'

const HomeTubeRoute = createStackNavigator(
    { HomeTube: { screen: HomeTube } },
    { headerMode: 'none', initialRouteName: 'HomeTube' }
)

const TubePageRoute = createStackNavigator(
    { 
        TubePage: { screen: ({ navigation }) => <TubePage screenProps={{ rootNavigation: navigation }}/> },
        Comments: { screen: CommentPage }
    },
    { headerMode: 'none', initialRouteName: 'TubePage' }
)

const TubeListPageRoute = createStackNavigator(
    { TubeListPage: { screen: ({ navigation }) => <TubeListPage screenProps={{ rootNavigation: navigation }}/> } },
    { headerMode: 'none', initialRouteName: 'TubeListPage' }
)

const TubeNavigation = createStackNavigator(
    {
        Home: HomeTubeRoute,
        TubePage: TubePageRoute,
        TubeListPage: TubeListPageRoute
    },
    { headerMode: 'none', initialRouteName: 'Home' }
)

export default createAppContainer(TubeNavigation)

