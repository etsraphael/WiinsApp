import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, DeviceEventEmitter, FlatList } from 'react-native'
import { connect } from 'react-redux'
import * as PublicationFeedActions from '../../../redux/FeedPublications/actions'
import * as ProfilePublicationActions from '../../../redux/ProfilePublications/actions'
import * as DiscoverdPublicationActions from '../../../redux/DiscoverPublications/actions'
import { bindActionCreators } from 'redux'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { getDateTranslated } from '../../services/translation/translation-service'

class PublicationStandard extends React.Component {

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
            case ratio <= 75: this.setState({ imageHeight: ratio * 4 }); break;
            case ratio <= 90: this.setState({ imageHeight: ratio * 3 }); break;
            case ratio <= 110: this.setState({ imageHeight: ratio * 2 }); break;
            case ratio > 120: this.setState({ imageHeight: ratio * 1 }); break;
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
            <TouchableOpacity style={styles.container_type}
                onPress={() => DeviceEventEmitter.emit('toggleModal', { publication, navigation: this.props.navigation, space: this.props.space })}
            >
                <LinearGradient colors={background} start={orientation[0]} end={orientation[1]} style={{ flex: 1 }}>
                    <Text style={{
                        paddingTop: 15,
                        paddingBottom: 10,
                        paddingHorizontal: 15,
                        lineHeight: 25,
                        fontWeight: '400',
                        fontSize: 19,
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
            <TouchableOpacity style={styles.container_type}
                onPress={() => DeviceEventEmitter.emit('toggleModal', { publication, navigation: this.props.navigation, space: this.props.space })}
            >
                <FastImage
                    style={{ flex: 1, width: '100%', height: this.state.imageHeight }}
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
            case 'PostPublication': return this._renderPost(publication)
            case 'PicturePublication': return this._renderPicture(publication)
            case 'PublicationVideo': return this._renderVideo(publication)
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

                    <View style={{ height: '100%', flexDirection: 'row', flex: 2 }}>
                        <TouchableOpacity onPress={() => this._goToProfile(publication.profile._id)}>
                            <FastImage
                                style={{ width: 44, height: 44, borderRadius: 44 / 2, resizeMode: 'cover', marginRight: 15, borderColor: 'white', borderWidth: 2 }}
                                source={{
                                    uri: publication.profile.pictureprofile,
                                    priority: FastImage.priority.normal,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                        </TouchableOpacity>
                        <View style={styles.header_info}>
                            <Text style={{ fontSize: 13, color: '#3F3F3F', fontWeight: '600' }}>{publication.profile._meta.pseudo}</Text>
                            <Text style={{ fontSize: 13, color: '#4E586E' }}>{getDateTranslated(publication.createdAt)}</Text>
                        </View>
                    </View>

                    <View style={{ height: '100%', flex: 2 }}>
                    </View>
                </View>
            )
        }

        if (publication.page) {
            return (
                <View style={styles.header_container}>
                    <View style={{ height: '100%', flexDirection: 'row', flex: 2 }}>
                        <TouchableOpacity onPress={() => this._goToPage(publication.page._id)}>
                            <FastImage
                                style={{ width: 44, height: 44, borderRadius: 44 / 2, resizeMode: 'cover', marginRight: 15, borderColor: 'white', borderWidth: 2 }}
                                source={{
                                    uri: publication.page.pictureprofile,
                                    priority: FastImage.priority.normal,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                        </TouchableOpacity>
                        <View style={styles.header_info}>
                            <Text style={{ fontSize: 13, color: '#3F3F3F', fontWeight: '600' }}>{publication.page.name}</Text>
                            <Text style={{ fontSize: 13, color: '#4E586E' }}>{getDateTranslated(publication.createdAt)}</Text>
                        </View>
                    </View>
                    <View style={{ height: '100%', flex: 2 }}>
                    </View>
                </View>
            )
        }




    }

    // to select like icon
    _getIconLike() {
        if (!this.props.publication.like.isLike) return require('../../../assets/image/icon/heart-icon.png')
        else return require('../../../assets/image/icon/heart-icon-active.png')
    }

    // to like a publication
    _likePublication = () => {

        if (!this.props.publication.like.isLike) {
            let like

            // if it's a profile
            if (this.props.publication.profile) {
                like = {
                    publicationProfile: this.props.publication.profile._id,
                    type: 'publication',
                    publicationId: this.props.publication._id,
                    ownerType: 'profile',
                    hastags: this.props.publication.hastags
                }
            }
            // if it's a page
            else {
                like = {
                    publicationProfile: this.props.publication.page._id,
                    type: 'publication',
                    publicationId: this.props.publication._id,
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

                {/* Description Container */}

                {publication.hastags.length > 0 ?
                    <View style={{ flex: 1, paddingHorizontal: 15, marginBottom: 15 }}>

                        {/* Hastag List */}
                        <FlatList
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            style={{ flexDirection: 'row', flexWrap: 'wrap' }}
                            data={publication.hastags}
                            keyExtractor={(item) => item.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity>
                                    <Text style={{ fontSize: 15, fontFamily: 'Avenir-Book', color: '#F54B64', paddingRight: 4 }}>#{item}</Text>
                                </TouchableOpacity>
                            )}
                        />


                        {/* Description */}
                        {!!publication.text && publication.type !== 'PostPublication' ?
                            <View>
                                <Text style={{ color: '#3F3F3F', fontSize: 15, lineHeight: 20 }}>{publication.text}</Text>
                            </View>
                            : null}


                    </View>
                    : null}

                {/*  Stat Container */}
                <View style={{ flex: 1, paddingLeft: 25, alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', flex: 1, paddingRight: 15 }}>
                        <TouchableOpacity
                            onPress={() => DeviceEventEmitter.emit('toggleModal', { publication, navigation: this.props.navigation, space: this.props.space })}
                            style={{ flexDirection: 'row', flex: 1, justifyContent: 'center' }}
                        >
                            <Image style={styles.comment_icon} source={require('../../../assets/image/icon/comment-icon.png')} />
                            <Text style={{ marginLeft: 8, fontSize: 15, color: '#5D5D5D', fontFamily: 'Avenir-Book', fontWeight: '700' }}>{publication.commentNumber}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => this._likePublication()}>
                            <Image style={styles.heart_icon} source={this._getIconLike()} />
                            <Text style={{ marginLeft: 8, fontSize: 15, color: '#5D5D5D', fontFamily: 'Avenir-Book', fontWeight: '700' }}>{publication.like.likeNumber}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        )
    }

    render() {
        const { publication } = this.props
        return (
            <View style={styles.card}>
                {this._showHeader(publication)}
                {this._showTypePublication(publication)}
                {this._showFooter(publication)}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        marginVertical: 5,
        marginHorizontal: 4,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flex: 1,
    },
    container_type: {
        overflow: 'hidden',
        flex: 4
    },
    header_container: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: 'row'
    },
    header_info: {
        justifyContent: 'center'
    },
    container_footer: {
        flex: 1,
        paddingVertical: 13
    },
    comment_icon: {
        width: 22,
        height: 19,
        marginHorizontal: 5,

    },
    heart_icon: {
        marginLeft: 7
    }
})

const mapStateToProps = state => ({
    PublicationFeed: state.PublicationFeed,
    publicationProfile: state.publicationProfile,
    DiscoverPublication: state.DiscoverPublication,
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

export default connect(mapStateToProps, mapDispatchToProps)(PublicationStandard)