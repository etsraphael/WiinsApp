import React from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity, ScrollView, Text, SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import * as PublicationFeedActions from '../../../../../redux/FeedPublications/actions'
import * as StoriesActions from '../../../../../redux/Stories/actions'
import { bindActionCreators } from 'redux'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus } from '@fortawesome/pro-light-svg-icons'
import I18n from '../../../../i18n/i18n'

class PublicationStoryHeader extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            fakeStories: [
                { url: 'https://images.unsplash.com/photo-1606695411535-e4e04b4cd6ba?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80' },
                { url: 'https://images.unsplash.com/photo-1581729119391-e7eacf938875?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80' },
                { url: 'https://images.unsplash.com/photo-1606312048149-08e754ca7958?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80' },
                { url: 'https://images.unsplash.com/photo-1606247193592-53da505571f8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1308&q=80' },
                { url: 'https://images.unsplash.com/photo-1605375641993-6121a8e10c56?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=933&q=80' },
                { url: 'https://images.unsplash.com/photo-1606276969080-bf446209054a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80' },
            ]
        }
    }

    UNSAFE_componentWillMount() {
        this.props.actions.getStoriesActions(1)
    }

    // to show a story
    _playStories = (id, index) => {
        this.props.openStory()
        this.props.actions.getStackActions(id, index)
    }

    // to select a story not seen
    _oneStory = (item) => {
        return (
            <View style={{ paddingHorizontal: 5 }}>
                <LinearGradient
                    colors={['#833ab4', '#fd1d1d', '#fcb045']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.border_lineaer}>
                    <FastImage
                        style={{ borderRadius: 23, width: '100%', aspectRatio: 1, borderWidth: 2, borderColor: 'white' }}
                        source={{ uri: item.pictureprofile, priority: FastImage.priority.normal }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                </LinearGradient>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 5 }}>
                    <Text style={{ fontWeight: '600' }}>{item._meta.pseudo}</Text>
                </View>
            </View>
        )
    }

    // to select a story seen
    _oneStoryDejaVu = (item) => {
        return (
            <View style={{ paddingHorizontal: 5 }}>
                <LinearGradient
                    colors={['#F2F2F2', '#DBDBDB', '#EAEAEA']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.border_lineaer}>
                    <FastImage
                        style={{ borderRadius: 23, width: '100%', aspectRatio: 1, borderWidth: 2, borderColor: 'white' }}
                        source={{ uri: item.pictureprofile, priority: FastImage.priority.normal }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                </LinearGradient>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 5 }}>
                    <Text style={{ fontWeight: '600' }}>{item._meta.pseudo}</Text>
                </View>
            </View>
        )
    }

    // to change the color of a bubble already seen
    _alreaySeen = (lastStoryId, lastStoryView) => {

        // never seen in the trend
        if (!lastStoryView) return true

        // seen 
        if (lastStoryId == lastStoryView) return false
        else return true

    }

    render = () => {
        return (
            <SafeAreaView style={{ paddingVertical: 5 }}>
                <ScrollView style={styles.listStories} horizontal={true} showsHorizontalScrollIndicator={false}>
                    {/* Add btn */}
                    <TouchableOpacity onPress={this.props.goToPublication} style={{ paddingHorizontal: 5 }}>
                        <View style={{ backgroundColor: '#e8ebf0', borderColor: '#c6c6c6', borderWidth: 1, borderRadius: 22, width: 55, aspectRatio: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <FontAwesomeIcon icon={faPlus} size={20} color={'black'} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 5 }}>
                            <Text style={{ fontWeight: '600' }}>{I18n.t('CORE.Add')}</Text>
                        </View>
                    </TouchableOpacity>
                    {/* Stories list  */}
                    {this.props.Stories.stories.length > 0 ?
                        <FlatList
                            horizontal={true}
                            contentContainerStyle={{ alignItems: 'center' }}
                            showsHorizontalScrollIndicator={false}
                            style={{ flexDirection: 'row' }}
                            data={this.props.Stories.stories}
                            keyExtractor={(item) => item._id.toString()}
                            renderItem={({ index, item }) => (
                                <TouchableOpacity onPress={() => this._playStories(item._id, index)}>
                                    {this._alreaySeen(item.lastStoryId, item.lastStoryView) ? this._oneStory(item) : this._oneStoryDejaVu(item)}
                                </TouchableOpacity>
                            )}
                        /> : null}
                </ScrollView>
            </SafeAreaView>
        )
    }

}

const styles = StyleSheet.create({
    listStories: {
        paddingLeft: 25,
        height: 80,
        flexDirection: 'row'
    },
    border_lineaer: {
        overflow: 'hidden',
        borderRadius: 23,
        width: 55,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
        marginHorizontal: 5,
    }
})

const mapStateToProps = state => ({
    MyProfile: state.MyProfile,
    Stories: state.Stories
})

const ActionCreators = Object.assign(
    {},
    PublicationFeedActions,
    StoriesActions
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(PublicationStoryHeader)