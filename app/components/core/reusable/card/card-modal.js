import React from 'react'
import {
    StyleSheet, View, Text, TouchableOpacity, Image,
    ActivityIndicator, KeyboardAvoidingView, Platform, FlatList, Keyboard, TextInput
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import TagSuggest from '../../reusable/suggest/tag-suggest'
import * as PublicationFeedActions from '../../../../redux/FeedPublications/actions'
import * as ProfilePublicationActions from '../../../../redux/ProfilePublications/actions'
import * as DiscoverPublicationActions from '../../../../redux/DiscoverPublications/actions'
import * as CommentListActions from '../../../../redux/CommentList/actions'
import * as PublicationInModalActions from '../../../../redux/PublicationInModal/actions'
import Video from 'react-native-video'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { getDateTranslated } from '../../../../services/translation/translation-service'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCommentLines, faHeart as faHeartEmpty, faPaperPlane } from '@fortawesome/pro-light-svg-icons'
import { faHeart, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import I18n from '../../../../../assets/i18n/i18n'

class CardModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showSuggest: false,
            displayVideo: false,
            background_filter: false,
            textComment: '',
            swipDirection: 'down',
            propagateSwipe: false
        }
    }

    _activePropagateSwipe = () => {
        this.setState({ propagateSwipe: true })
    }

    _inactivePropagateSwipe = () => {
        this.setState({ propagateSwipe: false })
    }

    _getOwnerId = () => {
        if (!!this.props.PublicationsInModal.publication.profile) {
            return this.props.PublicationsInModal.publication.profile._id
        } else {
            return this.props.PublicationsInModal.publication.page._id
        }
    }

    _toggleComment = () => {

        this.props.actions.getCommentListPublication(this.props.PublicationsInModal.publication._id, 1)

        // if it's a page 
        if (!!this.props.PublicationsInModal.publication.profile) {
            this.props.navigation.navigate('Comments',
                {
                    page: 'modal-feed-publication-profile',
                    publicationId: this.props.PublicationsInModal.publication._id,
                    publicationProfile: this.props.PublicationsInModal.publication.profile._id
                }
            )
        }

        // or a profile
        else {
            this.props.navigation.navigate('Comments',
                {
                    page: 'modal-feed-publication-page',
                    publicationId: this.props.PublicationsInModal.publication._id,
                    publicationProfile: this.props.PublicationsInModal.publication.page._id
                }
            )
        }

    }

    componentWillUnmount() {
        this.props.actions.resetComment()
        Keyboard.dismiss()
    }

    // to open or close the suggest
    toggleSuggest = (event) => {
        this.setState({ showSuggest: event.suggest })
    }

    // to navigate to a profile
    _goToProfile = (profileId) => {
        this.props.goToProfile({ profileId, pageName: this.props.pageName })
    }

    // to navigate to a page
    _goToPage = (pageId) => {
        this.props.PublicationsInModal.navigation.navigate('Page', { pageId })
    }

    // send the comment
    sendComment = () => {

        if (!this.state.textComment) return null

        if (this.props.PublicationsInModal.publication.profile) {

            const comment = {
                tagFriend: [],
                text: this.state.textComment,
                baseComment: null,
                commentProfile: null,
                publicationId: this.props.PublicationsInModal.publication._id,
                publicationProfile: this.props.PublicationsInModal.publication.profile._id,
                space: 'feed-publication'
            }

            this.props.actions.sendCommentToProfile(comment, this.props.PublicationsInModal.space, () => this.setState({ textComment: '' }))
        }

        if (this.props.PublicationsInModal.publication.page) {

            const comment = {
                tagFriend: [],
                text: this.state.textComment,
                baseComment: null,
                commentProfile: null,
                publicationId: this.props.PublicationsInModal.publication._id,
                publicationProfile: this.props.PublicationsInModal.publication.page._id,
                space: 'feed-publication'
            }

            this.props.actions.sendCommentToPage(comment, this.props.PublicationsInModal.space, () => this.setState({ textComment: '' }))
        }

        this.setState({ textComment: '' })

    }

    _writteComment = (val) => {
        this.setState({ textComment: val })
    }

    _displayIconLikeColor = () => {
        if (this.props.PublicationsInModal.publication.like.isLike) return 'red'
        else return 'white'
    }

    // to select the footer of the view 
    _footer(publication) {
        return (
            <View style={styles.container_footer}>
                <View style={{ flex: 1, flexDirection: 'row', height: 'auto', paddingHorizontal: 10 }}>
                    <View style={{ flexDirection: 'row', flex: 7, backgroundColor: '#464646a8', borderRadius: 20 }}>
                        <TextInput
                            placeholder={I18n.t('PLACEHOLDER.Your-Comment')}
                            placeholderTextColor="#FFFFFF"
                            value={this.state.textComment}
                            style={{ flex: 9, padding: 15, paddingTop: 20, color: "#FFFFFF", borderRadius: 17, height: '100%', minHeight: 55, fontSize: 16 }}
                            onChangeText={(val) => this._writteComment(val)}
                            onSubmitEditing={() => this.sendComment()}
                            blurOnSubmit={true}
                            multiline={true}
                            numberOfLines={10}
                        />

                        {this.state.textComment.length > 10 ?
                            <TouchableOpacity onPress={() => this.sendComment()}
                                style={{ flex: 3, justifyContent: 'center', alignItems: 'center', borderLeftWidth: 1, borderColor: '#d3d3d34a' }}>
                                <FontAwesomeIcon icon={faPaperPlane} color={'white'} size={19} />
                            </TouchableOpacity>
                            :

                            <View style={{ flex: 6, flexDirection: 'row' }}>
   
                                <TouchableOpacity
                                    style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}
                                    onPress={() => this._toggleComment()}
                                >
                                    <FontAwesomeIcon icon={faCommentLines} color={'white'} size={19} />
                                    <Text style={{ marginLeft: 5, fontSize: 15, color: 'white' }}>{publication.commentNumber}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => this._likeBtn()}
                                    style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}>
                                    <FontAwesomeIcon icon={faHeart} color={this._displayIconLikeColor()} size={19} />
                                    <Text style={{ fontSize: 15, color: 'white', paddingLeft: 7 }}>{publication.like.likeNumber}</Text>
                                </TouchableOpacity>
                            
                            </View>
                        }

                    </View>
{/* 

                    {this.state.textComment.length > 20 ? null :
                        <View style={{ flex: 2, paddingLeft: 25, alignItems: 'center' }}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }} onPress={() => this._toggleComment()}>
                                    <FontAwesomeIcon icon={faCommentLines} color={'white'} size={19} />
                                    <Text style={{ marginLeft: 5, fontSize: 15, color: 'white' }}>{publication.commentNumber}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this._likeBtn()}
                                    style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}>
                                    <FontAwesomeIcon icon={faHeartEmpty} color={'white'} size={19} />
                                    <Text style={{ fontSize: 15, color: 'white', paddingLeft: 7 }}>{publication.like.likeNumber}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    } */}

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
                    <TouchableOpacity style={{ height: 35, width: 35, borderRadius: 35, backgroundColor: '#00000036', justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => this.props.actions.resetPublicationInModalActions()}>
                        <FontAwesomeIcon icon={faAngleDown} color={'white'} size={22} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    // to select the avatar for a page or profile
    _profilePicture(publication) {

        if (publication.profile) {
            return (
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this._goToProfile(publication.profile._id)}>
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
                        <Text style={{ color: 'white', fontWeight: '300', fontFamily: 'Avenir-Heavy', fontSize: 15 }}>{getDateTranslated(publication.createdAt)}</Text>
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
                {/* Dark Background */}
                <FastImage
                    style={{ position: 'absolute', width: '100%', height: '100%' }}
                    source={{ uri: publication.file, priority: FastImage.priority.normal }}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: '#000000c9' }} />

                {/* Display Img */}
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
                <Image
                    style={{ position: 'absolute', width: '100%', height: '100%' }}
                    source={{ uri: publication.poster }}
                    resizeMode={'cover'}
                    blurRadius={35}
                />

                <Video
                    onReadyForDisplay={() => this.setState({ displayVideo: true })}
                    source={{ uri: publication.file }}
                    resizeMode={"contain"}
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
    _showTypePublication() {
        switch (this.props.PublicationsInModal.publication.type) {
            case 'PostPublication': return this._renderPost(this.props.PublicationsInModal.publication)
            case 'PicturePublication': return this._renderPicture(this.props.PublicationsInModal.publication)
            case 'VideoPublication': return this._renderVideo(this.props.PublicationsInModal.publication)
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

    // to like or dislike publication
    _likeBtn() {

        if (!this.props.PublicationsInModal.publication.like.isLike) {

            let like

            if (this.props.PublicationsInModal.publication.profile) {
                like = {
                    publicationProfile: this.props.PublicationsInModal.publication.profile._id,
                    type: 'feed-publication',
                    publicationID: this.props.PublicationsInModal.publication._id,
                    ownerType: 'profile',
                    hastags: this.props.PublicationsInModal.publication.hastags
                }
            } else {
                like = {
                    publicationProfile: this.props.PublicationsInModal.publication.page._id,
                    type: 'feed-publication',
                    publicationID: this.props.PublicationsInModal.publication._id,
                    ownerType: 'page',
                    hastags: this.props.PublicationsInModal.publication.hastags
                }
            }

            switch (this.props.PublicationsInModal.space) {
                case 'feed': return this.props.actions.likePublicationFeed(like)
                case 'profile': return this.props.actions.likePublicationProfile(like)
                case 'discover': return this.props.actions.likePublicationDiscover(like)
                default: return null
            }

        } else {

            switch (this.props.PublicationsInModal.space) {
                case 'feed': return this.props.actions.unlikePublicationFeed(this.props.PublicationsInModal.publication._id)
                case 'profile': return this.props.actions.unlikePublicationProfile(this.props.PublicationsInModal.publication._id)
                case 'discover': return this.props.actions.unlikePublicationDiscover(this.props.PublicationsInModal.publication._id)
                default: return null
            }

        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
                    style={{ flex: 1 }}
                >
                    {this._showTypePublication(this.props.PublicationsInModal.publication)}
                </KeyboardAvoidingView>
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
    FeedPublications: state.FeedPublications,
    ProfilePublications: state.ProfilePublications,
    DiscoverPublications: state.DiscoverPublications,
    PublicationsInModal: state.PublicationsInModal
})

const ActionCreators = Object.assign(
    {},
    CommentListActions,
    PublicationFeedActions,
    ProfilePublicationActions,
    DiscoverPublicationActions,
    PublicationInModalActions
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(CardModal)