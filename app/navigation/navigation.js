import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHomeLg, faMusic, faCommentsAlt, faTv, faCompass } from '@fortawesome/pro-light-svg-icons'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import FeedNavigation from './feed-navigation'
import DiscoverNavigation from './discover-navigation'
import MessengerNavigation from './messenger-navigation'
import TubeNavigation from './tube-navigation'
import MusicNavigation from './music-navigation'
import * as MyProfileActions from './../redux/MyProfile/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AppTheme } from '../components/core/reusable/utility/theme-util'

const BottomTab = createBottomTabNavigator()

class MainNavigationContainer extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount = async () => {
        this.props.actions.getMyProfile()
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
                        borderWidth: 1,
                        borderColor: 'transparent',
                        elevation: 0,
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
            <NavigationContainer theme={AppTheme}>
                <StatusBar
                    animated={true}
                    backgroundColor={AppTheme.colors.background}
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