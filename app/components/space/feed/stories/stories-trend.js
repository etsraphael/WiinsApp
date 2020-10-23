import React from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity, ActivityIndicator, Text } from 'react-native'
import { connect } from 'react-redux'
import * as PublicationFeedActions from '../../../../../redux/PublicationFeed/actions'
import * as StoriesActions from '../../../../../redux/Stories/actions'
import { bindActionCreators } from 'redux'
import Modal from 'react-native-modal'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import Video from 'react-native-video'

class StoriesTrend extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            progressTimer: 0,
            indexProgress: 0,
            VideoReady: false,
            videoDuration: 0,
            currentTimeVideo: 0,
            newStack: true
        }
        this.interval = null
    }

    UNSAFE_componentWillMount = () => {
        this._startInterval()
    }

    componentWillUnmount = () => {
        this._clearIntaval()
    }

    // to start the story timer
    _startInterval = () => {
        this.interval = setInterval(() => {
            if (this.state.progressTimer < 100) return this._updateTimer()
            else return this._nextPage()
        }, 5)
    }

    // to update the story timer
    _updateTimer = () => {
        if (this.props.Stories.oneStoryIsLoading) return null
        if (!this.props.Stories.stories[this.props.Stories.currentIndexStory].stack) return null

        // set the position
        if (this.state.progressTimer == 0 && this.state.indexProgress == 0) this._setIndex()

        switch (this.props.Stories.stories[this.props.Stories.currentIndexStory].stack.publicationList[this.state.indexProgress].publication.type) {
            case 'PostStory':
            case 'PictureStory': {
                return this.setState({ progressTimer: this.state.progressTimer + 0.3 })
            }
            default: return null
        }
    }

    // to clear the timer
    _clearIntaval = () => {
        clearInterval(this.interval)
    }

    // to get the progression of the bar
    _getProgressColor = (index, type) => {

        if (type == 'VideoStory' && (this.state.indexProgress == index)) {
            return { width: ((this.state.currentTimeVideo / this.state.videoDuration) * 100) + '%' }
        }

        switch (true) {
            case this.state.indexProgress > index: return { width: '100%' }
            case this.state.indexProgress == index: return { width: Math.round(this.state.progressTimer) + '%' }
            default: return { width: '0%' }
        }

    }

    // to load the story header view
    _header = () => {
        return (
            <View style={styles.header_container}>
                <View style={{ paddingHorizontal: 10 }}>
                    <FlatList
                        numColumns={this.props.Stories.stories[this.props.Stories.currentIndexStory].stack.publicationList.length}
                        style={{ paddingHorizontal: 5 }}
                        data={this.props.Stories.stories[this.props.Stories.currentIndexStory].stack.publicationList}
                        keyExtractor={(item) => item._id.toString()}
                        renderItem={({ index, item }) => (
                            <View style={styles.bar}>
                                <View style={[styles.barColored, this._getProgressColor(index, item.publication.type)]}></View>
                            </View>
                        )}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 25, paddingVertical: 15 }}>
                    <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                        <FastImage
                            style={{ width: 39, height: 39, borderRadius: 25, borderWidth: 2, borderColor: 'white' }}
                            source={{
                                uri: this.props.Stories.stories[this.props.Stories.currentIndexStory].stack.profile.pictureprofile,
                                priority: FastImage.priority.normal,
                            }} resizeMode={FastImage.resizeMode.cover}
                        />
                        <View style={{ justifyContent: 'center', paddingLeft: 15 }}>
                            <Text style={{ color: 'white', fontSize: 19 }}>{this.props.Stories.stories[this.props.Stories.currentIndexStory].stack.profile._meta.pseudo}</Text>
                            <Text style={{ color: 'white' }}>{this.props.Stories.stories[this.props.Stories.currentIndexStory].stack.dateLastViews}</Text>

                        </View>
                    </View>
                    <TouchableOpacity style={{ justifyContent: 'center', textAlign: 'right', paddingVertical: 5, paddingHorizontal: 15 }} onPress={() => this.props.goBack()}>
                        <FontAwesomeIcon icon={faTimes} color={'white'} size={25} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    // to change the story selected
    _setIndex = () => {

        const lastStoryView = this.props.Stories.stories[this.props.Stories.currentIndexStory].lastStoryView
        const lastIndexView = this.props.Stories.stories[this.props.Stories.currentIndexStory].stack.publicationList.map(x => x.publication._id).indexOf(lastStoryView)

        // already seen a part
        if (!!lastStoryView && lastIndexView) {
            // if we have already seen the last 
            if (lastIndexView + 1 > this.props.Stories.stories[this.props.Stories.currentIndexStory].stack.publicationList.length - 1) return null
            else return this.setState({ indexProgress: lastIndexView + 1, progressTimer: 0, videoDuration: 0, currentTimeVideo: 0 })
        }

    }

    // to load the publication view
    _body = () => {

        switch (this.props.Stories.stories[this.props.Stories.currentIndexStory].stack.publicationList[this.state.indexProgress].publication.type) {
            case 'PostStory': return this._displayPostStory()
            case 'PictureStory': return this._displayPictureStory()
            case 'VideoStory': return this._displayVideoStory()
        }
    }

    // to display the video publication
    _displayVideoStory = () => {
        return (
            <View style={{ flex: 1 }}>
                <Video
                    onReadyForDisplay={() => this.setState({ VideoReady: true })}
                    source={{ uri: this.props.Stories.stories[this.props.Stories.currentIndexStory].stack.publicationList[this.state.indexProgress].publication.file }}
                    minLoadRetryCount={5}
                    volume={0.1}
                    style={styles.backgroundVideo}
                    resizeMode={'cover'}
                    posterResizeMode={'cover'}
                    poster={this.props.Stories.stories[this.props.Stories.currentIndexStory].stack.publicationList[this.state.indexProgress].publication.poster}
                    onProgress={(event) => this.setState({ currentTimeVideo: event.currentTime })}
                    onLoad={(event) => this.setState({ videoDuration: event.duration })}
                    onEnd={() => this._nextPage()}
                />
                {
                    !this.state.VideoReady ?
                        <View style={styles.container_loading_video}>
                            <ActivityIndicator size='large' color="white" />
                        </View>
                        : null
                }


            </View>
        )
    }

    // to display the post publication
    _displayPostStory = () => {

        let background
        let orientation

        switch (this.props.Stories.stories[this.props.Stories.currentIndexStory].stack.publicationList[this.state.indexProgress].publication.background) {
            case 'linear-gradient(to left bottom, #8d7ab5, #dc74ac, #ff7d78, #ffa931, #c0e003)': {
                background = ['#8d7ab5', '#dc74ac', '#ff7d78', '#ffa931', '#c0e003']
                orientation = [{ x: 1, y: 0 }, { x: 0, y: 1 }]
                break;
            }
            case 'linear-gradient(to right top, #000000, #000000, #000000, #000000, #000000)': {
                background = ['#000000', '#000000']
                orientation = [{ x: 0, y: 1 }, { x: 1, y: 0 }]
                break;
            }
            case 'linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)': {
                background = ['#051937', '#004d7a', '#008793', '#00bf72', '#a8eb12']
                orientation = [{ x: 0, y: 1 }, { x: 1, y: 0 }]
                break;
            }
            case 'linear-gradient(45deg, #ff0047 0%, #2c34c7 100%)': {
                background = ['#ff0047', '#2c34c7']
                orientation = [{ x: 0, y: 1 }, { x: 1, y: 0 }]
                break;
            }
            case 'linear-gradient(to right top, #282812, #4a3707, #7b3d07, #b43527, #eb125c)': {
                background = ['#282812', '#4a3707', '#7b3d07', '#b43527', '#eb125c']
                orientation = [{ x: 0, y: 1 }, { x: 1, y: 0 }]
                break;
            }
            case 'linear-gradient(to left bottom, #17ea8a, #00c6bb, #009bca, #006dae, #464175)': {
                background = ['#17ea8a', '#00c6bb', '#009bca', '#006dae', '#464175']
                orientation = [{ x: 0, y: 1 }, { x: 1, y: 0 }]
                break;
            }
        }

        return (
            <View style={{ flex: 1 }}>
                <LinearGradient colors={background}
                    start={orientation[0]}
                    end={orientation[1]}
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{
                        paddingHorizontal: 15,
                        lineHeight: 35,
                        fontWeight: '400',
                        fontSize: 25,
                        textAlign: 'center',
                        margin: 10,
                        color: '#ffffff',
                        backgroundColor: 'transparent'
                    }}>
                        {this.props.Stories.stories[this.props.Stories.currentIndexStory].stack.publicationList[this.state.indexProgress].publication.text}
                    </Text>
                </LinearGradient>
            </View>
        )
    }

    // to display the picture publication 
    _displayPictureStory = () => {
        return (<View>
            <FastImage
                style={{ width: '100%', height: '100%' }}
                source={{
                    uri: this.props.Stories.stories[this.props.Stories.currentIndexStory].stack.publicationList[this.state.indexProgress].publication.file,
                    priority: FastImage.priority.high,
                }} resizeMode={FastImage.resizeMode.cover}
            />
        </View>)
    }

    // to load the next page
    _nextPage = () => {

        // sign the views
        const lastStoryView = this.props.Stories.stories[this.props.Stories.currentIndexStory].lastStoryView
        const lastIndexView = this.props.Stories.stories[this.props.Stories.currentIndexStory].stack.publicationList.map(x => x.publication._id).indexOf(lastStoryView)

        if (!lastStoryView || (this.state.indexProgress > lastIndexView)) {
            this._signView()
        }

        if (this.state.indexProgress + 1 > this.props.Stories.stories[this.props.Stories.currentIndexStory].stack.publicationList.length - 1) {
            // next story trend or close it
            if (this.props.Stories.currentIndexStory + 1 > this.props.Stories.stories.length - 1) this._closeModal()
            else this._nextStack()
        } else {
            this.setState({ indexProgress: this.state.indexProgress + 1, progressTimer: 0, videoDuration: 0, currentTimeVideo: 0 })
        }
    }

    // to put seen on a story
    _signView = () => {
        this.props.actions.storySeenActions(
            this.props.Stories.stories[this.props.Stories.currentIndexStory]._id,
            this.props.Stories.stories[this.props.Stories.currentIndexStory].stack.publicationList[this.state.indexProgress].publication._id
        )
    }

    // to close story view
    _closeModal = () => {
        this._clearIntaval()
        this.props.goBack()
    }

    // to load the next story trend
    _nextStack = () => {
        const nextProfileId = this.props.Stories.stories[this.props.Stories.currentIndexStory + 1]._id
        this.props.actions.getStackActions(nextProfileId, this.props.Stories.currentIndexStory + 1)
        this.setState({ indexProgress: 0, progressTimer: 0, videoDuration: 0, currentTimeVideo: 0 })
    }

    // to load the previous story trend
    _previousStack = () => {
        this.props.actions.moveToPreviousActions()
        this.setState({ indexProgress: 0, progressTimer: 0, videoDuration: 0, currentTimeVideo: 0 })
        this._clearIntaval()
        this._startInterval()
    }

    // to come back to the previous story
    _previousPage = () => {
        if (this.state.indexProgress == 0) {
            // previous story trend or restard
            if (this.props.Stories.currentIndexStory > 0) this._previousStack()
            else this.setState({ progressTimer: 0 })
        } else {
            this.setState({ indexProgress: this.state.indexProgress - 1, progressTimer: 0 })
        }
    }

    // to display the navigation button
    _btnNavigation = () => {
        return (
            <View style={{ position: 'absolute', bottom: 0, width: '100%', height: '85%', zIndex: 1 }}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <TouchableOpacity onPress={() => this._previousPage()} style={{ flex: 1 }} />
                    <TouchableOpacity onPress={() => this._nextPage()} style={{ flex: 2 }} />
                </View>
            </View>
        )
    }

    // to display the avatar of the previous story
    _previousAvatar = () => {
        if (this.props.Stories.currentIndexStory == 0) this._closeModal()
        else this._previousStack()
    }

    // to upload a story strend
    _uploadOneTrend() {
        this.props.actions.getStackActions(this.props.Stories.stories[this.props.Stories.currentIndexStory].id, this.props.Stories.currentIndexStory)
    }

    // to navigate to the profile
    _btnNavigationAvatar = () => {
        return (
            <View style={{ position: 'absolute', bottom: 0, width: '100%', height: '85%', zIndex: 1 }}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <TouchableOpacity onPress={() => this._previousAvatar()} style={{ flex: 1 }} />
                    <TouchableOpacity onPress={() => this._uploadOneTrend()} style={{ flex: 2 }} />
                </View>
            </View>
        )
    }

    // to display the loading animations
    _loadingContainer = () => {
        return (
            <View style={{ flex: 1, backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' color="white" />
            </View>
        )
    }

    // to display the principal view
    _trendView = () => {
        return (
            <View style={{ flex: 1 }}>
                {this._header()}
                {this._body()}
                {this._btnNavigation()}
            </View>
        )
    }

    // to show avatar owner
    _avatarView = () => {
        return (
            <View style={{ flex: 1 }}>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <FastImage
                        style={{ width: 155, height: 155, borderRadius: 155, borderWidth: 3, borderColor: 'white' }}
                        source={{
                            uri: this.props.Stories.stories[this.props.Stories.currentIndexStory].pictureprofile,
                            priority: FastImage.priority.normal,
                        }} resizeMode={FastImage.resizeMode.cover}
                    />
                    <View style={{ justifyContent: 'center', paddingTop: 25, alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 24, paddingBottom: 5 }}>{this.props.Stories.stories[this.props.Stories.currentIndexStory]._meta.pseudo}</Text>
                        <Text style={{ color: 'white' }}>{this.props.Stories.stories[this.props.Stories.currentIndexStory].lastStories}</Text>
                    </View>
                </View>

                {this._btnNavigationAvatar()}

            </View>
        )
    }

    // to display the render
    _mainRender = () => {
        return (
            <View style={{ flex: 1 }}>
                {!!this.props.Stories.stories[this.props.Stories.currentIndexStory].stack ? this._trendView() : this._avatarView()}
            </View>
        )
    }

    render = () => {
        return (
            <View>
                <Modal
                    animationIn={'zoomIn'}
                    animationOut={'zoomOut'}
                    isVisible={this.props.isVisible}
                    transparent={false}
                    style={styles.main_container}
                    propagateSwipe={true}
                >
                    {this.props.Stories.oneStoryIsLoading ? this._loadingContainer() : this._mainRender()}
                </Modal>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        margin: 0,
    },
    header_container: {
        paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() + 10 : 0,
        width: '100%',
        position: 'absolute',
        top: 0,
        height: 90,
        zIndex: 1
    },
    bar: {
        flex: 1,
        height: 3,
        backgroundColor: '#f5f5f547',
        overflow: 'hidden',
        marginHorizontal: 2,
        borderRadius: 10
    },
    barColored: {
        backgroundColor: 'white',
        height: '100%',
        width: 0
    },
    backgroundVideo: {
        flex: 1,
        height: '100%'
    },
    container_loading_video: {
        flex: 1,
        backgroundColor: '#b3b3b37a',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%'
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

export default connect(mapStateToProps, mapDispatchToProps)(StoriesTrend)