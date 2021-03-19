import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StyleSheet, View } from 'react-native'
import MiniPlayer from './../reusable/music/mini-player'
import MainNavigationContainer from './../../../navigation/navigation'
import SignNavigation from './../../../navigation/sign-naviation'
import * as PlayerMusicActions from '../../../redux/Player/actions'
import { listenerMusic } from './../../../services/music/music-service'

class MainApp extends React.Component {

    constructor(props) {
        super(props)
        this.musicProgress = null
    }

    componentDidMount = async () => {
        this.musicProgress = listenerMusic(this.props.actions)
    }

    componentWillUnmount = async () => {
        this.musicProgress.remove()
    }

    // to select the sign view
    _beforAuth() { return <SignNavigation/> }

    // to select the home view
    _afterAuth() {
        return (
            <View style={styles.container}>
                <MainNavigationContainer />
                {this.props.Player.displayMiniPlayer ? <View style={styles.btnPlayer}><MiniPlayer /></View> : false}
            </View>
        )
    }

    render() {
        if (!!this.props.MyUser.user) return this._afterAuth()
        else return this._beforAuth()
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    btnPlayer: {
        position: 'absolute',
        bottom: '15%',
    }
})

const mapStateToProps = state => ({
    MyProfile: state.MyProfile,
    MyUser: state.MyUser,
    Player: state.Player,
})

const ActionCreators = Object.assign(
    {},
    PlayerMusicActions
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(MainApp)