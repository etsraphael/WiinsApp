import React from 'react'
import { StyleSheet, View, Text, FlatList, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as PlaylistPageActions from '../../../../redux/PlaylistMusicPage/actions'
import * as CommentListActions from '../../../../redux/CommentList/actions'
import FastImage from 'react-native-fast-image'
import OneMusic from './one-music'
import CommentList from '../../core/comment-list'
import LinearGradient from 'react-native-linear-gradient'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlay, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import * as PlayerMusicActions from '../../../../redux/Player/actions'
import { getDateTranslated } from '../../../services/translation/translation-service'

class PlaylistPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            navigation: 'music'
        }
    }

    componentDidMount() {
        this.props.actions.getMusicPlaylist(this.props.screenProps.rootNavigation.state.params.playlistId)
    }

    // to display the loading animation
    _displayLoading() {
        return (
            <View style={styles.loading_container}>
                <ActivityIndicator size='large' color="grey" />
            </View>
        )
    }

    // to display the playlist header
    _headerPlaylist = () => {
        return (
            <View style={{ height: 200, backgroundColor: '#00000061' }}>

                {/* Background */}
                <View style={{ width: '100%', height: '100%', position: 'absolute' }}>
                    <FastImage
                        style={{ width: '100%', height: '100%' }}
                        resizeMode={FastImage.resizeMode.cover}
                        source={{
                            uri: this.props.PlaylistPage.playlist.picture,
                            priority: FastImage.priority.normal,
                        }}
                    />
                </View>
                <View style={{ position: 'absolute', backgroundColor: '#00000061', width: '100%', height: '100%' }} />

                {/* BtnBack */}
                <View style={{ position: 'absolute', left: 35, top: 50, zIndex: 1 }}>
                    <TouchableOpacity onPress={() => this.props.screenProps.rootNavigation.goBack(null)}>
                        <FontAwesomeIcon icon={faAngleLeft} color={'white'} size={34} style={{ marginLeft: 5 }} />
                    </TouchableOpacity>
                </View>

                {/* Descriptions */}
                <View style={{ flex: 1 }} />
                <View style={{ flex: 1, paddingHorizontal: 40, justifyContent: 'center', flexDirection: 'row' }}>
                    <View style={{ flex: 8, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 28, fontFamily: 'Avenir-Heavy', color: 'white' }}>{this.props.PlaylistPage.playlist.name}</Text>
                        <Text style={{ fontWeight: '300', fontSize: 13, color: 'white' }}>{getDateTranslated(this.props.PlaylistPage.playlist.createdAt)}</Text>
                    </View>
                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'flex-end' }}>
                        <TouchableOpacity onPress={() => this._playShuffleMusic()}>
                            <LinearGradient
                                colors={['#834d9b', '#d04ed6']}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 0 }}
                                style={{ height: 45, width: 45, borderRadius: 25, alignItems: 'center', justifyContent: 'center', alignItems: 'center', borderColor: 'white', borderWidth: 2 }}
                            >
                                <FontAwesomeIcon icon={faPlay} color={'white'} size={18} style={{ marginLeft: 5 }} />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        )
    }

    // to shuffle and play the music
    _playShuffleMusic = () => {
        const list = [...this.props.PlaylistPage.playlist.musicList]
        this.props.actions.playRandomMusicInPlaylistActions(list)
    }

    // to active the back button
    _activeNav(nav) {
        if (nav == this.state.navigation) {
            return { backgroundColor: '#f2f2f2' }
        }
    }

    // to display the navbar
    _navBar() {

        return (
            <View style={{ flexDirection: 'row', borderColor: '#d9d9d9', borderTopWidth: 0.5, borderBottomWidth: 0.5 }}>
                <TouchableOpacity style={[{ flex: 1, alignItems: 'center', paddingVertical: 19 }, this._activeNav('music')]} onPress={() => this.setState({ navigation: 'music' })}>
                    <Text style={{ color: '#1a1a1a' }}>Music</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[{ flex: 1, alignItems: 'center', paddingVertical: 19 }, this._activeNav('comment')]}
                    onPress={() => { this.setState({ navigation: 'comment' }); this.props.actions.getCommentListPlaylist(this.props.PlaylistPage.playlist._id, 1) }}
                >
                    <Text style={{ color: '#1a1a1a' }}>Comment</Text>
                </TouchableOpacity>
            </View>
        )
    }

    // to display the music list
    _musicList() {
        return (
            <FlatList
                style={{ paddingTop: 10 }}
                data={this.props.PlaylistPage.playlist.musicList}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item, index }) => (
                    <OneMusic
                        music={item}
                        tracklist={this.props.PlaylistPage.playlist.musicList}
                        index={index}
                        border={true ? (index == 1) : false}
                    />
                )}
            />
        )
    }

    // to display the comment view
    _commentList() {
        return (
            <ScrollView style={{ height: '100%' }}>
                {this.props.CommentList.isLoading ? this._displayLoading() : this._contentComment()}
            </ScrollView>
        )
    }

    // to display the comment container
    _contentComment() {
        return (<CommentList type={'playlist'} playlist={this.props.PlaylistPage.playlist} />)
    }

    // to display the playlist view
    _displayPlaylist() {

        return (
            <View>
                {this._headerPlaylist()}
                {this._navBar()}
                {this.state.navigation == 'music' ? this._musicList() : this._commentList()}
            </View>
        )

    }

    render() {
        return (
            <View style={styles.menu_container}>
                {(this.props.PlaylistPage.isLoading) ? this._displayLoading() : null}
                {(this.props.PlaylistPage.playlist !== null) ? this._displayPlaylist() : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    menu_container: {
        flex: 1,
        backgroundColor: 'white'
    },
    loading_container: {
        top: 150
    },
    container_img_header: {
        flex: 2,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,

        elevation: 13,
    }
})

const mapStateToProps = state => ({
    PlaylistPage: state.PlaylistPage,
    CommentList: state.CommentList
})

const ActionCreators = Object.assign(
    {},
    PlaylistPageActions,
    CommentListActions,
    PlayerMusicActions
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistPage)