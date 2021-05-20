import React, { PureComponent } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import * as PublicationFeedActions from '../../../../redux/FeedPublications/actions'
import * as ProfilePublicationActions from '../../../../redux/ProfilePublications/actions'
import * as DiscoverdPublicationActions from '../../../../redux/DiscoverPublications/actions'
import * as PublicationInModalActions from '../../../../redux/PublicationInModal/actions'
import { bindActionCreators } from 'redux'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlay, faCommentLines } from '@fortawesome/pro-light-svg-icons'
import { faHeart as faHeartEmpty } from '@fortawesome/pro-light-svg-icons'
import { faHeart as faHeartFull } from '@fortawesome/free-solid-svg-icons'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { faEllipsisV } from '@fortawesome/pro-solid-svg-icons'
import reducer from '../../../../redux/MyUser/reducer'
import { AppTheme } from '../utility/theme-util'
import GradientBorderCircle from '../misc/gradient-border'

class CardNewFeed extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            imageHeight: 200,
            cardWidth: Dimensions.get('window').width - 30
        }
    }

    // to set the size of the picture
    onImageLoaded = (event) => {
        const { width, height } = event.nativeEvent;
        const ratio = this.state.cardWidth / width;
        const ratioHeight = height * ratio;
        this.setState({ imageHeight: ratioHeight > 400 ? 400 : ratioHeight < 250 ? 250 : ratioHeight });
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
            <TouchableWithoutFeedback
                style={{ paddingHorizontal: 15, paddingTop: 15, paddingBottom: 5, minHeight: 150 }}
                onPress={() => this.props.actions.putPublicationInModalActions(publication, 'feed')}
            >
                <LinearGradient
                    colors={background}
                    start={orientation[0]}
                    end={orientation[1]}
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 15, overflow: 'hidden' }}
                >
                    <Text style={{
                        paddingBottom: 10,
                        paddingHorizontal: 15,
                        lineHeight: 45,
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
            </TouchableWithoutFeedback>
        )
    }

    // to select the picture publication view
    _renderPicture(publication) {
        return (
            <TouchableWithoutFeedback
                style={[styles.container_type, { paddingHorizontal: 15, paddingTop: 15, paddingBottom: 5 }]}
                onPress={() => this.props.actions.putPublicationInModalActions(publication, 'feed')}
            >
                <View style={styles.container_render_picture}
                    onLayout={(event) => { this.setState({ cardWidth: event.nativeEvent.layout.width }) }}
                >
                    <FastImage
                        style={{ flex: 1, width: '100%', height: this.state.imageHeight || 400, borderRadius: 15 }}
                        source={{ uri: publication.file, priority: FastImage.priority.normal }}
                        resizeMode={FastImage.resizeMode.cover}
                        onLoad={this.onImageLoaded}
                    />

                </View>

            </TouchableWithoutFeedback>
        )
    }

    // to select the video publication view
    _renderVideo(publication) {

        return (
            <TouchableOpacity
                style={[styles.container_type, { paddingHorizontal: 15, paddingTop: 15, paddingBottom: 5 }]}
                onPress={() => this.props.actions.putPublicationInModalActions(publication, 'feed')}
            >
                <View style={styles.container_render_picture} >
                    <FastImage
                        style={{ flex: 1, width: '100%', height: 400, borderRadius: 15 }}
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

    // to select the header card
    _showHeader(publication) {

        if (publication.profile) {
            return (
                <View style={styles.header_container}>
                    <View
                        style={{ height: '100%', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, width: '100%' }}
                    >
                        <TouchableOpacity onPress={() => this._goToProfile(publication.profile._id)} style={{ flexDirection: 'row', flex: 9 }}>
                            <GradientBorderCircle size={41} style={{ marginRight: 10 }} padding={5}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <FastImage
                                        style={{ width: '100%', height: '100%', borderRadius: 44 / 2, resizeMode: 'cover' }}
                                        source={{
                                            uri: publication.profile.pictureprofile,
                                            priority: FastImage.priority.normal,
                                        }}
                                        resizeMode={FastImage.resizeMode.cover}
                                    />
                                </View>
                            </GradientBorderCircle>
                            <View style={styles.header_info}>
                                <Text style={{ fontSize: 15, fontWeight: '600' }}>{publication.profile._meta.pseudo}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity onPress={() => this.props.toggleReportModal()}>
                                <FontAwesomeIcon icon={faEllipsisV} color={'grey'} size={19} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        }

        if (publication.page) {
            return (
                <View style={styles.header_container}>
                    <View style={{ height: '100%', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, width: '100%' }}>
                        <TouchableOpacity onPress={() => this._goToPage(publication.page._id)} style={{ flexDirection: 'row', flex: 9 }}>
                            <FastImage
                                style={{ width: 44, height: 44, borderRadius: 44 / 2, resizeMode: 'cover', marginRight: 15 }}
                                source={{
                                    uri: publication.page.pictureprofile,
                                    priority: FastImage.priority.normal,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                            <View style={styles.header_info}>
                                <Text style={{ fontSize: 15, fontWeight: '600' }}>{publication.page.name}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity>
                                <FontAwesomeIcon icon={faEllipsisV} color={'grey'} size={19} />
                            </TouchableOpacity>
                        </View>
                </View>
                </View>            

            )
        }
    }

    // to select like icon
    _displayIconLike() {
        if (!this.props.publication.like.isLike) {
            return (<FontAwesomeIcon icon={faHeartEmpty} color={'#5C5C5C'} size={25} />)
        }
        else {
            return (<FontAwesomeIcon icon={faHeartFull} color={'red'} size={25} />)
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

    // to select the footer card
    _showFooter(publication) {
        return (
            <View style={styles.container_footer}>
                <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                    {/*  Stat Container */}
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <TouchableOpacity
                                onPress={() => this._likePublication()}
                                style={{ flex: 1 }}
                            >
                                <View
                                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 18, height: 35 }}
                                >
                                    {this._displayIconLike()}
                                    <Text style={{ marginLeft: 8, fontSize: 16, color: '#5C5C5C', fontFamily: 'Avenir-Book', fontWeight: '700' }}>{publication.like.likeNumber}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.props.actions.putPublicationInModalActions(publication, 'feed')}
                                style={{ flex: 1 }}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 35 }}>
                                    <FontAwesomeIcon icon={faCommentLines} color={'#5C5C5C' /* #575EDD */} size={25} />
                                    <Text style={{ marginLeft: 8, fontSize: 16, color: '#5C5C5C', fontFamily: 'Avenir-Book', fontWeight: '700' }}>{publication.commentNumber}</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ flex: 3 }} />
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        const { publication } = this.props

        return (
            <View style={
                [styles.card], 
                {
                    ...(this.props.lastIndex ? { marginBottom: 50 } : { marginBottom: 0, borderBottomColor: '#cecece', borderBottomWidth: 1 })
                    , marginTop: this.props.index === 0 ? 20 : 0  
                }
            }>
                {this._showHeader(publication)}
                {this._showTypePublication(publication)}
                {this._showFooter(publication)}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    card: {
        flex: 1,
    },
    container_type: {
        overflow: 'hidden',
        flex: 4
    },
    header_container: {
        width: '100%',
        paddingTop: 25,
        zIndex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    header_info: {
        justifyContent: 'center'
    },
    container_footer: {
        width: '100%',
        marginBottom: 25,
        paddingHorizontal: 15
    },
    comment_icon: {
        width: 22,
        height: 19,
        marginHorizontal: 5
    },
    heart_icon: {
        marginLeft: 7
    },
    container_render_picture: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
        borderRadius: 15
    }
})

const mapStateToProps = state => ({
    FeedPublications: state.FeedPublications,
    ProfilePublications: state.ProfilePublications,
    DiscoverPublications: state.DiscoverPublications,
    PublicationsInModal: state.PublicationsInModal,
    MyProfile: state.MyProfile
})

const ActionCreators = Object.assign(
    {},
    PublicationFeedActions,
    ProfilePublicationActions,
    DiscoverdPublicationActions,
    PublicationInModalActions
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(CardNewFeed)