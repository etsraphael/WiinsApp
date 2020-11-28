import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ScrollView, TextInput, Image, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../../../redux/MyUser/actions'
import { bindActionCreators } from 'redux'
import Video from 'react-native-video'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import CommentList from '../../core/comment-list'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleDown } from '@fortawesome/pro-light-svg-icons'
import * as TubePageActions from '../../../../redux/TubePage/actions'
import { getDateTranslated } from '../../../services/translation/translation-service'

class TubePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            commentView: false,
            videoReady: false
        }
    }

    UNSAFE_componentWillMount = () => {
        this.uploadPageTube(this.props.screenProps.rootNavigation.state.params.tubeId)
    }

    // to upload the page of the tube
    uploadPageTube = (id) => {
        this.setState({videoReady: false})
        this.props.actions.getTubePageActions(id)
    }

    // to display the header view
    _headerRender = () => {
        return (
            <View>

                {/* Video */}
                <Video
                    controls={true}
                    onReadyForDisplay={() => this.setState({ videoReady: true })}
                    style={{ width: '100%', height: 250, backgroundColor: 'black' }}
                    source={{ uri: this.props.TubePage.tube.videoLink }}
                    repeat={true}
                    minLoadRetryCount={5}
                    volume={0.1}
                    resizeMode={'cover'}
                />

                {/* Poster */}
                {this.state.videoReady ? null :
                    <View style={{ width: '100%', height: 250, position: 'absolute', top: 0 }}>
                        <FastImage
                            style={{ flex: 1 }}
                            source={{ uri: this.props.TubePage.tube.posterLink, priority: FastImage.priority.normal }}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                        <View style={{ backgroundColor: '#00000045', position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size='large' color="#ffffff" />
                        </View>
                    </View>
                }


                {/* Profile */}
                <View style={{ height: 70, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, borderBottomColor: '#cdcdcd', borderBottomWidth: 0.5 }}>
                    <View style={{ flex: 3, alignItems: 'center' }}>
                        <FastImage
                            style={{ width: 45, height: 45, borderRadius: 45, borderWidth: 2, borderColor: '#df0ddf' }}
                            resizeMode={FastImage.resizeMode.cover}
                            source={{ uri: this.props.TubePage.tube.profile.pictureprofile, priority: FastImage.priority.normal }}
                        />
                    </View>
                    <View style={{ flex: 7 }}>
                        <Text>{this.props.TubePage.tube.name}</Text>
                        <Text>{getDateTranslated(this.props.TubePage.tube.createdAt)} </Text>
                    </View>
                    <View style={{ flex: 3, alignItems: 'center' }}>
                        <LinearGradient
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 0 }}
                            colors={['#3C349B', '#8E46DF']}
                            style={{ borderRadius: 25, position: 'relative', bottom: 3, marginHorizontal: 5 }}
                        >
                            <TouchableOpacity>
                                <Text style={{ textAlign: 'center', paddingVertical: 12, paddingHorizontal: 15, fontWeight: '700', color: 'white' }}>Follow</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </View>

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
                        placeholder={'PUBLICATION.Write-a-comment'}
                        placeholderTextColor="#FFFFFF"
                        style={{ flex: 9, paddingLeft: 15, color: 'grey', backgroundColor: '#485164', borderRadius: 17, height: '100%' }}
                    ></TextInput>
                    <TouchableOpacity
                        style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={require('../../../../assets/image/icon/fa-orange-plane.png')}
                            style={{ width: 24, height: 24 }}
                            resizeMode={'contain'}
                        />
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
                {this._tubeListBySection(this.props.TubePage.tubesFollower, 'CORE.From-X', { value: this.props.TubePage.tube.profile._meta.pseudo }, true)}
                {this._tubeListBySection(this.props.TubePage.tubesSuggestions, 'CORE.Suggestion', false)}
                {this.state.commentView ? null : this._footerComment()}
            </ScrollView>
        )
    }

    // to display a separator line
    _lineSeparator = () => {
        return (<View style={{ height: 5, backgroundColor: '#f3f3f6' }} />)
    }

    // to display some tube by section
    _tubeListBySection = (tubeList, title, line) => {

        if(!tubeList || tubeList.length == 0) return null

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
                    style={{ width: '100%', height: '100%', borderRadius: 8 }} resizeMode={FastImage.resizeMode.cover}
                    source={{ uri: item.tube.posterLink, priority: FastImage.priority.normal }}
                />

                {/* Footer Card */}
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
                        keyExtractor={(item) => item.id.toString()}
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
        height: 155,
        width: 175,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
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