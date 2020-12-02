import React from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import * as PublicationFeedActions from '../../../../../redux/FeedPublications/actions'
import * as StoriesActions from '../../../../../redux/Stories/actions'
import { bindActionCreators } from 'redux'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus } from '@fortawesome/pro-light-svg-icons'

class PublicationStoryHeader extends React.Component {

    constructor(props) {
        super(props)
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
            <View>
                <LinearGradient
                    colors={['#3C349B', '#8B45DD']}
                    style={styles.border_lineaer}>
                    <FastImage
                        style={{ borderRadius: 45, width: '100%', aspectRatio: 1, borderWidth: 1, borderColor: 'white' }}
                        source={{ uri: item.pictureprofile, priority: FastImage.priority.normal }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                </LinearGradient>
            </View>
        )
    }

    // to select a story seen
    _oneStoryDejaVu = (item) => {
        return (
            <View>
                <LinearGradient
                    colors={['#F2F2F2', '#DBDBDB', '#EAEAEA']}
                    style={styles.border_lineaer}>
                    <FastImage
                        style={{ borderRadius: 45, width: '100%', aspectRatio: 1, borderWidth: 1, borderColor: 'white' }}
                        source={{ uri: item.pictureprofile, priority: FastImage.priority.normal }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                </LinearGradient>
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

            <View style={{ paddingVertical: 5 }}>

                <ScrollView style={styles.listStories} horizontal={true} showsHorizontalScrollIndicator={false}>



                    {/* Add btn */}
                    <TouchableOpacity onPress={this.props.goToPublication} style={{paddingHorizontal: 5}}>
                        <View style={{ backgroundColor: '#e8ebf0', borderColor: '#c6c6c6', borderWidth: 1, borderRadius: 22, width: 50, aspectRatio: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={faPlus} size={20} color={'black'} />
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 5}}>
                            <Text style={{fontWeight: '600'}}>Add</Text>
                        </View>
                    </TouchableOpacity>




                    {/* Stories list  */}
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
                    />




                </ScrollView>

            </View>
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
        borderRadius: 46,
        width: 53,
        height: 53,
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