import React from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../../../redux/MyUser/actions'
import * as TopHastagActions from '../../../../redux/TopHastag/actions'
import * as DiscoverPublicationActions from '../../../../redux/DiscoverPublications/actions'
import * as SearchBarActions from '../../../../redux/SearchBar/actions'
import { bindActionCreators } from 'redux'
import FastImage from 'react-native-fast-image'

class SuggestionDiscover extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            actifCategory: 'All categories'
        }
    }

    _changeCategory = (name) => {
        this.setState({ actifCategory: name })
    }

    _activeColorCategory(item) {
        if (item == this.state.actifCategory) {
            return {
                borderBottomWidth: 3,
                borderBottomColor: '#1155fd'
            }
        } else return null
    }

    _activeColorCategoryWord(item) {
        if (item == this.state.actifCategory) {
            return { color: '#1155fd' }
        } else return null
    }

    _header = () => {
        return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 7 }}
                    data={['All categories', 'Profile', 'Music', 'Group', 'Page']}
                    keyExtractor={(item) => item.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={[styles.one_categorie, this._activeColorCategory(item)]} onPress={() => this._changeCategory(item)}>
                            <Text style={[{ fontWeight: 'bold', fontSize: 15, lineHeight: 41, letterSpacing: 1, color: '#8E8E8E' }, this._activeColorCategoryWord(item)]}>{item}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        )
    }

    _showSuggestion = (payload) => {
        switch (payload.type) {
            case 'ProfileSuggestion': return this._displaySuggestionProfile(payload.profile)
            case 'PageSuggestion': return this._displaySuggestionPage(payload.page)
            case 'GroupSuggestion': return this._displaySuggestionGroup(payload.group)
            case 'MusicProjectSuggestion': return this._displaySuggestionMusicProject(payload.musicProject)
            case 'MusicSuggestion': return this._displaySuggestionMusic(payload.music)
            default: return null
        }
    }

    _displaySuggestionMusicProject = (musicProject) => {
        return (
            <TouchableOpacity style={{ flexDirection: 'row', width: '100%', padding: 15 }}>
                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.image_container}>
                        <FastImage style={{ width: 36, height: 36, borderRadius: 25 }} resizeMode={FastImage.resizeMode.cover}
                            source={{ uri: musicProject.picture, priority: FastImage.priority.normal }}
                        />
                    </View>
                </View>
                <View style={{ flex: 5, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 15, fontWeight: '600', color: '#2c3a4f' }}>{musicProject.name}</Text>
                    <Text style={{ fontSize: 13, color: 'grey' }}>Music Project</Text>
                </View>
                <View style={{ flex: 2 }} />
            </TouchableOpacity>
        )
    }

    _displaySuggestionMusic = (music) => {
        return (
            <TouchableOpacity style={{ flexDirection: 'row', width: '100%', padding: 15 }}>
                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.image_container}>
                        <FastImage style={{ width: 36, height: 36, borderRadius: 25 }} resizeMode={FastImage.resizeMode.cover}
                            source={{ uri: music.imgUrl, priority: FastImage.priority.normal }}
                        />
                    </View>
                </View>
                <View style={{ flex: 5, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 15, fontWeight: '600', color: '#2c3a4f' }}>{music.name}</Text>
                    <Text style={{ fontSize: 13, color: 'grey' }}>Music</Text>
                </View>
                <View style={{ flex: 2 }} />
            </TouchableOpacity>
        )
    }

    _displaySuggestionProfile = (profile) => {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', { profileId: profile._id })}
            style={{ flexDirection: 'row', width: '100%', padding: 15 }}>
                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.image_container}>
                        <FastImage style={{ width: 36, height: 36, borderRadius: 25 }} resizeMode={FastImage.resizeMode.cover}
                            source={{ uri: profile.pictureprofile, priority: FastImage.priority.normal }}
                        />
                    </View>
                </View>
                <View style={{ flex: 5, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 15, fontWeight: '600', color: '#2c3a4f' }}>{profile._meta.pseudo}</Text>
                    <Text style={{ fontSize: 13, color: 'grey' }}>Profile</Text>
                </View>
                <View style={{ flex: 2 }} />
            </TouchableOpacity>
        )
    }

    _displaySuggestionPage = (page) => {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Page', { pageId: page._id })}
            style={{ flexDirection: 'row', width: '100%', padding: 15 }}>
                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.image_container}>
                        <FastImage style={{ width: 36, height: 36, borderRadius: 25 }} resizeMode={FastImage.resizeMode.cover}
                            source={{ uri: page.pictureprofile, priority: FastImage.priority.normal }}
                        />
                    </View>
                </View>
                <View style={{ flex: 5, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 15, fontWeight: '600', color: '#2c3a4f' }}>{page.name}</Text>
                    <Text style={{ fontSize: 13, color: 'grey' }}>Page</Text>
                </View>
                <View style={{ flex: 2 }} />
            </TouchableOpacity>
        )
    }

    _displaySuggestionGroup = (group) => {
        return (
            <TouchableOpacity style={{ flexDirection: 'row', width: '100%', padding: 15 }}>
                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.image_container}>
                        <FastImage style={{ width: 36, height: 36, borderRadius: 25 }} resizeMode={FastImage.resizeMode.cover}
                            source={{ uri: group.pictureprofile, priority: FastImage.priority.normal }}
                        />
                    </View>
                </View>
                <View style={{ flex: 5, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 15, fontWeight: '600', color: '#2c3a4f' }}>{group.name}</Text>
                    <Text style={{ fontSize: 13, color: 'grey' }}>Group</Text>
                </View>
                <View style={{ flex: 2 }} />
            </TouchableOpacity>
        )
    }

    _body = () => {
        return (
            <View style={{ height: '100%' }}>
                <FlatList
                    data={this.props.Search.list}
                    keyExtractor={(item) => item.toString()}
                    renderItem={({ item }) => this._showSuggestion(item)}
                />
            </View>
        )
    }

    render() {
        return (
            <View style={styles.main_container}>
                {this._header()}
                {this._body()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    one_categorie: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cdd1d4'
    },
    image_container: {
        width: 40,
        height: 40,
        borderColor: 'white',
        borderWidth: 3,
        borderRadius: 25,
        backgroundColor: 'white',
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
})

const mapStateToProps = state => ({
    MyUser: state.MyUser,
    TopHastag: state.TopHastag,
    DiscoverPublications: state.DiscoverPublications,
    Search: state.Search
})

const ActionCreators = Object.assign(
    {},
    MyUserActions,
    TopHastagActions,
    DiscoverPublicationActions,
    SearchBarActions
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(SuggestionDiscover)