import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import LinearGradient from 'react-native-linear-gradient'
import Modal from 'react-native-modal'
import FastImage from 'react-native-fast-image'
import * as PlayerMusicActions from '../../../../redux/Player/actions'
import * as PlaylistPageActions from '../../../../redux/PlaylistMusicPage/actions'
import { faMusic, faAngleDown, faRepeat } from '@fortawesome/pro-light-svg-icons'
import { faHeart, faPause, faUserPlus, faStepBackward, faStepForward, faRandom, faPlay, faRepeat1Alt, faUserCheck } from '@fortawesome/pro-solid-svg-icons'

import ProgressBar from '../../../space/music/progress-bar'

class MiniPlayer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            modal: false
        }
    }

    _likeMusic = async () => {
        // send the request
        await this.props.actions.likeMusicFromPlayerAction(this.props.Player.musicIsPlaying.music)
    }

    _dislikeMusic = () => {
        // send the request
        return this.props.actions.dislikeMusicFromPlayerAction(
            this.props.Player.musicIsPlaying.id,
            this.props.Player.musicIsPlaying.music.space,
            this.props.Player.musicIsPlaying.music.category
        )
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
        if (this.props.Player.trackList.map(x => x.id).indexOf(this.props.Player.musicIsPlaying.id) !== 0) {
            this.props.actions.previousMusicActions()
        }
    }

    // to continu the music
    _continueMusic = () => {
        this.props.actions.continuePlayerActions()
    }

    _displayRepeatIcon = () => {
        switch (this.props.Player.repeatMode) {
            case 'none': {
                return (
                    <TouchableOpacity onPress={() => this.props.actions.controlRepeatOnePlaylistAction()}>
                        <FontAwesomeIcon icon={faRepeat} color={'grey'} size={25} />
                    </TouchableOpacity>
                )
            }
            case 'playlist': {
                return (
                    <TouchableOpacity onPress={() => this.props.actions.controlRepeatOneMusicAction()}>
                        <FontAwesomeIcon icon={faRepeat} color={'#0066cc'} size={25} />
                    </TouchableOpacity>
                )
            }
            case 'music': {
                return (
                    <TouchableOpacity onPress={() => this.props.actions.controlRepeatDeactivatedAction()}>
                        <FontAwesomeIcon icon={faRepeat1Alt} color={'#0066cc'} size={25} />
                    </TouchableOpacity>
                )
            }

        }
    }

    _displayShuffleBtn = () => {
        if (this.props.Player.random) {
            return (
                <TouchableOpacity onPress={() => this.props.actions.unshuffleMusicsAction()}>
                    <FontAwesomeIcon icon={faRandom} color={'#0066cc'} size={25} />
                </TouchableOpacity>
            )
        } else return (
            <TouchableOpacity onPress={() => this.props.actions.shuffleMusicsAction()}>
                <FontAwesomeIcon icon={faRandom} color={'grey'} size={25} />
            </TouchableOpacity>
        )
    }

    _followArtist = (profileId) => {
        return this.props.actions.followArtistActions(profileId)
    }

    // to show relation icon
    _displayRelationIcon = () => {
        switch (true) {
            case (this.props.Player.musicIsPlaying.music.profile.relation == 'friend' || this.props.Player.musicIsPlaying.music.profile.relation == 'following'):
                return (
                    <TouchableOpacity style={{ backgroundColor: '#cdcdcd54', borderRadius: 50, padding: 10 }}>
                        <FontAwesomeIcon icon={faUserCheck} color={'green'} size={19} />
                    </TouchableOpacity>
                )
            case (this.props.Player.musicIsPlaying.music.profile == this.props.MyUser.user.profile): return null
            default:
                return (
                    <TouchableOpacity onPress={() => this._followArtist(this.props.Player.musicIsPlaying.music.profile._id)}
                        style={{ backgroundColor: '#cdcdcd54', borderRadius: 50, padding: 10 }}>
                        <FontAwesomeIcon icon={faUserPlus} color={'grey'} size={19} />
                    </TouchableOpacity>
                )
        }
    }

    // to display the music modal view
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

                    {/* Music Image */}
                    <View style={{ flex: 3, backgroundColor: 'white' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => this._closeModalMusic()} style={{ paddingLeft: 20, paddingTop: 25 }} >
                                <FontAwesomeIcon icon={faAngleDown} color={'grey'} size={32} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ shadowColor: "#000", width: 175, height: 175, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, borderRadius: 25 }}>
                                <FastImage
                                    style={{ width: '100%', height: '100%', borderRadius: 25, overflow: 'hidden' }}
                                    source={{
                                        uri: this.props.Player.musicIsPlaying.artwork,
                                        priority: FastImage.priority.normal,
                                    }}
                                    resizeMode={FastImage.resizeMode.cover}
                                />
                            </View>
                        </View>
                    </View>

                    {/* Progress bar */}
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ProgressBar />
                    </View>

                    {/* Informations */}
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>

                        {/* Like Btn */}
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                            {this.props.Player.musicIsPlaying.isLiked ?
                                <TouchableOpacity onPress={() => this._dislikeMusic()} style={{ backgroundColor: '#cdcdcd54', borderRadius: 50, padding: 10 }}>
                                    <FontAwesomeIcon icon={faHeart} color={'red'} size={17} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => this._likeMusic()} style={{ backgroundColor: '#cdcdcd54', borderRadius: 50, padding: 10 }}>
                                    <FontAwesomeIcon icon={faHeart} color={'grey'} size={17} />
                                </TouchableOpacity>
                            }
                        </View>

                        {/* Description */}
                        <View style={{ flex: 2, alignItems: 'center' }}>
                            <Text style={{ fontSize: 22, color: '#15141E', marginVertical: 3, fontWeight: '700' }}>{this.props.Player.musicIsPlaying.title}</Text>
                            <Text style={{ color: '#8B8F92', fontSize: 16, marginBottom: 4 }}>{this.props.Player.musicIsPlaying.artist}</Text>
                        </View>

                        {/* Follow Btn */}
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                            {this._displayRelationIcon()}
                        </View>


                    </View>

                    {/* Controlers */}
                    <View style={{ flex: 1, flexDirection: 'row' }}>

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            {this._displayRepeatIcon()}
                        </View>

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => this._playPreviousMusic()}>
                                <FontAwesomeIcon icon={faStepBackward} color={'#0066cc'} size={28} />
                            </TouchableOpacity>
                        </View>

                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                            {this.props.Player.isPlayling ?
                                <TouchableOpacity onPress={() => this._pause()}>
                                    <LinearGradient colors={['#4C71DA', '#2AABD1']} start={{ x: 1, y: 1 }} end={{ x: 0, y: 1 }}
                                        style={{ borderRadius: 50, padding: 15 }}>
                                        <FontAwesomeIcon icon={faPause} size={25} color={'white'} />
                                    </LinearGradient>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => this._continueMusic()}>
                                    <LinearGradient colors={['#4C71DA', '#2AABD1']} start={{ x: 1, y: 1 }} end={{ x: 0, y: 1 }}
                                        style={{ borderRadius: 50, padding: 15 }}>
                                        <FontAwesomeIcon style={{ left: 3 }} icon={faPlay} size={25} color={'white'} />
                                    </LinearGradient>
                                </TouchableOpacity>
                            }
                        </View>

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => this._playNextMusic()}>
                                <FontAwesomeIcon icon={faStepForward} color={'#0066cc'} size={28} />
                            </TouchableOpacity>
                        </View>

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            {this._displayShuffleBtn()}
                        </View>

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
        marginHorizontal: 0,
        marginBottom: 0,
        marginTop: '40%',
        overflow: 'hidden',
        borderTopRightRadius: 65
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
    Player: state.Player,
    PlaylistPage: state.PlaylistPage
})

const ActionCreators = Object.assign(
    {},
    PlayerMusicActions,
    PlaylistPageActions,
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(MiniPlayer)