import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ScrollView, TextInput, Image, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../../../redux/MyUser/actions'
import { bindActionCreators } from 'redux'
import FastImage from 'react-native-fast-image'
import CommentList from '../../core/comment-list'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleDown, faPaperPlane, faPause, faPlay, faThumbsUp } from '@fortawesome/pro-light-svg-icons'
import * as TubePageActions from '../../../../redux/TubePage/actions'
import { getDateTranslated } from '../../../services/translation/translation-service'
import VideoPlayer from '../../core/reusable/video/video-player'

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
        { id: "", tube: { posterLink: "https://unsplash.com/photos/UzZhBohuFXo", profile: { _meta: { pseudo: "VLOG - Our trip tp NEWYORK!" }, pictureprofile: "" } } },
        { id: "", tube: { posterLink: "https://unsplash.com/photos/_6zo6Qo-iVo", profile: { _meta: { pseudo: "Most Commonly visited places" }, pictureprofile: "" } } },
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

    // to display the header view
    _headerRender = () => {
        return (
            <View>
                {/* Video section */}
                <View style={styles.videoSection}>
                    <VideoPlayer src={this.props.TubePage.tube.videoLink} posterSrc={this.props.TubePage.tube.posterLink} />
                </View>

                {/* Profile */}
                <View style={{ height: 70, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15 }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ marginEnd: 15 }}>
                            <FastImage
                                style={{ width: 45, height: 45, borderRadius: 45, borderWidth: 2, borderColor: '#df0ddf' }}
                                resizeMode={FastImage.resizeMode.cover}
                                source={{ uri: this.props.TubePage.tube.profile.pictureprofile, priority: FastImage.priority.normal }}
                            />
                        </View>
                        <View style={{ }}>
                            <Text style={{ fontWeight: 'bold', fontFamily: 'Avenir-Heavy' }}>{this.props.TubePage.tube.name}</Text>
                            <Text>{getDateTranslated(this.props.TubePage.tube.createdAt)} </Text>
                        </View>
                    </View>
                    <View style={{ }}>
                        {/* <LinearGradient
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 0 }}
                            colors={['#3C349B', '#8E46DF']}
                            style={{ borderRadius: 25, position: 'relative', bottom: 3, marginHorizontal: 5 }}
                        >
                            <TouchableOpacity>
                                <Text style={{ textAlign: 'center', paddingVertical: 12, paddingHorizontal: 15, fontWeight: '700', color: 'white' }}>Follow</Text>
                            </TouchableOpacity>
                        </LinearGradient> */}
                        <FontAwesomeIcon icon={faThumbsUp} size={20} color="#77838F" />
                        <Text style={{ color: "#77838F", marginTop: 5 }}>{ this.props.TubePage.tube.totalLike }</Text>
                    </View>
                </View>
            </View>
        )
    }

    // to display the title and description
    _titleRender = () => {
        return (
            <View style={{ paddingHorizontal: 15, paddingTop: 15 }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{ 'Best places in NEW YORK!' }</Text>
                <Text style={{ fontSize: 14, marginTop: 5 }}>{ 'Discover the most incredible places ...' }</Text>
            </View>
        )
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
                <CommentList type={'tube'} />
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

    // to display the comment button
    _footerComment = () => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#e8eaed75' }}>
                <TouchableOpacity onPress={() => this.setState({ commentView: true })}>
                    <Text style={{ fontSize: 18, paddingVertical: 19, fontFamily: 'Avenir-Heavy' }}>Comment 18k</Text>
                </TouchableOpacity>
            </View>
        )
    }

    // to display some tubes suggestions
    _suggestionTubeRender = () => {
        return (
            <ScrollView style={{ height: '100%' }}>
                {/* Title */}
                {this._titleRender()}
                {this._tubeListBySection(this.props.TubePage.tubesFollower, 'CORE.From-X', { value: this.props.TubePage.tube.profile._meta.pseudo }, true)}
                {this._tubeListBySection(this.props.TubePage.tubesSuggestions, 'CORE.Suggestion', false)}
                {/* {this.state.commentView ? null : this._footerComment()} */}
            </ScrollView>
        )
    }

    // to display a separator line
    _lineSeparator = () => {
        return (<View style={{ height: 5, backgroundColor: '#f3f3f6' }} />)
    }

    // to display some tube by section
    _tubeListBySection = (tubeList=this.testValue, title, line) => {

        if (!tubeList || tubeList.length == 0) return null

        return (
            <View style={styles.container_section}>

                {/* Header */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 25, paddingTop: 15, alignItems: 'center' }}>
                    <View>
                        <Text style={{ fontSize: 30, fontFamily: 'Avenir-Heavy', letterSpacing: 1, color: '#1E2432' }}>{title}</Text>
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

                {/* Footer Card
                <View style={{ position: 'absolute', bottom: 0, width: '100%', height: 70, }}>
                    <LinearGradient
                        colors={['#fbfbfb00', '#bdc3c72e', '#2c3e50d1']}
                        style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, height: '100%', borderBottomEndRadius: 8, borderBottomStartRadius: 8 }}>
                        <FastImage
                            style={{ width: 45, height: 45, borderRadius: 45, borderWidth: 2, borderColor: '#FF2D55' }} resizeMode={FastImage.resizeMode.cover}
                            source={{ uri: item.tube.profile.pictureprofile, priority: FastImage.priority.normal }}
                        />
                        <View style={{ paddingLeft: 10 }}>
                            <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '800' }}>{item.tube.profile._meta.pseudo}</Text>
                        </View>
                    </LinearGradient>

                </View> */}

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
        borderRadius: 14,
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
);

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(TubePage)