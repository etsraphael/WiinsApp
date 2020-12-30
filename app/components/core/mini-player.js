import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import LinearGradient from 'react-native-linear-gradient'
import Modal from 'react-native-modal'
import FastImage from 'react-native-fast-image'
import TrackPlayer from 'react-native-track-player'
import * as PlayerMusicActions from '../../../redux/Player/actions'
import { faStepForward, faStepBackward, faPlay, faMusic, faPause, faStop } from '@fortawesome/pro-light-svg-icons'
import ProgressBar from '../space/music/progress-bar'

class MiniPlayer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            modal: false
        }
    }

    componentDidMount() {
        TrackPlayer.addEventListener('playback-state', (data) => {
        })
    }

    // to pause the music
    _pause = () => {
        this.props.actions.pausePlayerActions()
    }

    // to play the music
    _play = () => {
        alert('continu')
    }

    // to open the music modal
    _openModalMusic = () => {
        return this.setState({ modal: true })
    }

    // to close the music modal
    _closeModalMusic = () => {
        return this.setState({ modal: false })
    }

    // to stop and hide the music player
    _stopThePlayer = () => {
        this._closeModalMusic()
        setTimeout(() => this.props.actions.stopPlayerActions(), 500);
    }

    // to play the next music
    _playNextMusic = () => {
        const indexNextMusic = this.props.Player.trackList.map(x => x.id).indexOf(this.props.Player.musicIsPlaying.id) + 1
        const limit = this.props.Player.trackList.length - 1
        if (indexNextMusic <= limit) this.props.actions.nextMusicActions()
    }

    // to play the previous music
    _playPreviousMusic = () => {
        if (this.props.Player.trackList.map(x => x.id).indexOf(this.props.Player.musicIsPlaying.id) !== 0){
            this.props.actions.previousMusicActions()
        }
    }

    // to continu the music
    _continueMusic = () => {
        this.props.actions.continuePlayerActions()
    }

    // to select the music modal view
    _modalView = () => {

        return (
            <Modal
                onSwipeComplete={() => this._closeModalMusic()}
                onBackdropPress={() => this._closeModalMusic()}
                isVisible={this.state.modal}
                transparent={true}
                swipeDirection={'down'}
                propagateSwipe={true}
                style={styles.container_modal}
                backdropOpacity={0.20}
            >
                <View style={{ flex: 1, backgroundColor: 'white' }}>

                    {/* Closing Modal */}
                    <View style={{ position: 'absolute', top: 0, width: '100%', alignItems: 'center', zIndex: 1 }}>
                        <TouchableOpacity
                            onPress={() => this._closeModalMusic()}
                            style={{ backgroundColor: '#cecece', height: 5, width: 70, marginTop: 5, borderRadius: 50 }}
                        />
                    </View>

                    {/* Header */}
                    <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 15, paddingHorizontal: 45, justifyContent: 'center', alignItems: 'center' }}>
                        <LinearGradient
                            colors={['#fcb045', '#fd1d1d', '#833ab4']}
                            style={{ width: 55, height: 55, borderRadius: 55, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
                            <FastImage
                                style={{ width: '100%', aspectRatio: 1, borderRadius: 55 }}
                                source={{
                                    uri: this.props.Player.musicIsPlaying.profile.pictureprofile,
                                    priority: FastImage.priority.normal,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                        </LinearGradient>
                        <View style={{ justifyContent: 'center', paddingLeft: 15 }}>
                            <Text style={{ color: '#4d4d4d', fontSize: 18, marginBottom: 4 }}>{this.props.Player.musicIsPlaying.artist}</Text>
                            <TouchableOpacity style={{ flexWrap: 'wrap' }}>
                                <View style={{ backgroundColor: 'white', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 5, borderWidth: 0.5, borderColor: '#a6a6a6' }}>
                                    <Text style={{ color: '#a6a6a6' }}>Subscribed</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Picture */}
                    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.container_img_project}>
                            <FastImage
                                style={{ backgroundColor: 'white', flex: 1, borderRadius: 8 }}
                                source={{
                                    uri: this.props.Player.musicIsPlaying.artwork,
                                    priority: FastImage.priority.normal,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                        </View>
                    </View>

                    {/* Control */}
                    <View style={{ flex: 3 }}>
                        <View>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ fontSize: 22, color: 'grey', marginVertical: 15 }}>{this.props.Player.musicIsPlaying.title}</Text>
                            </View>
                        </View>
                        <ProgressBar/>
                        <View>
                            <View style={{ paddingHorizontal: 25, flexDirection: 'row', marginVertical: 15 }}>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={()=> this._playPreviousMusic()}>
                                        <FontAwesomeIcon icon={faStepBackward} color={'grey'} size={25} style={{ opacity: 0.8 }} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    {this.props.Player.isPlayling ?
                                        <TouchableOpacity style={{ paddingLeft: 5 }} onPress={() => this._pause()}>
                                            <FontAwesomeIcon icon={faPause} color={'grey'} size={37} style={{ opacity: 0.9 }} />
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity style={{ paddingLeft: 5 }} onPress={() => this._continueMusic()}>
                                            <FontAwesomeIcon icon={faPlay} color={'grey'} size={37} style={{ opacity: 0.9 }} />
                                        </TouchableOpacity>
                                    }
                                </View>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={() => this._playNextMusic()}>
                                        <FontAwesomeIcon icon={faStepForward} color={'grey'} size={25} style={{ opacity: 0.8 }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Footer */}
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => this._stopThePlayer()}
                            style={{ flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 9, alignItems: 'center', marginLeft: 25, borderRadius: 25, borderColor: '#dcdcdc', borderWidth: 1, paddingVertical: 0, height: 35 }}>
                            <FontAwesomeIcon icon={faStop} color={'#afafaf'} size={15} />
                            <Text style={{ paddingHorizontal: 5, color: 'grey' }}>Stop</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>
        )
    }

    render() {

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this._openModalMusic()}>
                    <LinearGradient colors={['#4C71DA', '#2AABD1']} start={{ x: 1, y: 1 }} end={{ x: 0, y: 1 }}
                        style={styles.container_logo}>
                        <FontAwesomeIcon style={{ left: 4 }} icon={faMusic} size={20} color={'white'} />
                    </LinearGradient>
                </TouchableOpacity>
                {this._modalView()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexWrap: 'wrap',
        right: 15
    },
    container_logo: {
        borderTopRightRadius: 150,
        borderBottomRightRadius: 150,
        width: 45,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container_modal: {
        flex: 1,
        marginHorizontal: 8,
        marginTop: '30%',
        overflow: 'hidden',
        borderRadius: 25
    },
    container_img_project: {
        borderRadius: 8,
        width: '50%',
        aspectRatio: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: 'white'
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(MiniPlayer)