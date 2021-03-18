import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHomeLg, faMusic, faCommentsAlt, faTv, faCompass } from '@fortawesome/pro-light-svg-icons'
import MainDiscover from '../components/space/discover/main-discover'
import MainMessenger from '../components/space/messenger/main-messenger'
import MainMusic from '../components/space/music/main-music'
import MainTube from '../components/space/tube/main-tube'
import { StatusBar } from 'react-native'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import {
    MAIN_FEED,
    MAIN_DISCOVER,
    MAIN_TUBE,
    MAIN_MUSIC,
    MAIN_MESSENGER
} from './constant'

import FeedNavigation from './feed-navigation'

const MyTheme = {
    ...DefaultTheme,
    dark: false,
    colors: {
        ...DefaultTheme.colors,
        primary: 'white',
        background: 'white',
        card: '#191919',
        text: 'white',
        border: '#191919',
        notification: 'white',
    }
}

const BottomTab = createBottomTabNavigator()

const MainTabNavigation = () => (
    <BottomTab.Navigator
        initialRouteName="Home"
        tabBarOptions={
            {
                showLabel: false,
                activeTintColor: 'black',
                inactiveTintColor: '#ced4d9',
                style: {
                    borderTopLeftRadius: 35,
                    borderTopRightRadius: 35,
                    overflow: 'hidden',
                    backgroundColor: '#ffffff',
                    position: 'absolute',
                    border: 0
                }
            }
        }
    >
        <BottomTab.Screen
            name={MAIN_FEED}
            component={FeedNavigation}
            options={{ tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faHomeLg} color={color} size={25} /> }}
        />

        <BottomTab.Screen
            name={MAIN_DISCOVER}
            component={MainDiscover}
            options={{ tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faCompass} color={color} size={25} /> }}
        />

        <BottomTab.Screen
            name={MAIN_TUBE}
            component={MainTube}
            options={{ tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faTv} color={color} size={25} /> }}
        />

        <BottomTab.Screen
            name={MAIN_MUSIC}
            component={MainMusic}
            options={{ tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faMusic} color={color} size={25} /> }}
        />

        <BottomTab.Screen
            name={MAIN_MESSENGER}
            component={MainMessenger}
            options={{ tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faCommentsAlt} color={color} size={25} /> }}
        />

    </BottomTab.Navigator>
)

const MainNavigationContainer = () => (
    <NavigationContainer theme={MyTheme}>
        <StatusBar
            animated={true}
            backgroundColor="white"
            barStyle={'default'}
            showHideTransition={'fade'}
            hidden={false}
        />

        <MainTabNavigation />
    </NavigationContainer>
)

export default MainNavigationContainer
