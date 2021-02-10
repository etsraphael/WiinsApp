import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../../../redux/MyUser/actions'
import * as CommentListActions from '../../../../redux/CommentList/actions'
import { bindActionCreators } from 'redux'
import FastImage from 'react-native-fast-image'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faShare, faDownload, faCommentLines, faCheck } from '@fortawesome/pro-light-svg-icons'
import { faCircle } from '@fortawesome/pro-solid-svg-icons'
import * as TubePageActions from '../../../../redux/TubePage/actions'
import { getDateTranslated } from '../../../services/translation/translation-service'
import VideoPlayer from '../../core/reusable/video/video-player'
import LinearGradient from 'react-native-linear-gradient'
import { faHeart as faHeartEmpty } from '@fortawesome/pro-light-svg-icons'
import { faHeart as faHeartFull } from '@fortawesome/free-solid-svg-icons'
import CommentListModal from './../../core/modal/comment-list-modal'
import { cacheOneTube } from './../../../services/cache/cache-tube-service'
import Clipboard from '@react-native-community/clipboard'
import Snackbar from 'react-native-snackbar'
import I18n from '../../../i18n/i18n'

class TubePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            commentVisible: false,
            videoReady: false
        }
    }

    testValue = [
        { id: "sdlfijsdfoij", tube: { posterLink: "https://i.pinimg.com/236x/c7/a1/b8/c7a1b863aeba4b9a409b61ad7201924b.jpg", profile: { _meta: { pseudo: "Best locations to visit in LONDON" }, pictureprofile: "" } } },
        { id: "sdfkjndsfbjkn", tube: { posterLink: "https://images.unsplash.com/photo-1612286350087-116a6b734781?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80", profile: { _meta: { pseudo: "VLOG - Our trip tp NEWYORK!" }, pictureprofile: "" } } },
        { id: "sfijfgbgnvelfg", tube: { posterLink: "https://images.unsplash.com/photo-1610939978022-8f73236f5953?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=934&q=80", profile: { _meta: { pseudo: "Most Commonly visited places" }, pictureprofile: "" } } },
        { id: "fgpiojfgoifegh", tube: { posterLink: "https://images.unsplash.com/photo-1512552288940-3a300922a275?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8dmFjYXRpb258ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", profile: { _meta: { pseudo: "Beautify locations to spend your vacation" }, pictureprofile: "" } } },
        { id: "egiojergoefgi", tube: { posterLink: "https://images.unsplash.com/photo-1528277342758-f1d7613953a2?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTN8fGFmcmljYXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", profile: { _meta: { pseudo: "AFRICA the world wonder" }, pictureprofile: "" } } }
    ]

    _copyToClipboard = () => {
        Clipboard.setString(`https://www.wiins.io/SpaceTube/watching-video/${this.props.TubePage.tube._id}`)
        return Snackbar.show({ text: I18n.t('CORE.Url-Copied'), duration: Snackbar.LENGTH_LONG })
    }

    _toggleComment = () => {
        if (this.state.commentVisible == true) {
            this.setState({ commentVisible: false })

        } else {
            // this.props.actions.getCommentListPublication(this.props.publicationModal.publication.id, 1)
            this.setState({ commentVisible: true })
        }
    }

    UNSAFE_componentWillMount = () => {
        this.uploadPageTube(this.props.screenProps.rootNavigation.state.params.tubeId)
    }

    _likeTube = () => {
        if (!this.props.TubePage.tube.isLiked) { this.props.actions.likeTubePageActions(this.props.TubePage.tube._id) }
        else { this.props.actions.dislikeTubePageActions(this.props.TubePage.tube._id) }
    }

    _displayIconLike = () => {
        if (!this.props.TubePage.tube.isLiked) {
            return (<FontAwesomeIcon icon={faHeartEmpty} color={'#77838F'} size={20} />)
        }
        else {
            return (<FontAwesomeIcon icon={faHeartFull} color={'red'} size={20} />)
        }
    }

    uploadPageTube = (id) => {
        this.setState({ videoReady: false })
        this.props.actions.getTubePageActions(id)
    }

    _displayBtnSubscribe = (relation) => {
        switch (relation) {
            case 'friend': return (
                <TouchableOpacity style={{ marginHorizontal: 5, marginVertical: 5, backgroundColor: '#e8e8e882', justifyContent: 'center', alignItems: 'center', borderRadius: 5, padding: 10 }}>
                    <Text style={{ fontSize: 15 }}>{I18n.t('CORE.Friend')}</Text>
                </TouchableOpacity>
            )
            case 'following': return (
                <TouchableOpacity style={{ marginHorizontal: 5, marginVertical: 5, backgroundColor: '#e8e8e882', justifyContent: 'center', alignItems: 'center', borderRadius: 5, padding: 10 }}>
                    <Text style={{ fontSize: 15 }}>{I18n.t('CORE.Subscribed')}</Text>
                </TouchableOpacity>
            )
            default: return (
                <TouchableOpacity onPress={() => this.props.actions.followInTubePageActions(this.props.TubePage.tube.profile._id)}
                    style={{ marginHorizontal: 5, marginVertical: 5, backgroundColor: '#e8e8e882', justifyContent: 'center', alignItems: 'center', borderRadius: 5, padding: 10 }}>
                    <Text style={{ fontSize: 15 }}>{I18n.t('CORE.Follow')}</Text>
                </TouchableOpacity>
            )
        }
    }

    _displayBtnDownload = () => {
        switch (true) {
            case this.props.TubePage.tube.inCache: {
                return (
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={faCheck} size={20} color="#77838F" />
                        <Text style={{ color: "#77838F", fontSize: 13, paddingTop: 4 }}>{I18n.t('CORE.Downloaded')}</Text>
                    </TouchableOpacity>
                )
            }
            case this.props.TubePage.progressDownload > 0.1: {
                return (
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => cacheOneTube(this.props.TubePage.tube, this.props.actions)}>
                        <FontAwesomeIcon icon={faDownload} size={20} color="#77838F" />
                        <Text style={{ color: "#77838F", fontSize: 13, paddingTop: 4 }}>{this.props.TubePage.progressDownload} %</Text>
                    </TouchableOpacity>
                )
            }
            default: {
                return (
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => cacheOneTube(this.props.TubePage.tube, this.props.actions)}>
                        <FontAwesomeIcon icon={faDownload} size={20} color="#77838F" />
                        <Text style={{ color: "#77838F", fontSize: 13, paddingTop: 4 }}>{I18n.t('CORE.Download')}</Text>
                    </TouchableOpacity>
                )
            }
        }
    }

    _subHeader = () => {
        return (
            <View>

                {/* Title */}
                <View style={{ paddingHorizontal: 25, paddingTop: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontFamily: 'Avenir-Heavy', fontSize: 19, paddingBottom: 10 }}>{this.props.TubePage.tube.name}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text>{this.props.TubePage.tube.totalView} {I18n.t('CORE.views')}</Text>
                        <FontAwesomeIcon style={{ marginHorizontal: 5 }} icon={faCircle} size={2} color="#77838F" />
                        <Text>{getDateTranslated(this.props.TubePage.tube.createdAt)}</Text>
                    </View>
                </View>

                {/* Buttons */}
                <View style={{ flexDirection: 'row', marginVertical: 15 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        {this._displayBtnDownload()}
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => this._copyToClipboard()}>
                            <FontAwesomeIcon icon={faShare} size={20} color="#77838F" />
                            <Text style={{ color: "#77838F", fontSize: 13, paddingTop: 4 }}>{I18n.t('CORE.Share')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => this._toggleComment()}>
                            <FontAwesomeIcon icon={faCommentLines} size={20} color="#77838F" />
                            <Text style={{ color: "#77838F", fontSize: 13, paddingTop: 4 }}>{I18n.t('CORE.Comment')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => this._likeTube()}>
                            {this._displayIconLike()}
                            <Text style={{ color: "#77838F", fontSize: 13, paddingTop: 4 }}>{this.props.TubePage.tube.totalLike}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ height: 1, width: '100%', backgroundColor: '#e7ebed' }} />

                {/* Profile */}
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}>
                    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                        <FastImage
                            style={{ width: 45, height: 45, borderRadius: 45 }}
                            resizeMode={FastImage.resizeMode.cover}
                            source={{ uri: this.props.TubePage.tube.profile.pictureprofile, priority: FastImage.priority.normal }}
                        />
                    </View>
                    <View style={{ flex: 9, paddingLeft: 15 }}>
                        <Text style={{ fontWeight: 'bold', fontFamily: 'Avenir-Heavy', fontSize: 19 }}>{this.props.TubePage.tube.profile._meta.pseudo}</Text>
                        <Text>{I18n.t('CORE.Community')}: {this.props.TubePage.tube.profile.communityTotal}</Text>
                    </View>
                    <View style={{ flex: 5, alignItems: 'center' }}>
                        {this._displayBtnSubscribe(this.props.TubePage.tube.relation)}
                    </View>
                </View>

                <View style={{ height: 1, width: '100%', backgroundColor: '#e7ebed' }} />

            </View>)
    }

    // to display the header view
    _headerRender = () => {
        return (<View style={styles.videoSection}>
            <VideoPlayer src={this.props.TubePage.tube.videoLink} posterSrc={this.props.TubePage.tube.posterLink} />
        </View>)
    }

    _playNextSection = (tubeList = this.testValue, title, line) => {

        if (!tubeList || tubeList.length == 0) return null

        return (
            <View style={styles.container_section}>

                {/* Header */}
                <View style={{ paddingHorizontal: 25, paddingTop: 15 }}>
                    <View style={{ flexWrap: 'wrap' }}>
                        <Text style={{ fontSize: 22, fontFamily: 'Avenir-Heavy', letterSpacing: 1, color: '#1E2432', paddingHorizontal: 5 }}>{title}</Text>
                        <View>
                            <LinearGradient colors={['#31B3D8', '#784BEA']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ height: 3, width: '100%', borderRadius: 35 }} />
                        </View>
                    </View>
                </View>

                {/* Video List */}
                {this._showTubeList(tubeList)}

                {/* Line Separator */}
                {line ? this._lineSeparator() : null}

            </View>
        )
    }

    // to display some tubes suggestions
    _suggestionTubeRender = () => {
        return (
            <ScrollView style={{ height: '100%', marginBottom: 50 }}>
                {this._subHeader()}
                {/* Others videos */}
                {this._playNextSection(this.props.TubePage.tubesFollower, 'Play next', { value: this.props.TubePage.tube.profile._meta.pseudo }, true)}
                {this._tubeListBySection(this.props.TubePage.tubesSuggestions, 'Suggestion', false)}
            </ScrollView>
        )
    }

    // to display a separator line
    _lineSeparator = () => {
        return (<View style={{ height: 5, backgroundColor: '#f3f3f6' }} />)
    }

    // to display some tube by section
    _tubeListBySection = (tubeList = this.testValue, title, line) => {

        if (!tubeList || tubeList.length == 0) return null

        return (
            <View style={styles.container_section}>

                {/* Header */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 25, paddingTop: 15, alignItems: 'center' }}>
                    <View style={{ flexWrap: 'wrap' }}>
                        <Text style={{ fontSize: 22, fontFamily: 'Avenir-Heavy', letterSpacing: 1, color: '#1E2432', paddingHorizontal: 5 }}>{title}</Text>
                        <View>
                            <LinearGradient colors={['#31B3D8', '#784BEA']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ height: 3, width: '100%' }} />
                        </View>
                    </View>
                    <View>
                        <Text style={{ fontWeight: '400', fontSize: 15, fontFamily: 'Avenir-Heavy', color: '#FF2D55' }}>{I18n.t('CORE.Show-more')}</Text>
                    </View>
                </View>

                {/* Video List */}
                {this._showTubeList(tubeList)}

                {/* Line Separator */}
                {line ? this._lineSeparator() : null}

            </View>
        )
    }

    // to display a miniature tube
    _oneTubeRender = (item) => {
        return (
            <TouchableOpacity
                onPress={() => this.uploadPageTube(item.tube._id)}
                style={styles.oneTubeContainer}
            >

                {/* Background Image */}
                <FastImage
                    style={styles.oneTubeImage} resizeMode={FastImage.resizeMode.cover}
                    source={{ uri: item.tube.posterLink, priority: FastImage.priority.normal }}
                />
                <View style={{ paddingVertical: 10 }}>
                    <Text style={styles.greyText}>{item.tube.profile._meta.pseudo}</Text>
                </View>

            </TouchableOpacity>
        )

    }

    // to displau the tube list
    _showTubeList = (tubeList) => {
        return (
            <View style={{ paddingBottom: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 7, paddingLeft: 19 }}
                        data={tubeList}
                        keyExtractor={(item, index) => `${item.id.toString()}-${index}`}
                        renderItem={({ item }) => this._oneTubeRender(item)}
                    />
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.main_container}>
                {this.props.TubePage.isLoading ? null :
                    <View style={{ flex: 1 }}>
                        {/* Header */}
                        {this._headerRender()}
                        {/* Body */}
                        {this._suggestionTubeRender()}
                        {/* Comment */}
                        {this.state.commentVisible ?
                            <CommentListModal
                                closeModal={() => this._toggleComment()}
                                _activePropagateSwipe={this._activePropagateSwipe}
                                _inactivePropagateSwipe={this._inactivePropagateSwipe}
                            />
                            : null}
                    </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: 'white'
    },
    container_section: {
        backgroundColor: 'white'
    },
    oneTubeContainer: {
        marginHorizontal: 10,
        marginVertical: 15,
        width: 160
    },
    oneTubeImage: {
        borderRadius: 5,
        height: 110,
        width: '100%',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    greyText: {
        color: '#77838F',
        fontSize: 14,
        fontFamily: 'Avenir-Heavy'
    },
    videoSection: {
        height: 250,
        width: '100%',
        position: 'relative'
    },
    overlay: {
        ...StyleSheet.absoluteFillObject
    }
})

const mapStateToProps = state => ({
    MyUser: state.MyUser,
    TubePage: state.TubePage
})

const ActionCreators = Object.assign(
    {},
    MyUserActions,
    TubePageActions,
    CommentListActions
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(TubePage)