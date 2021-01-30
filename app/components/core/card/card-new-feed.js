import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import * as PublicationFeedActions from '../../../../redux/FeedPublications/actions'
import * as ProfilePublicationActions from '../../../../redux/ProfilePublications/actions'
import * as DiscoverdPublicationActions from '../../../../redux/DiscoverPublications/actions'
import { bindActionCreators } from 'redux'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlay, faComment } from '@fortawesome/pro-light-svg-icons'
import { faHeart as faHeartEmpty } from '@fortawesome/pro-light-svg-icons'
import { faHeart as faHeartFull } from '@fortawesome/free-solid-svg-icons'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

class CardNewFeed extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            imageHeight: 200
        }
    }

    // to set the size of the picture
    onImageLoaded = (event) => {

        const ratio = ((event.nativeEvent.width / event.nativeEvent.height) * 100)

        switch (true) {
            case ratio <= 70: return this.setState({ imageHeight: ratio * 9 });
            case ratio <= 85: return this.setState({ imageHeight: ratio * 7.5 });
            case ratio <= 100: return this.setState({ imageHeight: ratio * 5 });
            case ratio <= 115: return this.setState({ imageHeight: ratio * 3 });
            case ratio <= 130: return this.setState({ imageHeight: ratio * 2.5 });
            case ratio <= 155: return this.setState({ imageHeight: ratio * 1.8 });
            case ratio <= 180: return this.setState({ imageHeight: ratio * 1.3 });
            case ratio > 180: return this.setState({ imageHeight: ratio * 0.8 });
        }

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
            <TouchableWithoutFeedback // TouchableOpacity
                style={{ height: 400 }}
                onPress={() => this.props.toggleModal({ publication, navigation: this.props.navigation, space: this.props.space })}
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
            </TouchableWithoutFeedback>
        )
    }

    // to select the picture publication view
    _renderPicture(publication) {

        return (
            <TouchableWithoutFeedback // TouchableOpacity
            style={styles.container_type} 
            onPress={() => this.props.toggleModal({ publication, navigation: this.props.navigation, space: this.props.space })}
            >

                <FastImage
                    style={{ flex: 1, width: '100%', height: 400 }}
                    source={{ uri: publication.file, priority: FastImage.priority.normal }}
                    resizeMode={FastImage.resizeMode.cover}
                    onLoad={this.onImageLoaded}
                />

            </TouchableWithoutFeedback>
        )
    }

    // to select the video publication view
    _renderVideo(publication) {

        return (
            <TouchableOpacity style={styles.container_type}
                onPress={() => this.props.toggleModal({ publication, navigation: this.props.navigation, space: this.props.space })}
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

                    <LinearGradient
                        colors={['#00000099', '#0000005c', '#4e4e4e00']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={{ height: '100%', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 25 }}>
                        <TouchableOpacity onPress={() => this._goToProfile(publication.profile._id)}>
                            <FastImage
                                style={{ width: 44, height: 44, borderRadius: 44 / 2, resizeMode: 'cover', marginRight: 15 }}
                                source={{
                                    uri: publication.profile.pictureprofile,
                                    priority: FastImage.priority.normal,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                        </TouchableOpacity>
                        <View style={styles.header_info}>
                            <Text style={{ fontSize: 15, color: 'white', fontWeight: '600' }}>{publication.profile._meta.pseudo}</Text>
                        </View>
                    </LinearGradient>

                </View>
            )
        }

        if (publication.page) {
            return (
                <View style={styles.header_container}>
                    <LinearGradient
                        colors={['#00000099', '#0000005c', '#4e4e4e00']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={{ height: '100%', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 25 }}>
                        <TouchableOpacity onPress={() => this._goToPage(publication.page._id)}>
                            <FastImage
                                style={{ width: 44, height: 44, borderRadius: 44 / 2, resizeMode: 'cover', marginRight: 15 }}
                                source={{
                                    uri: publication.page.pictureprofile,
                                    priority: FastImage.priority.normal,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                        </TouchableOpacity>
                        <View style={styles.header_info}>
                            <Text style={{ fontSize: 15, color: 'white', fontWeight: '600' }}>{publication.page.name}</Text>
                        </View>
                    </LinearGradient>
                    <View style={{ height: '100%', flex: 2 }}>
                    </View>
                </View>
            )
        }




    }

    // to select like icon
    _displayIconLike() {
        if (!this.props.publication.like.isLike) {
            return (<FontAwesomeIcon icon={faHeartEmpty} color={'white'} size={19} />)
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

    // to select the footer card
    _showFooter(publication) {
        return (
            <View style={styles.container_footer}>
                <LinearGradient
                    colors={['#00000099', '#0000005c', '#4e4e4e00']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    style={{ flexDirection: 'row', flex: 1, alignItems: 'center', paddingHorizontal: 25 }}
                >
                    {/*  Stat Container */}
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', flex: 1, paddingTop: 18 }}>
                            <TouchableOpacity
                                onPress={() => this._likePublication()}
                                style={{ flex: 1 }}
                            >
                                <View 
                                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 18, height: 35 }}
                                >
                                    {this._displayIconLike()}
                                    <Text style={{ marginLeft: 8, fontSize: 15, color: 'white', fontFamily: 'Avenir-Book', fontWeight: '700' }}>{publication.like.likeNumber}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.props.toggleModal({ publication, navigation: this.props.navigation, space: this.props.space })}
                                style={{ flex: 1 }}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 35 }}>
                                    <FontAwesomeIcon icon={faComment} color={'white'} size={19} style={{ opacity: 0.9 }} />
                                    <Text style={{ marginLeft: 8, fontSize: 15, color: 'white', fontFamily: 'Avenir-Book', fontWeight: '700' }}>{publication.commentNumber}</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ flex: 3 }} />
                        </View>
                    </View>
                </LinearGradient>
            </View>
        )
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

    render() {
        const { publication } = this.props
        const { index } = this.props

        return (
            <View style={[styles.card, this.cardMoveOn(index)]}>
                {this._showTypePublication(publication)}
                {this._showHeader(publication)}
                {this._showFooter(publication)}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        overflow: 'hidden',
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

export default connect(mapStateToProps, mapDispatchToProps)(CardNewFeed)