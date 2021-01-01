import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StyleSheet, Text, View } from 'react-native'
import * as PlayerMusicActions from '../../../../redux/Player/actions'
import TrackPlayer, { ProgressComponent } from 'react-native-track-player';
import Slider from '@react-native-community/slider';

class ProgressBar extends ProgressComponent {

    constructor(props) {
        super(props)
    }

    // to change the music timepoint
    _playMusicAt = (value) => {
        TrackPlayer.seekTo(Math.round(value))
    }

    render = () => {

        return (
            <View style={styles.container}>
                <View style={{ paddingHorizontal: 25, alignItems: 'center', flexDirection: 'row', marginVertical: 15 }}>
                    <View style={{ flex: 1, alignItems: 'center' }}><Text>{this.props.Player.timer.start}</Text></View>
                    <Slider
                        style={{ flex: 4, marginHorizontal: 15 }}
                        maximumValue={this.props.Player.timer.duration}
                        minimumValue={0}
                        minimumTrackTintColor="#c52603"
                        maximumTrackTintColor="#c5c6c8"
                        thumbTintColor="#c52603"
                        value={this.props.Player.timer.position}
                        onSlidingComplete={this.props.seek}
                        onValueChange={(value) => this._playMusicAt(value)}
                    />
                    <View style={{ flex: 1, alignItems: 'center' }}><Text>{this.props.Player.timer.end}</Text></View>
                </View>
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
})

const mapStateToProps = state => ({
    MyUser: state.MyUser,
    Player: state.Player
})

const ActionCreators = Object.assign(
    {},
    PlayerMusicActions
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProgressBar)