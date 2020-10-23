import React from 'react'
import { StyleSheet, View, Text, Image, TextInput, FlatList, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import OnePlaylistMin from './one-playlist-min'
import * as MusicMenuActions from '../../../../redux/MusicMenu/actions'
import I18n from '../../../i18n/i18n'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import OneMusic from './one-music'

class HomeMusic extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            fakePlaylist: [
                {
                    id: '1',
                    playlistImg: 'https://images.unsplash.com/photo-1597338932254-eb058b7ca878?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80',
                    title: 'project1',
                    username: 'jake_27'
                },
                {
                    id: '2',
                    playlistImg: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80',
                    title: 'project2',
                    username: 'jake_27'
                },
                {
                    id: '3',
                    playlistImg: 'https://images.unsplash.com/photo-1543840950-e6529649ce74?ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80',
                    title: 'project3',
                    username: 'jake_27'
                },
                {
                    id: '4',
                    playlistImg: 'https://images.unsplash.com/photo-1583283520786-2d5119461c7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80',
                    title: 'project4',
                    username: 'jake_27'
                },
                {
                    id: '5',
                    playlistImg: 'https://images.unsplash.com/photo-1510914828947-36f754990aa5?ixlib=rb-1.2.1&auto=format&fit=crop&w=3289&q=80',
                    title: 'project5',
                    username: 'jake_27'
                },
                {
                    id: '6',
                    playlistImg: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2252&q=80',
                    title: 'project5',
                    username: 'jake_27'
                },
            ],
            fakeMusiclist: [
                {
                    id: '1',
                    name: 'project1',
                    profile: {
                        pictureprofile: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80',
                        _meta: {
                            pseudo: 'jake_27'
                        }
                    }
                },
                {
                    id: '2',
                    name: 'project2',
                    profile: {
                        pictureprofile: 'https://images.unsplash.com/photo-1595840635571-5d6abc7d584b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1287&q=80',
                        _meta: {
                            pseudo: 'sarah_few'
                        }
                    }
                },
                {
                    id: '3',
                    name: 'project3',
                    profile: {
                        pictureprofile: 'https://images.unsplash.com/photo-1597361767997-7b0433fe5136?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2215&q=80',
                        _meta: {
                            pseudo: 'rafael_salei'
                        }
                    }
                },
                {
                    id: '4',
                    name: 'project4',
                    profile: {
                        pictureprofile: 'https://images.unsplash.com/photo-1516117525866-d85459db7457?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
                        _meta: {
                            pseudo: 'tony_eve'
                        }
                    }
                }
            ]
        }
    }

    componentDidMount() {
        // this.props.actions.getMusicMenu()
    }

    // to display the header view
    _headerMusic = () => {
        return (
            <View style={styles.header_container}>

                {/* search bar */}
                <View style={{ flex: 1 }}>
                    <View style={styles.container_search_bar}>
                        <TextInput
                            placeholder='Search'
                            style={styles.search_bar}
                            placeholderTextColor="#737373"
                        />
                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={{ width: 18, height: 18 }} source={require('../../../../assets/image/icon/search-icon.png')} />
                        </View>
                    </View>
                </View>

            </View>
        )
    }

    // to display the loading animation
    _displayLoading() {
        return (
            <View style={styles.loading_container}>
                <ActivityIndicator size='large' color="grey" />
            </View>
        )
    }

    // to display the list of the playlist
    _showPlaylistList = (tubeList) => {
        return (
            <View style={{ paddingBottom: 10 }}>

                <View style={{ flexDirection: 'row' }}>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 7, paddingLeft: 19 }}
                        data={tubeList}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => this._onePlayListRender(item)}
                    />
                </View>
            </View>
        )
    }

    // to display one playlist view
    _onePlayListRender = (playlist) => {

        return (
            <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('PlaylistPage', { playlistId: '5f27b74eda3e240031fe2f18' })}
            style={styles.onePlaylistContainer}
            >

                {/* Background Image */}
                <FastImage
                    style={{ width: '100%', height: '100%', borderRadius: 8 }} resizeMode={FastImage.resizeMode.cover}
                    source={{ uri: playlist.playlistImg, priority: FastImage.priority.normal }}
                />

                {/* Footer Card */}
                <View style={{ position: 'absolute', bottom: 0, width: '100%', height: 70, }}>
                    <LinearGradient
                        colors={['#fbfbfb00', '#bdc3c72e', '#2c3e50d1']}
                        style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, height: '100%', borderBottomEndRadius: 8, borderBottomStartRadius: 8 }}>
                        <View style={{ paddingLeft: 5 }}>
                            <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '800', paddingVertical: 2 }}>{playlist.title}</Text>
                            <Text style={{ color: '#FFFFFF', fontSize: 13, fontWeight: '400', paddingVertical: 2 }}>{playlist.username}</Text>
                        </View>
                    </LinearGradient>
                </View>

            </TouchableOpacity>
        )

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
                        data={['Discover', 'My Music', 'Dance', 'Rap', 'Buzz', 'Chart', 'Blabla']}
                        keyExtractor={(item) => item.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.one_hastag}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, fontFamily: 'Avenir-Heavy', lineHeight: 41, letterSpacing: 1, color: '#acb1c0e3' }}>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>

                {/* Playlist List */}
                {this._showPlaylistList(this.state.fakePlaylist)}


            </View>
        )
    }

    // to display the music list
    _showMusicList = () => {
        return (
            <View>
                <FlatList
                    style={{ paddingHorizontal: 15 }}
                    data={this.state.fakeMusiclist}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => (<OneMusic music={item} tracklist={this.state.fakeMusiclist} index={index} />)}
                />
            </View>
        )
    }

    // to display the list of the genre
    _chartViews = () => {
        return (
            <View style={styles.container_section}>

                {/* Category List */}
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 7, paddingLeft: 19 }}
                        data={['Vpop', 'Rap', 'Pop', 'Kpop', 'US-UK', 'Vpop2', 'Rap2', 'Pop2', 'Kpop2', 'US-UK2']}
                        keyExtractor={(item) => item.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.one_hastag}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, fontFamily: 'Avenir-Heavy', lineHeight: 41, letterSpacing: 1, color: '#acb1c0e3' }}>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>

                {/* Playlist List */}
                {this._showMusicList()}

            </View>
        )
    }

    render() {
        return (
            <ScrollView style={styles.main_container}>
                {/*  search bar */}
                {this._headerMusic()}
                {/* categorie playslit */}
                {this._categorieViews()}
                {/* chart playslit */}
                {this._chartViews()}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() + 10 : 0,
    },
    container_section: {
        backgroundColor: 'white'
    },
    header_container: {
        flexDirection: 'row',
        position: 'relative',
        marginVertical: 5,
        paddingHorizontal: 15
    },
    container_search_bar: {
        height: 38,
        fontSize: 15,
        paddingLeft: 25,
        flexDirection: 'row',
        borderRadius: 18,
        backgroundColor: '#f2f3f7',
        overflow: 'hidden',
        alignItems: 'center'
    },
    search_bar: {
        fontSize: 15,
        paddingLeft: 10,
        flex: 7
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
        marginVertical: 15,
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
    }

})

const mapStateToProps = state => ({
    MyProfile: state.MyProfile,
    MyMenu: state.MusicMenu
})

const ActionCreators = Object.assign(
    {},
    MusicMenuActions
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeMusic)