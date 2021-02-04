import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ScrollView, TextInput } from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../../../redux/MyUser/actions'
import { bindActionCreators } from 'redux'
import FastImage from 'react-native-fast-image'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleDown, faPaperPlane, faHeart, faShare, faDownload, faSave, faCommentLines } from '@fortawesome/pro-light-svg-icons'
import { faCircle } from '@fortawesome/pro-solid-svg-icons'
import * as TubePageActions from '../../../../redux/TubePage/actions'
import { getDateTranslated } from '../../../services/translation/translation-service'
import VideoPlayer from '../../core/reusable/video/video-player'
import LinearGradient from 'react-native-linear-gradient'

class TubePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            commentView: false,
            videoReady: false
        }
    }

    testValue = [
        { id: "", tube: { posterLink: "https://i.pinimg.com/236x/c7/a1/b8/c7a1b863aeba4b9a409b61ad7201924b.jpg", profile: { _meta: { pseudo: "Best locations to visit in LONDON" }, pictureprofile: "" } } },
        { id: "", tube: { posterLink: "https://images.unsplash.com/photo-1612286350087-116a6b734781?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80", profile: { _meta: { pseudo: "VLOG - Our trip tp NEWYORK!" }, pictureprofile: "" } } },
        { id: "", tube: { posterLink: "https://images.unsplash.com/photo-1610939978022-8f73236f5953?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=934&q=80", profile: { _meta: { pseudo: "Most Commonly visited places" }, pictureprofile: "" } } },
        { id: "", tube: { posterLink: "https://images.unsplash.com/photo-1512552288940-3a300922a275?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8dmFjYXRpb258ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", profile: { _meta: { pseudo: "Beautify locations to spend your vacation" }, pictureprofile: "" } } },
        { id: "", tube: { posterLink: "https://images.unsplash.com/photo-1528277342758-f1d7613953a2?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTN8fGFmcmljYXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", profile: { _meta: { pseudo: "AFRICA the world wonder" }, pictureprofile: "" } } }
    ]

    UNSAFE_componentWillMount = () => {
        this.uploadPageTube(this.props.screenProps.rootNavigation.state.params.tubeId)
    }

    // to upload the page of the tube
    uploadPageTube = (id) => {
        this.setState({ videoReady: false })
        this.props.actions.getTubePageActions(id)
    }

    _subHeader = () => {
        return (
            <View>

                {/* Title */}
                <View style={{ paddingHorizontal: 25, paddingTop: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontFamily: 'Avenir-Heavy', fontSize: 19, paddingBottom: 10 }}>{this.props.TubePage.tube.name}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* for the next update */}
                        {/* <Text>4.7K Views</Text>
                        <FontAwesomeIcon style={{ marginHorizontal: 5 }} icon={faCircle} size={2} color="#77838F" /> */}
                        <Text>{getDateTranslated(this.props.TubePage.tube.createdAt)}</Text>
                    </View>
                </View>

                {/* Buttons */}
                <View style={{ flexDirection: 'row', marginVertical: 15 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <FontAwesomeIcon icon={faDownload} size={20} color="#77838F" />
                            <Text style={{ color: "#77838F", fontSize: 13, paddingTop: 4 }}>Download</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <FontAwesomeIcon icon={faShare} size={20} color="#77838F" />
                            <Text style={{ color: "#77838F", fontSize: 13, paddingTop: 4 }}>Share</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <FontAwesomeIcon icon={faCommentLines} size={20} color="#77838F" />
                            <Text style={{ color: "#77838F", fontSize: 13, paddingTop: 4 }}>Comment</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <FontAwesomeIcon icon={faHeart} size={20} color="#77838F" />
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
                        <Text>Community: 4.5k</Text>
                    </View>

                    <View style={{flex: 5, alignItems: 'center'}}>
                        <TouchableOpacity style={{marginHorizontal: 5, marginVertical: 5, backgroundColor: '#e8e8e882', justifyContent: 'center', alignItems: 'center', borderRadius: 5, padding: 10 }}>
                            <Text style={{fontSize: 15}}>Subscribed</Text>
                        </TouchableOpacity>
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

    // to display the comment view
    _commentView = () => {
        return (
            <View style={{ position: 'absolute', backgroundColor: '#00000082', height: '100%', width: '100%', paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() + 15 : 0, paddingHorizontal: 15 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => this.setState({ commentView: false })}>
                        <FontAwesomeIcon icon={faAngleDown} color={'white'} size={32} />
                    </TouchableOpacity>
                </View>
                {/* <CommentList type={'tube'} /> */}
                <View style={{ flexDirection: 'row', height: 39, marginBottom: 15 }}>
                    <TextInput
                        placeholder={I18n.t('FEED-PUBLICATION.Write-a-comment')}
                        placeholderTextColor="#FFFFFF"
                        style={{ flex: 9, paddingLeft: 15, color: 'grey', backgroundColor: '#485164', borderRadius: 17, height: '100%' }}
                    ></TextInput>
                    <TouchableOpacity
                        style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={faPaperPlane} color={'white'} size={28} />
                    </TouchableOpacity>
                </View>
            </View>
        )
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
                        <Text style={{ fontWeight: '400', fontSize: 15, fontFamily: 'Avenir-Heavy', color: '#FF2D55' }}>See All</Text>
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
                        {this.state.commentView ? this._commentView() : null}
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
    TubePageActions
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(TubePage)