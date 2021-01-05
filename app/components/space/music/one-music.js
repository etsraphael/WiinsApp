import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as MyUserActions from '../../../../redux/MyUser/actions'
import * as PlayerMusicActions from '../../../../redux/Player/actions'
import FastImage from 'react-native-fast-image'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart as faHeartEmpty, faEllipsisH } from '@fortawesome/pro-light-svg-icons'
import { faHeart as faHeartFull } from '@fortawesome/pro-solid-svg-icons'
import LinearGradient from 'react-native-linear-gradient'

class OneMusic extends React.Component {

    constructor(props) {
        super(props)
    }

    // to plauy a music
    _playMusic = async (music, tracklist) => {

        const list = [...tracklist]

        if (this.props.Player.isPlayling) {
            await this.props.actions.resetPlayerActions()
        }
        return this.props.actions.playMusicActions(music, list)
    }

    // to display the music view
    _musicView = (music, index, tracklist) => {
        return (
            <TouchableOpacity style={styles.one_music} onPress={() => this._playMusic(music, tracklist)}>

                {/* Index */}
                <View style={styles.container_index}>
                    <Text style={styles.text_index}>{index + 1}</Text>
                </View>

                {/* Description */}
                <View style={styles.description_container}>
                    <FastImage
                        style={styles.image_container} resizeMode={FastImage.resizeMode.cover}
                        source={{ uri: music.profile.pictureprofile, priority: FastImage.priority.normal }}
                    />
                    <View style={{ paddingLeft: 15, justifyContent: 'center' }}>
                        <Text style={styles.title_text}>{music.name}</Text>
                        <Text style={styles.username_text}>{music.profile._meta.pseudo}</Text>
                    </View>
                </View>


                {/* Option Btn */}
                <View style={{ flex: 2, flexDirection: 'row' }}>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: '#d9d9d9', borderRadius: 35, overflow: 'hidden', padding: 6, paddingTop: 7 }}>
                            <FontAwesomeIcon icon={faHeartEmpty} size={15} color={'white'} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={faEllipsisH} size={28} color={'#b3b3b3'} />
                    </TouchableOpacity>
                </View>

            </TouchableOpacity>
        )
    }

    // to display playing music view
    _musicPlayingView = (music, index, tracklist) => {
        return (
            <LinearGradient colors={['#4C71DA', '#2AABD1']} start={{ x: 1, y: 1 }} end={{ x: 0, y: 1 }}>
                <TouchableOpacity style={[styles.one_music, { backgroundColor: '#ffffff00' }]} onPress={() => this._playMusic(music, tracklist)}>

                    {/* Index */}
                    <View style={styles.container_index}>
                        <Text style={[styles.text_index, { color: 'white' }]}>{index + 1}</Text>
                    </View>

                    {/* Description */}
                    <View style={styles.description_container}>
                        <FastImage
                            style={styles.image_container} resizeMode={FastImage.resizeMode.cover}
                            source={{ uri: music.profile.pictureprofile, priority: FastImage.priority.normal }}
                        />
                        <View style={{ paddingLeft: 15, justifyContent: 'center' }}>
                            <Text style={[styles.title_text, { color: 'white' }]}>{music.name}</Text>
                            <Text style={[styles.username_text, { color: 'white' }]}>{music.profile._meta.pseudo}</Text>
                        </View>
                    </View>


                    {/* Option Btn */}
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ backgroundColor: '#dcdcdc3d', borderRadius: 35, overflow: 'hidden', padding: 6, paddingTop: 7 }}>
                                <FontAwesomeIcon icon={faHeartEmpty} size={15} color={'white'} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <FontAwesomeIcon icon={faEllipsisH} size={28} color={'white'} />
                        </TouchableOpacity>
                    </View>

                </TouchableOpacity>
            </LinearGradient>

        )
    }


    render() {

        const { music } = this.props
        const { index } = this.props
        const { tracklist } = this.props

        if (this.props.Player.isPlayling && music._id == this.props.Player.musicIsPlaying.id) {
            return this._musicPlayingView(music, index, tracklist)
        } else {
            return this._musicView(music, index, tracklist)
        }

    }

}

const styles = StyleSheet.create({
    one_music: {
        flexDirection: 'row',
        paddingHorizontal: 5,
        width: '100%',
        backgroundColor: '#F2F2F2',
        paddingVertical: 15
    },
    container_index: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text_index: {
        fontSize: 16,
        fontFamily: 'Avenir-Heavy',
        color: '#77838F'
    },
    description_container: {
        flex: 5,
        borderRadius: 15,
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 7,
        marginHorizontal: 5
    },
    image_container: {
        width: 43,
        height: 43,
        borderRadius: 5
    },
    title_text: {
        color: '#77838F',
        paddingVertical: 1,
        fontSize: 17,
        fontFamily: 'Avenir-Heavy',
        fontWeight: 'bold'
    },
    username_text: {
        color: '#77838F',
        paddingVertical: 1,
        fontSize: 15
    }
})

const mapStateToProps = state => ({
    MyUser: state.MyUser,
    Player: state.Player,
    PlaylistPage: state.PlaylistPage
});

const ActionCreators = Object.assign(
    {},
    MyUserActions,
    PlayerMusicActions
);

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(OneMusic)