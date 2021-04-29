import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHomeLg, faMusic, faCommentsAlt, faTv, faCompass } from '@fortawesome/pro-light-svg-icons'
import { StatusBar } from 'react-native'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import FeedNavigation from './feed-navigation'
import DiscoverNavigation from './discover-navigation'
import MessengerNavigation from './messenger-navigation'
import TubeNavigation from './tube-navigation'
import MusicNavigation from './music-navigation'
import * as MyProfileActions from './../redux/MyProfile/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const MyTheme = {
    ...DefaultTheme,
    dark: false,
    colors: {
        ...DefaultTheme.colors,
        primary: 'white',
        background: '#eef2f4',
        card: '#191919',
        text: 'white',
        border: '#191919',
        notification: 'white',
    }
}

const BottomTab = createBottomTabNavigator()

class MainNavigationContainer extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount = async () => {
       await this.props.actions.getMyProfile()
        // this.musicProgress = listenerMusic(this.props.actions)
    }

    _mainTabNavigation = () => (
        <BottomTab.Navigator
            initialRouteName={'MAIN_FEED'}
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
                name={'MAIN_FEED'}
                component={FeedNavigation}
                options={{ tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faHomeLg} color={color} size={25} /> }}
            />

            <BottomTab.Screen
                name={'MAIN_DISCOVER'}
                component={DiscoverNavigation}
                options={{ tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faCompass} color={color} size={25} /> }}
            />

            <BottomTab.Screen
                name={'MAIN_TUBE'}
                component={TubeNavigation}
                options={{ tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faTv} color={color} size={25} /> }}
            />

            <BottomTab.Screen
                name={'MAIN_MUSIC'}
                component={MusicNavigation}
                options={{ tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faMusic} color={color} size={25} /> }}
            />

            <BottomTab.Screen
                name={'MAIN_MESSENGER'}
                component={MessengerNavigation}
                options={{ tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faCommentsAlt} color={color} size={25} /> }}
            />

        </BottomTab.Navigator>
    )

    render = () => {
        return (
            <NavigationContainer theme={MyTheme}>
                <StatusBar
                    animated={true}
                    backgroundColor={MyTheme.colors.background}
                    barStyle='dark-content'
                    showHideTransition={'fade'}
                    hidden={false}
                />
                {this._mainTabNavigation()}
            </NavigationContainer>
        )
    }
}

const mapStateToProps = state => ({
    MyProfile: state.MyProfile,
    MyUser: state.MyUser,
    Player: state.Player,
})

const ActionCreators = Object.assign(
    {},
    MyProfileActions,
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(MainNavigationContainer)