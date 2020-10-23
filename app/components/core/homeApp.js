import React from 'react'
import { StyleSheet, View, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { listenerMusic } from '../../services/music/music-service'
import * as PlayerMusicActions from './../../../redux/Player/actions'
import * as MyProfileActions from './../../../redux/MyProfile/actions'
import MainFeed from './../../components/space/feed/main-feed'
import MainDiscover from './../../components/space/discover/main-discover'
import MainMessenger from './../../components/space/messenger/main-messenger'
import MainMusic from './../../components/space/music/main-music'
import MainTube from './../../components/space/tube/main-tube'

class HomeApp extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            show: false,
            selection: 'MainFeed'
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

    // to navigate the place
    _goTo = (name) => {
        this.setState({ selection: name })
    }

    // to select the navbar view
    _navbarView = () => {
        return (
            <View style={styles.containerFooter}>
                <View style={styles.navbarContainer}>
                    <TouchableOpacity
                        onPress={() => this._goTo('MainFeed')}
                        style={styles.containerIcon}
                    >
                        {this.state.selection == 'MainFeed' ?
                            <Image
                                source={require('../../../assets/image/navigation/home-full.png')}
                                style={{ width: 24, height: 24 }}
                                resizeMode={'contain'}
                            /> : <Image
                                source={require('../../../assets/image/navigation/home-empty.png')}
                                style={{ width: 24, height: 24 }}
                                resizeMode={'contain'}
                            />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this._goTo('MainDiscover')}
                        style={styles.containerIcon}
                    >
                        {this.state.selection == 'MainDiscover' ?
                            <Image
                                source={require('../../../assets/image/navigation/discover-full.png')}
                                style={{ width: 24, height: 24 }}
                                resizeMode={'contain'}
                            /> : <Image
                                source={require('../../../assets/image/navigation/discover-empty.png')}
                                style={{ width: 24, height: 24 }}
                                resizeMode={'contain'}
                            />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this._goTo('MainTube')}
                        style={styles.containerIcon}
                    >
                        {this.state.selection == 'MainTube' ?
                            <Image
                                source={require('../../../assets/image/navigation/tube-full.png')}
                                style={{ width: 24, height: 24 }}
                                resizeMode={'contain'}
                            /> : <Image
                                source={require('../../../assets/image/navigation/tube-empty.png')}
                                style={{ width: 24, height: 24 }}
                                resizeMode={'contain'}
                            />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this._goTo('MainMusic')}
                        style={styles.containerIcon}
                    >
                        {this.state.selection == 'MainMusic' ?
                            <Image
                                source={require('../../../assets/image/navigation/music-full.png')}
                                style={{ width: 24, height: 24 }}
                                resizeMode={'contain'}
                            /> : <Image
                                source={require('../../../assets/image/navigation/music-empty.png')}
                                style={{ width: 24, height: 24 }}
                                resizeMode={'contain'}
                            />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this._goTo('MainMessenger')}
                        style={styles.containerIcon}
                    >
                        {this.state.selection == 'MainMessenger' ?
                            <Image
                                source={require('../../../assets/image/navigation/message-full.png')}
                                style={{ width: 24, height: 24 }}
                                resizeMode={'contain'}
                            /> : <Image
                                source={require('../../../assets/image/navigation/message-empty.png')}
                                style={{ width: 24, height: 24 }}
                                resizeMode={'contain'}
                            />
                        }
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    // to select the place selected
    _spaceSelected = () => {

        switch (this.state.selection) {
            case 'MainFeed': return <MainFeed />
            case 'MainDiscover': return <MainDiscover />
            case 'MainMusic': return <MainMusic />
            case 'MainTube': return <MainTube />
            case 'MainMessenger': return <MainMessenger />
        }

    }

    // to select the home view
    _showHome = () => {
        return (
            <View style={{ flex: 1 }}>

                {/* Space selected */}
                {this._spaceSelected()}

                {/* NavBar */}
                {this._navbarView()}
            </View>
        )
    }

    // to select the loading logo view
    _loading = () => {
        return (
            <View style={styles.loading_container}>
                <ActivityIndicator size='large' color="#595959" />
            </View>
        )
    }

    render = () => {
        return (
            <View style={{ flex: 1 }}>
                {(this.state.show) ? this._showHome() : this._loading()}
            </View>
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
    },
    containerFooter: {
        position: 'absolute',
        height: 63,
        width: '100%',
        bottom: 30,
    },
    navbarContainer: {
        flex: 1,
        marginHorizontal: 15,
        backgroundColor: '#b6b6b6',
        borderRadius: 37,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerIcon: {
        paddingHorizontal: 25
    }
})

const mapStateToProps = state => ({
    MyProfile: state.MyProfile
})

const ActionCreators = Object.assign(
    {},
    MyProfileActions,
    PlayerMusicActions
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeApp)