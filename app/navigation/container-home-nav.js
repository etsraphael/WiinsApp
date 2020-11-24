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
import { faCircle } from '@fortawesome/free-solid-svg-icons'

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
                <Tab.Navigator initialRouteName="Home"
                    tabBarOptions={{ showLabel: false }}
                >
                    <Tab.Screen
                        name="Home"
                        component={MainFeed}
                        options={{ tabBarIcon: () => <FontAwesomeIcon icon={faCircle} color={'grey'} size={25} style={{ opacity: 0.8 }} /> }}
                    />
                    <Tab.Screen
                        name="Discover"
                        component={MainDiscover}
                        options={{ tabBarIcon: () => <FontAwesomeIcon icon={faCircle} color={'grey'} size={25} style={{ opacity: 0.8 }} /> }}
                    />
                    <Tab.Screen
                        name="Tube"
                        component={MainTube}
                        options={{ tabBarIcon: () => <FontAwesomeIcon icon={faCircle} color={'grey'} size={25} style={{ opacity: 0.8 }} /> }}
                    />
                    <Tab.Screen
                        name="Music"
                        component={MainMusic}
                        options={{ tabBarIcon: () => <FontAwesomeIcon icon={faCircle} color={'grey'} size={25} style={{ opacity: 0.8 }} /> }}
                    />
                    <Tab.Screen
                        name="Chat"
                        component={MainMessenger}
                        options={{ tabBarIcon: () => <FontAwesomeIcon icon={faCircle} color={'grey'} size={25} style={{ opacity: 0.8 }} /> }}
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
        flex: 1
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