import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StyleSheet, View } from 'react-native'
import MiniPlayer from './../reusable/music/mini-player'
import Sign from '../../sign/sign'
import MainNavigationContainer from './../../../navigation/navigation'

class MainApp extends React.Component {

    constructor(props) {
        super(props)
    }

    // to select the sign view
    _beforAuth() {
        return <Sign />
    }

    // to select the home view
    _afterAuth() {
        return (
            <View style={styles.container}>
                <MainNavigationContainer/>
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
    MyUser: state.MyUser,
    Player: state.Player
})

const ActionCreators = Object.assign({})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(MainApp)