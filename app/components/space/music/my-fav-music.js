import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../../../redux/MyUser/actions'
import * as MyFavMusicActions from '../../../../redux/MyFavMusic/actions'
import * as PlayerMusicActions from '../../../../redux/Player/actions'
import { bindActionCreators } from 'redux'
import OneMusic from './one-music'
import LinearGradient from 'react-native-linear-gradient'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faRandom, faAngleLeft } from '@fortawesome/free-solid-svg-icons'

class MyFavMusic extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.actions.getMyMusic()
    }

    // to display the loading animations
    _displayLoading() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' color='grey' />
            </View>
        )
    }

    // to display the line separator
    _flatListItemSeparator = () => {
        return (<View style={{ height: 1, backgroundColor: '#d9d9d9', marginHorizontal: 15 }} />)
    }

    // to display the music list
    _displayListMusic() {
        return (
            <FlatList
                style={{ paddingTop: 15 }}
                showsHorizontalScrollIndicator={false}
                data={this.props.MyMusic.list}
                keyExtractor={(item) => item._id.toString()}
                ItemSeparatorComponent={this._flatListItemSeparator}
                renderItem={({ item, index }) => (<OneMusic music={item} tracklist={this.props.MyMusic.list} index={index} />)}
            />
        )
    }

    // to suffle and play the music
    _playShuffleMusic = () => {
        const list = [...this.props.MyMusic.list]
        this.props.actions.playRandomMusicInPlaylistActions(list)
    }

    // to display the header view
    _header = () => {
        return (
            <View style={{ alignItems: 'center' }}>
                <View style={{ marginVertical: 15 }}>
                    <Text style={{ fontSize: 15 }}>CORE.My-Favorites</Text>
                </View>
                <TouchableOpacity 
                 onPress={() => this.props.navigation.goBack(null)}
                 style={{ position: 'absolute', left: 25, height: '100%', justifyContent: 'center' }}
                 >
                    <FontAwesomeIcon icon={faAngleLeft} color={'#b5b5b5'} size={32} />
                </TouchableOpacity>
                <View style={{ marginVertical: 5 }}>
                    <TouchableOpacity onPress={() => this._playShuffleMusic()}>
                        <LinearGradient colors={['#11998e', '#38ef7d']}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 0 }}
                            style={{ flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 25, alignItems: 'center' }}
                        >
                            <FontAwesomeIcon icon={faRandom} color={'white'} size={22} style={{ marginRight: 5 }} />
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: '600', top: -1, textTransform: 'uppercase' }}>Shuffle Play</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                {this._header()}
                {this.props.MyMusic.isLoading ? this._displayLoading() : this._displayListMusic()}
            </View>
        )
    }
    
}

const styles = StyleSheet.create({

})

const mapStateToProps = state => ({
    MyUser: state.MyUser,
    MyMusic: state.MyFavMusic
});

const ActionCreators = Object.assign(
    {},
    MyUserActions,
    MyFavMusicActions,
    PlayerMusicActions
);

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyFavMusic)