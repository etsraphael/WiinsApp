import React from 'react'
import { StyleSheet, View, Text, TextInput, FlatList, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as MusicMenuActions from '../../../../redux/MusicMenu/actions'
import * as MyFavMusicActions from '../../../../redux/MyFavMusic/actions'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import OneMusic from './one-music'
import OneMusicFav from './one-music-fav'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch, faTransporterEmpty } from '@fortawesome/pro-light-svg-icons'
import { downloadFavoritesMusicList } from './../../../services/cache/cache-music-service'

class HomeMusic extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            fakeMusiclist: [
                {
                    id: '1',
                    name: 'music1',
                    profile: {
                        pictureprofile: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80',
                        _meta: {
                            pseudo: 'jake_27'
                        }
                    }
                },
                {
                    id: '2',
                    name: 'music2',
                    profile: {
                        pictureprofile: 'https://images.unsplash.com/photo-1595840635571-5d6abc7d584b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1287&q=80',
                        _meta: {
                            pseudo: 'sarah_few'
                        }
                    }
                },
                {
                    id: '3',
                    name: 'music3',
                    profile: {
                        pictureprofile: 'https://images.unsplash.com/photo-1597361767997-7b0433fe5136?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2215&q=80',
                        _meta: {
                            pseudo: 'rafael_salei'
                        }
                    }
                },
                {
                    id: '4',
                    name: 'music4',
                    profile: {
                        pictureprofile: 'https://images.unsplash.com/photo-1516117525866-d85459db7457?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
                        _meta: {
                            pseudo: 'tony_eve'
                        }
                    }
                }
            ],
            playlistZone: [
                { code: 1, name: 'Latest', key: 'lastestPlaylist' },
                { code: 2, name: 'Favorites', key: 'favorites' },
                // { code: 3, name: 'Workout', key: 'workout' },
                // { code: 4, name: 'Chill', key: 'chill' },
                // { code: 5, name: 'Dance', key: 'dance' },
                // { code: 6, name: 'Sleep', key: 'sleep' },
            ],
            categoryZone: [
                { code: 1, name: 'Rap', key: 'rap' },
                { code: 2, name: 'Pop', key: 'pop' },
                { code: 3, name: 'Acoustic', key: 'acoustic' },
                { code: 4, name: 'Rock', key: 'rock' },
                { code: 5, name: 'Kpop', key: 'kpop' },
                { code: 6, name: 'Alternative', key: 'alternative' },
            ],
            playlistZoneSelected: 'lastestPlaylist',
            categoryZoneSelected: 'rap',
            search: ''
        }
    }

    componentDidMount() {
        this.props.actions.getMusicMenu()
        this.props.actions.getMyMusic()
    }

    // to display the header view of the screen
    _header = () => {
        return (
            <View style={styles.header_container}>
                {/* search bar */}
                <View style={styles.container_search_bar}>
                    <TextInput
                        placeholder='Search'
                        style={styles.search_bar}
                        placeholderTextColor="#737373"
                        value={this.state.search}
                        blurOnSubmit={true}
                    />
                    <FontAwesomeIcon icon={faSearch} color={'grey'} size={21} style={{ opacity: 0.8, position: 'absolute', right: 25 }} />
                </View>
            </View>
        )
    }

    // to display the list of the playlist
    _showPlaylistList = () => {
        return (
            <View style={{ paddingBottom: 5, height: 180 }}>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{ flexDirection: 'row', flexWrap: 'wrap', paddingLeft: 19 }}
                    data={this.props.MyMenu.menu.playlitsSuggestion[this.state.playlistZoneSelected]}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => this._onePlayListRender(item)}
                />
            </View>
        )
    }

    // to display one playlist view
    _onePlayListRender = (playlist) => {

        return (
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('PlaylistPage', { playlistId: playlist._id })}
                style={styles.onePlaylistContainer}
            >

                {/* Background Image */}
                <FastImage
                    style={{ width: '100%', height: '100%', borderRadius: 8 }} resizeMode={FastImage.resizeMode.cover}
                    source={{ uri: playlist.picture, priority: FastImage.priority.normal }}
                />

                {/* Footer Card */}
                <View style={{ position: 'absolute', bottom: 0, width: '100%', height: 50, }}>
                    <LinearGradient
                        colors={['#fbfbfb00', '#bdc3c72e', '#2c3e50d1']}
                        style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, height: '100%', borderBottomEndRadius: 8, borderBottomStartRadius: 8 }}>
                        <View style={{ paddingLeft: 5 }}>
                            <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '800', paddingVertical: 2 }}>{playlist.name}</Text>
                        </View>
                    </LinearGradient>
                </View>

            </TouchableOpacity>
        )

    }

    // to color the place selected
    _actifZoneSelected = (key) => {
        if (key == this.state.playlistZoneSelected) return { color: '#241C50' }
        else return null
    }

    // change to actif zone
    _changePlaylistCategory = (key) => {
        this.setState({ playlistZoneSelected: key })
    }

    // to color the place selected
    _actifCategoryZoneSelected = (key) => {
        if (key == this.state.categoryZoneSelected) return { color: '#241C50' }
        else return null
    }

    // change to actif zone
    _changeCategoryZone = (key) => {
        this.setState({ categoryZoneSelected: key })
    }

    // to display a playlist row about a category
    _categorieViews = () => {
        return (
            <View style={styles.container_section}>

                {/* Category List */}
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 7, paddingLeft: 19 }}
                        data={this.state.playlistZone}
                        keyExtractor={(item) => item.key.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.one_hastag} onPress={() => this._changePlaylistCategory(item.key)}>
                                <Text style={[styles.onTitle, this._actifZoneSelected(item.key)]}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>

                {/* Playlist choosed */}
                { this.state.playlistZoneSelected == 'favorites' ? null : this._showPlaylistList()}

            </View>
        )
    }

    _renderSeparator = () => {
        return (<View style={{ height: 2, width: '100%', backgroundColor: '#e6e6e6' }} />)
    }

    // to display the music list
    _showMusicList = () => {
        return (
            <View>
                <FlatList
                    style={{ flex: 1 }}
                    ItemSeparatorComponent={this._renderSeparator}
                    data={this.state.fakeMusiclist}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => (<OneMusic music={item} tracklist={this.state.fakeMusiclist} index={index} />)}
                />
            </View>
        )
    }

    // to display the list of the genre
    _chartViews = () => {

        return null // only for the prototype

        return (
            <View style={styles.container_section}>

                {/* Category List */}
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 7, paddingLeft: 19 }}
                        data={this.state.categoryZone}
                        keyExtractor={(item) => item.key.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.one_hastag} onPress={() => this._changeCategoryZone(item.key)}>
                                <Text style={[styles.onTitle, this._actifCategoryZoneSelected(item.key)]}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>

                {/* Playlist List */}
                {this._showMusicList()}

            </View>
        )
    }

    // to display the loading animation
    _displayLoading = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 115 }}>
                <ActivityIndicator size='large' color="grey" />
            </View>
        )
    }

    // display button to save the musics
    _displayBtnToSaveMusics = () => {

        if (this.props.MyMusic.list.filter(x => x.inCache == 'not').length == 0 || this.props.MyMusic.uploading) return null

        else {
            return (<View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingRight: 15, marginBottom: 15 }}>
                <TouchableOpacity onPress={() => downloadFavoritesMusicList(this.props.MyMusic.list, this.props.actions)}>
                    <LinearGradient
                        style={{ paddingHorizontal: 15, paddingVertical: 5, borderRadius: 5, overflow: 'hidden' }}
                        colors={['#7F7FD5', '#86A8E7']}
                        start={{ x: 0.1, y: 0.09 }}
                        end={{ x: 0.94, y: 0.95 }}
                    >
                        <Text style={{ fontSize: 17, fontWeight: '500', color: 'white' }}>Save in phone</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>)
        }


    }

    // to display my music
    _myMusicView = () => {

        if (this.props.MyMusic.list.length == 0) {
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <FontAwesomeIcon icon={faTransporterEmpty} color={'#c7c7c79c'} size={121} />
                    <Text style={{ fontWeight: 'bold', fontSize: 20, fontFamily: 'Avenir-Heavy', lineHeight: 41, letterSpacing: 1, color: '#acb1c0e3', marginTop: 45 }}>No music liked yet</Text>
                </View>
            )
        }
        else return (
            <View>

                {/* to display the btn to download */}
                {this._displayBtnToSaveMusics()}

                <FlatList
                    style={{ flex: 1 }}
                    ItemSeparatorComponent={this._renderSeparator}
                    data={this.props.MyMusic.list}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item }) => (<OneMusicFav music={item} tracklist={this.props.MyMusic.list} />)}
                />
            </View>
        )
    }

    _displayContentView = () => {
        return (<View>
            {/* categorie playslit */}
            {this._categorieViews()}
            {/* chart playslit */}
            { this.state.playlistZoneSelected == 'favorites' ? this._myMusicView() : this._chartViews()}
        </View>)
    }

    render() {
        return (
            <ScrollView style={styles.main_container}>
                {/*  search bar */}
                {this._header()}
                {/* Body */}
                {this.props.MyMenu.isLoading ? this._displayLoading() : this._displayContentView()}
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: '#eef2f4'
    },
    header_container: {
        paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() + 10 : 10,
        paddingBottom: 15,
        paddingHorizontal: 25,
        backgroundColor: '#f9fafc',
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        position: 'relative',
        borderWidth: 0.3,
        borderColor: '#c3c3c36e'
    },
    container_search_bar: {
        height: 45,
        fontSize: 15,
        paddingLeft: 15,
        flexDirection: 'row',
        borderRadius: 25,
        backgroundColor: '#edf1f3',
        overflow: 'hidden',
        alignItems: 'center'
    },
    body_container: {
        paddingVertical: 20
    },
    oneLinePlaylist: {
    },
    loading_container: {
        top: 60
    },
    one_hastag: {
        marginHorizontal: 8
    },
    onePlaylistContainer: {
        marginHorizontal: 10,
        marginVertical: 10,
        height: 155,
        width: 155,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    onTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        fontFamily: 'Avenir-Heavy',
        lineHeight: 41,
        letterSpacing: 1,
        color: '#acb1c0e3'
    }

})

const mapStateToProps = state => ({
    MyProfile: state.MyProfile,
    MyMenu: state.MusicMenu,
    MyMusic: state.MyFavMusic
})

const ActionCreators = Object.assign(
    {},
    MusicMenuActions,
    MyFavMusicActions,
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeMusic)