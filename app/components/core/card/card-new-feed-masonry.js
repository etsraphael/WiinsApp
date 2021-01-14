import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, DeviceEventEmitter } from 'react-native'
import { connect } from 'react-redux'
import * as PublicationFeedActions from '../../../../redux/FeedPublications/actions'
import * as ProfilePublicationActions from '../../../../redux/ProfilePublications/actions'
import * as DiscoverdPublicationActions from '../../../../redux/DiscoverPublications/actions'
import { bindActionCreators } from 'redux'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlay, faComment, faHeart } from '@fortawesome/pro-light-svg-icons'
import { faHeart as faHeartEmpty } from '@fortawesome/pro-light-svg-icons'
import { faHeart as faHeartFull } from '@fortawesome/free-solid-svg-icons'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { getDateTranslated } from '../../../services/translation/translation-service'

class CardNewFeedMasonry extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            imageHeight: 200,
            cardWidth: 0,
            textHeight: 0,
        }
    }

    // to set the size of the picture
    onImageLoaded = (event) => {
        const { width, height } = event.nativeEvent;
        const ratio = this.state.cardWidth / width;
        const ratioHeight = height * ratio;
        this.setState({ imageHeight: ratioHeight >= 200 ? ratioHeight : 200 });
    }

    // to select the post publication view
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
            <TouchableOpacity
                style={{ height: 400 }}
                onPress={() => DeviceEventEmitter.emit('toggleModal', { publication, navigation: this.props.navigation, space: this.props.space })}
            >
                <LinearGradient colors={background} start={orientation[0]} end={orientation[1]} style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{
                        paddingBottom: 10,
                        paddingHorizontal: 15,
                        lineHeight: 25,
                        fontWeight: '400',
                        fontSize: 25,
                        fontFamily: 'Gill Sans',
                        textAlign: 'center',
                        margin: 10,
                        color: '#ffffff',
                        backgroundColor: 'transparent'
                    }}>
                        {publication.text}
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    }

    // to select the picture publication view
    _renderPicture(publication) {

        return (
            <TouchableOpacity
                style={styles.container_type}
                onPress={() => DeviceEventEmitter.emit('toggleModal', { publication, navigation: this.props.navigation, space: this.props.space })}
            >

                <FastImage
                    style={{ flex: 1, width: '100%', minHeight: 300 }}
                    source={{ uri: publication.file, priority: FastImage.priority.normal }}
                    resizeMode={FastImage.resizeMode.cover}
                    onLoad={this.onImageLoaded}
                />

            </TouchableOpacity>
        )
    }

    // to select the video publication view
    _renderVideo(publication) {

        return (
            <TouchableOpacity style={styles.container_type}
                onPress={() => DeviceEventEmitter.emit('toggleModal', { publication, navigation: this.props.navigation, space: this.props.space })}
            >
                <FastImage
                    style={{ flex: 1, width: '100%', height: this.state.imageHeight }}
                    source={{ uri: publication.poster, priority: FastImage.priority.normal }}
                    resizeMode={FastImage.resizeMode.cover}
                    onLoad={this.onImageLoaded}
                />
                <View style={{
                    position: 'absolute', bottom: 0, top: 0, left: 0, right: 0,
                    justifyContent: 'center', alignItems: 'center'
                }}>
                    <FontAwesomeIcon icon={faPlay} color={'white'} size={37} style={{ opacity: 0.9 }} />
                </View>

            </TouchableOpacity>
        )
    }

    // to select the publication type
    _showTypePublication(publication) {
        switch (publication.type) {
            case 'PostPublication': return this._renderPost(publication);
            case 'PicturePublication': return this._renderPicture(publication);
            case 'VideoPublication': return this._renderVideo(publication);
            default: return null
        }
    }

    // to show post publication
    _showPostPublication = (publication) => {
        return (
            <View onLayout={(event) => { this.setState({ textHeight: event.nativeEvent.layout.height }) }}>
                {
                    publication.text.trim().length > 0 && <View style={styles.cardPostText}>
                        <Text>{publication.text}</Text>
                    </View>
                }
            </View>)
    }

    // to show picture publication
    _showPicturePublication = (publication) => {
        return (
            <>
                <TouchableOpacity
                    style={styles.cardPostPicture}
                    onPress={() => DeviceEventEmitter.emit('toggleModal', { publication, navigation: this.props.navigation, space: this.props.space })}
                >
                    {
                        this.state.cardWidth > 0 && <FastImage
                            style={{ width: '100%', minHeight: 200, height: this.state.imageHeight }}
                            source={{ uri: publication.file, priority: FastImage.priority.normal }}
                            resizeMode={FastImage.resizeMode.cover}
                            onLoad={this.onImageLoaded}
                        />
                    }
                </TouchableOpacity>
                { this._showPostPublication(publication)}
            </>
        )
    }

    // to show video publication
    _showVideoPublication = (publication) => {
        return (
            <>
                <TouchableOpacity
                    style={styles.cardPostPicture}
                    onPress={() => DeviceEventEmitter.emit('toggleModal', { publication, navigation: this.props.navigation, space: this.props.space })}
                >
                    {
                        this.state.cardWidth > 0 && <FastImage
                            style={{ width: '100%', minHeight: 200, height: this.state.imageHeight }}
                            source={{ uri: publication.poster, priority: FastImage.priority.normal }}
                            resizeMode={FastImage.resizeMode.cover}
                            onLoad={this.onImageLoaded}
                        />
                    }

                    <View style={{ ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', zIndex: 10 }}>
                        <TouchableWithoutFeedback style={{ height: 40, width: 40, borderRadius: 20, borderWidth: 1, borderColor: '#4e4e4e', borderStyle: 'solid', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFFa1' }}>
                            <FontAwesomeIcon icon={faPlay} size={15} color="#4e4e4e" />
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableOpacity>
                { this._showPostPublication(publication)}
            </>
        )
    }

    // to navigate to a profile
    _goToProfile = (profileId) => {
        if (this.props.space == 'profile') return null
        if (profileId !== this.props.MyProfile.profile._id) this.props.navigation.navigate('Profile', { profileId })
        else this.props.navigation.navigate('MyProfile')
    }

    // to navigate to a page
    _goToPage = (pageId) => {
        return this.props.navigation.navigate('Page', { pageId })
    }

    // to select like icon
    _displayIconLike() {
        if (!this.props.publication.like.isLike) {
            return (<FontAwesomeIcon icon={faHeartEmpty} color={'#1D1D26'} size={19} />)
        }
        else {
            return (<FontAwesomeIcon icon={faHeartFull} color={'red'} size={19} />)
        }
    }

    _getColorLike() {
        if (!this.props.publication.like.isLike) return 'white'
        else return 'red'
    }

    // to like a publication
    _likePublication = () => {

        if (!this.props.publication.like.isLike) {
            let like

            // if it's a profile
            if (this.props.publication.profile) {
                like = {
                    publicationProfile: this.props.publication.profile._id,
                    type: 'feed-publication',
                    publicationID: this.props.publication._id,
                    ownerType: 'profile',
                    hastags: this.props.publication.hastags
                }
            }
            // if it's a page
            else {
                like = {
                    publicationProfile: this.props.publication.page._id,
                    type: 'feed-publication',
                    publicationID: this.props.publication._id,
                    ownerType: 'page',
                    hastags: this.props.publication.hastags
                }
            }
            switch (this.props.space) {
                case 'feed': return this.props.actions.likePublicationFeed(like)
                case 'profile': return this.props.actions.likePublicationProfile(like)
                case 'discover': return this.props.actions.likePublicationDiscover(like)
            }
        } else {
            this._disLikePublication()
        }
    }

    // to dislike a publication
    _disLikePublication = () => {
        switch (this.props.space) {
            case 'feed': return this.props.actions.unlikePublicationFeed(this.props.publication._id)
            case 'profile': return this.props.actions.unlikePublicationProfile(this.props.publication._id)
            case 'discover': return this.props.actions.unlikePublicationDiscover(this.props.publication._id)
        }
    }

    // move the card to the top
    cardMoveOn = (index) => {
        if (index > 0) {
            return {
                position: 'relative',
                top: -31 * index
            }
        }
    }

    _showCardHeader = (publication) => {
        const { page, profile, createdAt } = publication;
        const pictureprofile = profile ? profile.pictureprofile : page.pictureprofile;
        const name = profile ? profile._meta.pseudo : page.name;
        const onImageAction = () => profile ? this._goToProfile(publication.profile._id) : this._goToPage(publication.page._id);

        return (
            <View style={styles.headerStyle}>
                <TouchableOpacity onPress={onImageAction}>
                    <FastImage
                        style={styles.cardProfileImage}
                        source={{
                            uri: pictureprofile,
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: '#3F3F3F', fontSize: 13, textTransform: 'capitalize' }}>{name}</Text>
                    <Text style={{ color: '#4E586E', fontSize: 13 }}>{getDateTranslated(createdAt)}</Text>
                </View>
            </View>
        )
    }

    _showCardPublication = (publication) => {
        const { type } = publication;
        let publicationBox;
        switch (type) {
            case 'PostPublication': publicationBox = this._showPostPublication(publication); break;
            case 'VideoPublication': publicationBox = this._showVideoPublication(publication); break;
            case 'PicturePublication': publicationBox = this._showPicturePublication(publication); break;
            default: publicationBox = null; break;
        }
        return (
            <View onLayout={(event) => this.setState({ cardWidth: event.nativeEvent.layout.width })}>
                { publicationBox }
            </View>
        )
    }

    _showCardFooter = (publication) => {
        const { like, commentNumber } = publication;
        return (
            <View style={styles.footerStyle}>
                <TouchableOpacity onPress={() => this._likePublication()} style={{ flexDirection: 'row' }}>
                    {this._displayIconLike()}
                    <Text style={{ marginLeft: 10 }}>{like.likeNumber}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => DeviceEventEmitter.emit('toggleModal', { publication, navigation: this.props.navigation, space: this.props.space })}
                    style={{ flexDirection: 'row' }}>
                    <FontAwesomeIcon icon={faComment} size={20} />
                    <Text style={{ marginLeft: 10 }}>{commentNumber}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const { publication, isLastElem } = this.props;

        return (
            <View style={styles.card(isLastElem, this.state.imageHeight, this.state.textHeight)}>
                { this._showCardHeader(publication)}
                { this._showCardPublication(publication)}
                { this._showCardFooter(publication)}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    card: (isLastElem, imageHeight = 200, textHeight = 0) => ({
        flex: 1,
        height: imageHeight + 120 + textHeight,
        maxHeight: imageHeight + 120 + textHeight,
        overflow: 'hidden',
        margin: 4,
        marginBottom: isLastElem ? 60 : 4,
        borderRadius: 8,
        backgroundColor: "white",
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 10
    }),
    headerStyle: {
        height: 60,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 15,
        alignItems: 'center',
        flexWrap: 'nowrap'
    },
    cardProfileImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
        resizeMode: 'cover',
        marginRight: 7
    },
    cardPostPicture: {
        width: '100%',
        backgroundColor: 'grey',
        position: 'relative'
    },
    cardPostText: {
        padding: 10
    },
    footerStyle: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 15,
        alignItems: 'center'
    },
    container_type: {
        overflow: 'hidden',
        flex: 4
    },
    header_container: {
        position: 'absolute',
        height: 65,
        width: '100%',
        zIndex: 1
    },
    header_info: {
        justifyContent: 'center'
    },
    container_footer: {
        bottom: 0,
        position: 'absolute',
        height: 100,
        width: '100%'
    },
    comment_icon: {
        width: 22,
        height: 19,
        marginHorizontal: 5
    },
    heart_icon: {
        marginLeft: 7
    }
})

const mapStateToProps = state => ({
    FeedPublications: state.FeedPublications,
    ProfilePublications: state.ProfilePublications,
    DiscoverPublications: state.DiscoverPublications,
    MyProfile: state.MyProfile
})

const ActionCreators = Object.assign(
    {},
    PublicationFeedActions,
    ProfilePublicationActions,
    DiscoverdPublicationActions
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(CardNewFeedMasonry)