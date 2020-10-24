import React from 'react'
import {
    StyleSheet, View, Text, DeviceEventEmitter, TouchableOpacity, Image,
    ActivityIndicator, KeyboardAvoidingView, Platform, FlatList, Keyboard, ScrollView, TextInput
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Modal from 'react-native-modal'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import * as CommentListActions from '../../../redux/CommentList/actions'
import CommentList from './comment-list'
import TagSuggest from './tag-suggest'
import * as PublicationFeedActions from '../../../redux/FeedPublications/actions'
import * as ProfilePublicationActions from '../../../redux/publicationProfile/actions'
import * as DiscoverPublicationActions from '../../../redux/DiscoverPublication/actions'
import Video from 'react-native-video'
import I18n from '../../i18n/i18n'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { getDateTranslated } from '../../services/translation/translation-service'

class PublicationModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showSuggest: false,
            displayVideo: false,
            background_filter: false,
            page: 1
        }
    }

    componentDidMount() {
        this.props.actions.getCommentListPublication(this.props.publicationModal.publication.id, 1)
        this.eventListener = DeviceEventEmitter.addListener('toggleSuggest', this.toggleSuggest);
    }

    componentWillUnmount() {
        this.props.actions.resetComment()
        this.eventListener.remove()
        Keyboard.dismiss()
    }

    // to open or close the suggest
    toggleSuggest = (event) => {
        this.setState({ showSuggest: event.suggest })
    }

    // to navigate to a profile
    _goToProfile = (profileId) => {
        if (profileId !== this.props.MyProfile._id) this.props.publicationModal.navigation.navigate('Profile', { profileId })
        else this.props.navigation.navigate('MyProfile')
        DeviceEventEmitter.emit('toggleModal')
    }

    // to navigate to a page
    _goToPage = (pageId) => {
        this.props.publicationModal.navigation.navigate('Page', { pageId })
        DeviceEventEmitter.emit('toggleModal')
    }

    // to select the comment views
    _commentContainer = () => {
        if (this.state.page == 2) {
            return (
                <View style={{ flex: 1, position: 'absolute', width: '100%', height: '70%', zIndex: 1, top: '19%', paddingHorizontal: 19 }}>
                    <CommentList type={'publication'} publication={this.props.publicationModal.publication} />
                </View>
            )
        }
    }

    // to select the footer of the view 
    _footer(publication) {
        return (
            <View style={styles.container_footer}>

                {this.state.page == 1 ?
                    <View style={{ flex: 1, paddingLeft: 25, alignItems: 'flex-end' }}>
                        <View style={{ flexDirection: 'row', flex: 1, paddingRight: 15, paddingBottom: 15 }}>
                            <TouchableOpacity style={{ flexDirection: 'row', marginRight: 8 }} onPress={() => this.setState({ page: 2, background_filter: true })}>
                                <Image style={styles.comment_icon} source={require('../../../assets/image/icon/comment-icon.png')} resizeMode={'contain'} />
                                <Text style={{ marginLeft: 5, fontSize: 15, color: 'white' }}>{publication.commentNumber}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this._likeBtn()}>
                                <Image style={styles.heart_icon} source={this._getIconLike()} resizeMode={'contain'} />
                                <Text style={{ marginLeft: 7, fontSize: 15, color: 'white' }}>{publication.like.likeNumber}</Text>
                            </TouchableOpacity>
                        </View>
                    </View> : null}

                <View style={{ flex: 1, flexDirection: 'row', height: 39 }}>
                    <TextInput
                        placeholder={I18n.t('PUBLICATION.Write-a-comment')}
                        placeholderTextColor="#FFFFFF"
                        style={{ flex: 9, paddingLeft: 15, color: 'grey', backgroundColor: '#485164', borderRadius: 17, height: '100%' }}
                    ></TextInput>
                    <TouchableOpacity
                        style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={require('../../../assets/image/icon/fa-orange-plane.png')}
                            style={{ width: 24, height: 24 }}
                            resizeMode={'contain'}
                        />
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    // to select the header of the view 
    _header(publication) {
        return (
            <View style={styles.header_container}>
                <View style={{ flex: 1 }}>
                    {this._profilePicture(publication)}
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <TouchableOpacity style={{ height: 35, width: 35, borderRadius: 35, backgroundColor: 'red' }}
                        onPress={() => DeviceEventEmitter.emit('toggleModal')}>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    // to select the avatar for a page or profile
    _profilePicture(publication) {

        if (publication.profile) {
            return (
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this._goToProfile(publication.profile.id)}>
                    <FastImage
                        style={{ width: 50, height: 50, borderRadius: 25, resizeMode: 'cover', marginRight: 15 }}
                        source={{ uri: publication.profile.pictureprofile, priority: FastImage.priority.normal }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontWeight: '600', fontFamily: 'Avenir-Heavy', fontSize: 17 }}>{publication.profile._meta.pseudo}</Text>
                        <Text style={{ color: 'white', fontWeight: '300', fontFamily: 'Avenir-Heavy', fontSize: 15 }}>{getDateTranslated(publication.createdAt)}</Text>
                    </View>
                </TouchableOpacity>
            )
        }


        if (publication.page) {
            return (
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this._goToPage(publication.page._id)}>
                    <FastImage
                        style={{ width: 50, height: 50, borderRadius: 25, resizeMode: 'cover', marginRight: 15 }}
                        source={{ uri: publication.page.pictureprofile, priority: FastImage.priority.normal }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontWeight: '600', fontFamily: 'Avenir-Heavy', fontSize: 17 }}>{publication.page.name}</Text>
                        <Text style={{ color: 'white', fontWeight: '300', fontFamily: 'Avenir-Heavy', fontSize: 15 }}>...date...</Text>
                    </View>
                </TouchableOpacity>
            )
        }

    }

    // to put a filter on the background
    _backgroundFilter = () => {
        return (<View style={{ position: 'absolute', backgroundColor: '#00000094', width: '100%', height: '100%' }} />)
    }

    // to select the publication post view
    _renderPost(publication) {

        let background
        let orientation

        switch (publication.background) {
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
                {this._header(publication)}
                {this._commentContainer()}
                <LinearGradient colors={background} start={orientation[0]} end={orientation[1]}
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.textPost}>{publication.text}</Text>
                    {this.state.background_filter ? this._backgroundFilter() : null}
                </LinearGradient>
                {this._footer(publication)}
            </View>
        )


    }

    // to select the publication picture view
    _renderPicture(publication) {
        return (
            <View style={{ flex: 1 }}>
                {this._header(publication)}
                {this._commentContainer()}
                <Image
                    style={{ position: 'absolute', width: '100%', height: '100%' }}
                    source={{ uri: publication.file }}
                    resizeMode={'cover'}
                    blurRadius={35}
                />
                <FastImage
                    style={{ width: '100%', height: 300, flex: 1 }}
                    source={{ uri: publication.file, priority: FastImage.priority.normal }}
                    resizeMode={FastImage.resizeMode.contain}
                />
                {this.state.background_filter ? this._backgroundFilter() : null}
                {this._footer(publication)}
            </View>
        )
    }

    // to select the publication video view
    _renderVideo(publication) {
        return (
            <View style={{ flex: 1 }}>
                {this._header(publication)}
                {this._commentContainer()}

                <Image
                    style={{ position: 'absolute', width: '100%', height: '100%' }}
                    source={{ uri: publication.poster }}
                    resizeMode={'cover'}
                    blurRadius={35}
                />

                <Video
                    onReadyForDisplay={() => this.setState({ displayVideo: true })}
                    source={{ uri: publication.file }}
                    repeat={true}
                    minLoadRetryCount={5}
                    volume={0.1}
                    style={styles.backgroundVideo} />

                {!this.state.displayVideo ?

                    <FastImage
                        style={{ width: '100%', height: '100%', flex: 1 }}
                        source={{ uri: publication.poster, priority: FastImage.priority.normal }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                    : null
                }
                {this._footer(publication)}


            </View>
        )
    }

    // to select the type of the publication
    _showTypePublication(publication) {
        switch (publication.type) {
            case 'PostPublication': return this._renderPost(publication)
            case 'PicturePublication': return this._renderPicture(publication)
            case 'PublicationVideo': return this._renderVideo(publication)
        }
    }

    // to select the loading animation
    _displayLoading() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' color="grey" />
            </View>
        )
    }

    // to select the suggest container
    _renderSuggest() {
        return (
            <View style={{ flex: 2, bottom: 0, marginBottom: '15%', position: 'absolute', width: '100%', backgroundColor: 'white', borderTopWidth: 1, borderColor: '#e6e6e6' }}>
                <FlatList
                    style={styles.list}
                    data={this.props.SearchList.list}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item }) => (<TagSuggest suggest={item} />)}
                />
            </View>
        )
    }

    // to select the like icon
    _getIconLike() {
        if (!this.props.publicationModal.publication.like.isLike) return require('../../../assets/image/icon/heart-icon.png')
        else return require('../../../assets/image/icon/heart-icon-active.png')
    }

    // to like or dislike publication
    _likeBtn() {
        if (!this.props.publicationModal.publication.like.isLike) {

            let like

            if (this.props.publicationModal.publication.profile) {
                like = {
                    publicationProfile: this.props.publicationModal.publication.profile._id,
                    type: 'publication',
                    publicationId: this.props.publicationModal.publication._id,
                    ownerType: 'profile',
                    hastags: this.props.publicationModal.publication.hastags
                }
            } else {
                like = {
                    publicationProfile: this.props.publicationModal.publication.page._id,
                    type: 'publication',
                    publicationId: this.props.publicationModal.publication._id,
                    ownerType: 'page',
                    hastags: this.props.publicationModal.publication.hastags
                }
            }

            if (this.props.publicationModal.space == 'feed') {
                return this.props.actions.likePublicationFeed(like)
            }

            if (this.props.publicationModal.space == 'profile') {
                return this.props.actions.likePublicationProfile(like)
            }

            if (this.props.publicationModal.space == 'discover') {
                return this.props.actions.likePublicationDiscover(like)
            }


        } else {

            if (this.props.publicationModal.space == 'feed') {
                return this.props.actions.unlikePublicationFeed(this.props.publicationModal.publication._id)
            }

            if (this.props.publicationModal.space == 'profile') {
                return this.props.actions.unlikePublicationProfile(this.props.publicationModal.publication._id)
            }

            if (this.props.publicationModal.space == 'discover') {
                return this.props.actions.unlikePublicationDiscover(this.props.publicationModal.publication._id)
            }

        }
    }

    render() {
        return (
            <View>
                <Modal
                    onSwipeComplete={() => DeviceEventEmitter.emit('toggleModal')}
                    isVisible={true}
                    transparent={true}
                    propagateSwipe={true}
                    animationIn={'zoomIn'}
                    animationOut={'zoomOut'}
                    animationInTiming={500}
                    style={{ backgroundColor: 'white', flex: 1, margin: 0 }}
                >
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : null}
                        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
                        style={{ flex: 1 }}
                    >
                        {this._showTypePublication(this.props.publicationModal.publication)}
                    </KeyboardAvoidingView>
                </Modal>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container_footer: {
        position: 'absolute',
        bottom: 0,
        marginBottom: 20,
        paddingVertical: 13,
        paddingHorizontal: 20,
        width: '100%'
    },
    comment_icon: {
        width: 22,
        height: 22,
        marginHorizontal: 5
    },
    heart_icon: {
        width: 22,
        height: 22,
        marginLeft: 7
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    textPost: {
        paddingHorizontal: 15,
        lineHeight: 35,
        fontWeight: '400',
        fontSize: 25,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent'
    },
    header_container: {
        marginTop: Platform.OS === 'ios' ? getStatusBarHeight() + 15 : 0,
        flexDirection: 'row',
        paddingHorizontal: 25,
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: 75,
        zIndex: 1,
    }
})

const mapStateToProps = state => ({
    MyProfile: state.MyProfile.profile,
    CommentList: state.CommentList,
    SearchList: state.Search,
    PublicationFeed: state.PublicationFeed,
    publicationProfile: state.publicationProfile,
    DiscoverPublication: state.DiscoverPublication
})

const ActionCreators = Object.assign(
    {},
    CommentListActions,
    PublicationFeedActions,
    ProfilePublicationActions,
    DiscoverPublicationActions
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(PublicationModal)