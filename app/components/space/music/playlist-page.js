import React from 'react'
import { StyleSheet, View, Text, FlatList, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as PlaylistPageActions from '../../../../redux/PlaylistMusicPage/actions'
import * as MyFavMusicActions from '../../../../redux/MyFavMusic/actions'
import * as CommentListActions from '../../../../redux/CommentList/actions'
import FastImage from 'react-native-fast-image'
import OneMusic from './one-music'
import CommentList from '../../core/comment-list'
import LinearGradient from 'react-native-linear-gradient'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft, faEllipsisV, faHeart, faDownload } from '@fortawesome/pro-light-svg-icons'
import { faPlay } from '@fortawesome/pro-solid-svg-icons'
import * as PlayerMusicActions from '../../../../redux/Player/actions'
import { getDateTranslated } from '../../../services/translation/translation-service'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import Spinner from 'react-native-spinkit'
import { faCloudDownloadAlt } from '@fortawesome/pro-duotone-svg-icons'
import { downloadPlaylistMusicList } from './../../../services/cache/cache-music-service' 

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

    _displayUploadIcon = () => {

        // It's uploading
        if (this.props.PlaylistPage.uploading) {
            return (<Spinner isVisible={true} size={32} type={'Bounce'} color={'#86A8E7'} />)
        }

        // If one music is not downloaded
        if (this.props.PlaylistPage.playlist.musicList.filter(x => x.inCache == 'not').length > 0) {
            return (
                <TouchableOpacity onPress={() => downloadPlaylistMusicList(this.props.PlaylistPage.playlist.musicList, this.props.actions)}>
                    <FontAwesomeIcon icon={faDownload} color={'grey'} size={21} />
                </TouchableOpacity>
            )
        }

        // Already have all this files
        else return (<FontAwesomeIcon icon={faCloudDownloadAlt} color={'green'} size={29} />)
    }

    // to display the playlist header
    _headerPlaylist = () => {

        return (
            <View>

                {/* Navigation Header */}
                <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => this.props.screenProps.rootNavigation.goBack(null)}>
                            <FontAwesomeIcon icon={faAngleLeft} color={'grey'} size={38} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 22, fontFamily: 'Avenir-Heavy', color: '#002150' }}>Playlist Details</Text>
                    </View>
                    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity>
                            <FontAwesomeIcon icon={faEllipsisV} color={'grey'} size={38} />
                        </TouchableOpacity>
                    </View>
                </View>


                {/* Playlist Description */}
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 15 }}>
                    <View style={styles.container_img_playlist}>
                        <View style={{ height: 155, width: 155, borderRadius: 15, overflow: 'hidden' }}>
                            <FastImage
                                style={{ width: '100%', height: '100%' }}
                                resizeMode={FastImage.resizeMode.cover}
                                source={{
                                    uri: this.props.PlaylistPage.playlist.picture,
                                    priority: FastImage.priority.normal,
                                }}
                            />
                        </View>
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 12 }}>
                    <Text style={{ fontSize: 22, fontFamily: 'Avenir-Heavy', color: '#002150' }}>{this.props.PlaylistPage.playlist.name}</Text>
                    <Text style={{ fontWeight: '300', fontSize: 13, color: '#7A869A' }}>{getDateTranslated(this.props.PlaylistPage.playlist.createdAt)}</Text>
                </View>


                {/* Controllers */}
                <View style={{ flexDirection: 'row', paddingBottom: 5 }}>

                    {/* Like */}
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => alert('Available soon..')}>
                            <FontAwesomeIcon icon={faHeart} color={'grey'} size={21} />
                        </TouchableOpacity>
                    </View>

                    {/* Play */}
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => this._playShuffleMusic()}>
                            <LinearGradient
                                colors={['#4C71DA', '#2AABD1']} start={{ x: 1, y: 1 }} end={{ x: 0, y: 1 }}
                                style={{ width: 55, height: 55, borderRadius: 55, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
                                <FontAwesomeIcon icon={faPlay} color={'white'} size={23} style={{ marginLeft: 5 }} />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    {/* Download */}
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        {this._displayUploadIcon()}
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

    // to display the music list
    _musicList() {
        return (
            <FlatList
                ItemSeparatorComponent={this._renderSeparator}
                data={this.props.PlaylistPage.playlist.musicList}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item, index }) => (
                    <OneMusic
                        music={item}
                        tracklist={this.props.PlaylistPage.playlist.musicList}
                        index={index}
                    />
                )}
            />
        )
    }

    _renderSeparator = () => {
        return (<View style={{ height: 2, width: '100%', backgroundColor: '#e6e6e6' }} />)
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
                {this._renderSeparator()}
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
        backgroundColor: '#F2F2F2',
        paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() + 10 : 10
    },
    loading_container: {
        top: 150
    },
    container_img_playlist: {
        height: 155,
        width: 155,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    }
})

const mapStateToProps = state => ({
    PlaylistPage: state.PlaylistPage,
    CommentList: state.CommentList,
    MyMusic: state.MyFavMusic
})

const ActionCreators = Object.assign(
    {},
    PlaylistPageActions,
    CommentListActions,
    PlayerMusicActions,
    MyFavMusicActions
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistPage)