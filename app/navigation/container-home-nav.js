import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import * as MyProfileActions from './../../redux/MyProfile/actions'
import { bindActionCreators } from 'redux'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainFeed from './../components/space/feed/main-feed'
import MainDiscover from './../components/space/discover/main-discover'
import MainMessenger from './../components/space/messenger/main-messenger'
import MainMusic from './../components/space/music/main-music'
import MainTube from './../components/space/tube/main-tube'
import * as PlayerMusicActions from '../../redux/Player/actions'
import { listenerMusic } from '../services/music/music-service'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHomeLg, faMusic, faCommentsAlt, faTv, faCompass } from '@fortawesome/pro-light-svg-icons'

class ContainerHomeNav extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
        this.musicProgress = null
    }

    componentDidMount = async () => {
        this.props.actions.getMyProfile()
        this.props.actions.resetPlayerActions()
        this.musicProgress = listenerMusic(this.props.actions)
    }

    componentWillUnmount = async () => {
        this.musicProgress.remove()
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        if (!newProps.MyProfile.isLoading && !!newProps.MyProfile.profile) {
            this.setState({ show: true })
        }
    }

    _logoList = () => {
        const Tab = createBottomTabNavigator()
        return (
            <View style={styles.main_container}>
                <Tab.Navigator
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
                    <Tab.Screen
                        name="Home"
                        component={MainFeed}
                        options={{ tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faHomeLg} color={color} size={25} /> }}
                    />
                    <Tab.Screen
                        name="Discover"
                        component={MainDiscover}
                        options={{ tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faCompass} color={color} size={25} /> }}
                    />
                    <Tab.Screen
                        name="Tube"
                        component={MainTube}
                        options={{ tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faTv} color={color} size={25} /> }}
                    />
                    <Tab.Screen
                        name="Music"
                        component={MainMusic}
                        options={{ tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faMusic} color={color} size={25} /> }}
                    />
                    <Tab.Screen
                        name="Chat"
                        component={MainMessenger}
                        options={{ tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faCommentsAlt} color={color} size={25} /> }}
                    />
                </Tab.Navigator>
            </View>
        )
    }

    _loading = () => {
        return (
            <View style={styles.loading_container}>
                <ActivityIndicator size='large' color="#595959" />
            </View>
        )
    }

    render() {
        return (
            <NavigationContainer>
                {(this.state.show) ? this._logoList() : this._loading()}
            </NavigationContainer>
        )
    }

}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: '#e3e6ef'
    },
    loading_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

const mapStateToProps = state => ({
    MyProfile: state.MyProfile,
    MyUser: state.MyUser,
    Player: state.Player,
})

const ActionCreators = Object.assign(
    {},
    MyProfileActions,
    PlayerMusicActions
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ContainerHomeNav)