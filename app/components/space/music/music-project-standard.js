import React from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../../redux/MyUser/actions'

import { bindActionCreators } from 'redux'
import FastImage from 'react-native-fast-image'
import OneMusic from './one-music'

class MusicProjectStandard extends React.Component {

    constructor(props) {
        super(props)
    }

    // to display the line separator
    _flatListItemSeparator = () => {
        return (<View style={{ height: 1, backgroundColor: '#d9d9d9', marginHorizontal: 15 }} />)
    }

    render() {
        const { musicProject } = this.props

        return (
            <View style={styles.container}>
                <View style={styles.header_card}>
                    <View style={{ flex: 4 }}>
                        <FastImage
                            style={{ width: 100, height: 100, borderRadius: 7 }}
                            source={{
                                uri: musicProject.picture,
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                    </View>
                    <View style={{ flex: 6 }}>
                        <View style={styles.container_info}>
                            {musicProject.name ?
                                <Text style={styles.title_project}>{musicProject.name}</Text>
                                : <Text style={styles.title_project}>Single</Text>
                            }
                            <Text>{musicProject.profile._meta.pseudo}</Text>
                            <Text>{musicProject.createdAt}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.container_musicList}>
                    <FlatList
                        data={musicProject.musicList}
                        keyExtractor={(item) => item._id.toString()}
                        ItemSeparatorComponent={this._flatListItemSeparator}
                        renderItem={({ item, index }) => (
                            <OneMusic
                                music={item}
                                tracklist={musicProject.musicList}
                                index={index}
                                space={'playlist-page'}
                            />
                        )}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 8,
        borderWidth: 1,
        borderColor: '#ebebeb8c',
        borderRadius: 9,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    header_card: {
        flexDirection: 'row',
        width: '100%',
        height: 135,
        padding: 15,
        backgroundColor: '#ebebeb8c'
    },
    container_info: {
        height: '100%',
        justifyContent: 'center'
    },
    title_project: {
        fontSize: 19,
        fontWeight: '600',
        color: '#404040'
    },
    container_musicList: {
        backgroundColor: '#ebebeb8c'
    }
})

const mapStateToProps = state => ({
    MyUser: state.MyUser
});

const ActionCreators = Object.assign(
    {},
    MyUserActions
);

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MusicProjectStandard)