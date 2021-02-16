import React from 'react'
import { StyleSheet, View, ActivityIndicator, TouchableOpacity, Text, ScrollView, Image } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FastImage from 'react-native-fast-image'
import * as ProfileActions from '../../../../redux/Profile/actions'
import * as ProfilePublicationActions from '../../../../redux/ProfilePublications/actions'
import * as MusicProjectListActions from '../../../../redux/MusicProjectList/actions'
import * as PublicationFeedActions from '../../../../redux/FeedPublications/actions'
import LinearGradient from 'react-native-linear-gradient'
import ProfilePublication from './profile-publication'
import ProfileMusic from './profile-music'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faNewspaper, faMusic, faVideo, faUserPlus, faArrowLeft, faEllipsisH } from '@fortawesome/pro-light-svg-icons'

class Profile extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            space: 'feed',
            pagePublication: 1,
            publicationLoading: false
        }
    }

    componentWillUnmount() {
        this.props.actions.getByModeProfile(1, 'FollowerAndFriend')
    }

    // to show the publications feed
    _getPublicationList = () => {
        if (!this.props.ProfilePublications.isLoading) {
            this.setState({ pagePublication: ++this.state.pagePublication, publicationLoading: true })
            this.props.actions.getByModeProfile(++this.state.pagePublication, 'profile/' + this.props.screenProps.rootNavigation.state.params.profileId)
            setTimeout(() => this.setState({ publicationLoading: false }), 3000);
        }
    }

    componentDidMount() {
        this.props.actions.getProfile(this.props.screenProps.rootNavigation.state.params.profileId)
        this.props.actions.getByModeProfile(1, 'profile/' + this.props.screenProps.rootNavigation.state.params.profileId)
    }

    // to display the relation button
    _renderBtnRelation = () => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {(this.props.Profile.profile.follow.viewer && this.props.Profile.profile.relation !== 'friend' && this.props.Profile.profile.relation !== 'pendingFromHim') ? this._displayBtnFollow() : null}
                {this.props.Profile.profile.follow.friend && this.props.Profile.profile.relation !== 'pendingFromHim' ? this._displayBtnFriend() : null}
                {this.props.Profile.profile.relation == 'pendingFromHim' ? this._displayBtnConfirmFriend() : null}
            </View>
        )
    }

    // to display the button to confirm the friend request
    _displayBtnConfirmFriend = () => {
        return (
            <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}
                colors={['#38ef7d', '#11998e']} style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 8, marginLeft: 15 }}>
                <TouchableOpacity onPress={() => this.props.actions.confirmFriendRequest(this.props.Profile.profile._id)}
                    style={{ borderRadius: 7, overflow: 'hidden', padding: 12, flexDirection: 'row' }}>
                    <FontAwesomeIcon icon={faUserPlus} color={'white'} size={18} style={[styles.icon_relation, { marginHorizontal: 7 }]} />
                    <Text style={{ color: 'white', fontWeight: '600' }}>Confirm</Text>
                </TouchableOpacity>
            </LinearGradient>
        )
    }

    // to display the friend button
    _displayBtnFriend = () => {


        <TouchableOpacity>
            <Text style={styles.title_btn_nav}>Setting</Text>
        </TouchableOpacity>

        if (this.props.Profile.profile.relation == 'friend') {
            return (
                <TouchableOpacity>
                    <Text style={styles.title_btn_nav}>Friend</Text>
                </TouchableOpacity>
            )
        }
        if (this.props.Profile.profile.relation == 'pendingFromMe') {
            return (
                <TouchableOpacity onPress={() => this.props.actions.cancelFriendRequest(this.props.Profile.profile._id)}>
                    <Text style={styles.title_btn_nav}>Pending</Text>
                </TouchableOpacity>
            )
        }
        else {
            return (
                <TouchableOpacity onPress={() => this.props.actions.askFriend(this.props.Profile.profile._id)}>
                    <Text style={styles.title_btn_nav}>Add Friend</Text>
                </TouchableOpacity>
            )
        }
    }

    // to display the button to follow
    _displayBtnFollow = () => {

        if (this.props.Profile.profile.relationFollowing) {
            return (
                <TouchableOpacity onPress={() => this.props.actions.unfollow(this.props.Profile.profile._id)}>
                    <Text style={styles.title_btn_nav}>Follow</Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity onPress={() => this.props.actions.follow(this.props.Profile.profile._id)}>
                    <Text style={styles.title_btn_nav}>Unfollow</Text>
                </TouchableOpacity>
            )
        }
    }

    // to display the relation btn
    _displayRelationBtn = () => {
        return (
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                {this.props.Profile.profile.relation == 'friend' ? null :
                    <LinearGradient
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#f12711', '#f5af19']}
                        style={{ borderRadius: 25, position: 'relative' }}
                    >
                        {this._displayBtnFollow()}
                    </LinearGradient>
                }
                <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#3C349B', '#8E46DF']}
                    style={{ borderRadius: 25, position: 'relative' }}
                >
                    {this._displayBtnFriend()}
                </LinearGradient>
            </View>
        )
    }

    // display nav bar profile
    _renderNavBarProfile = () => {
        switch (this.props.Profile.profile.actifSpace) {
            // default
            case 1: return null
            // music
            case 2: return (
                <View style={{ flexDirection: 'row', padding: 15 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={faNewspaper} color={'grey'} size={25} style={{ opacity: 0.8 }} />
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={faMusic} color={'grey'} size={25} style={{ opacity: 0.8 }} />
                    </View>
                    {this._displayRelationBtn()}
                </View>
            )
            // tube
            case 3: return (
                <View style={{ flexDirection: 'row', padding: 15 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={faNewspaper} color={'grey'} size={25} style={{ opacity: 0.8 }} />
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={faVideo} color={'grey'} size={25} style={{ opacity: 0.8 }} />
                    </View>
                    {this._displayRelationBtn()}
                </View>
            )
            // music and tube
            case 4: return (
                <View style={{ flexDirection: 'row', padding: 15 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={faNewspaper} color={'grey'} size={25} style={{ opacity: 0.8 }} />
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={faVideo} color={'grey'} size={25} style={{ opacity: 0.8 }} />
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={faMusic} color={'grey'} size={25} style={{ opacity: 0.8 }} />
                    </View>
                    {this._displayRelationBtn()}
                </View>)
        }
    }

    // to display the header of the view
    _renderHeader = () => {

        return (
            <View style={styles.header_container}>


                <View style={{ flex: 1, position: 'relative' }}>

                    {/* Back Btn */}
                    <TouchableOpacity onPress={() => this.props.screenProps.rootNavigation.goBack(null)}
                        style={{ position: 'absolute', left: 25, width: 35, height: 35, top: 55, zIndex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={faArrowLeft} color={'white'} size={30} />
                    </TouchableOpacity>

                    {/* Dropdown Btn */}
                    <TouchableOpacity
                        style={{ position: 'absolute', right: 25, width: 35, height: 35, top: 55, zIndex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={faEllipsisH} color={'white'} size={40} />
                    </TouchableOpacity>

                    {/* Cover Picture */}
                    <FastImage
                        style={{ height: 200 }}
                        resizeMode={FastImage.resizeMode.cover}
                        source={{ uri: this.props.Profile.profile.picturecover, priority: FastImage.priority.normal }}
                    />

                    {/* Background Filter */}
                    <View style={{ backgroundColor: '#0000004d', width: '100%', height: 200, position: 'absolute' }} />

                    {/* Profile picture and name */}
                    <View style={{ position: 'absolute', top: 110, width: '100%', flexDirection: 'row', paddingHorizontal: 5 }}>
                        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                            <FastImage
                                style={{ height: 66, width: 66, borderRadius: 66 }}
                                source={{
                                    uri: this.props.Profile.profile.pictureprofile,
                                    priority: FastImage.priority.normal,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                        </View>
                        <View style={{ flex: 7, paddingLeft: 5, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 22, color: 'white', fontFamily: 'Avenir-Heavy' }}>@{this.props.Profile.profile._meta.pseudo}</Text>
                            <Text style={{ color: 'white', fontSize: 15, fontFamily: 'Avenir-Book' }}>Community : {this.props.Profile.profile.communityTotal}</Text>
                        </View>
                    </View>

                    {/* Nav */}
                    {this._renderNavBarProfile()}

                </View>

            </View>
        )
    }

    // to display the loading animation
    _displayLoading = () => {
        return (
            <View style={styles.loading_container}>
                <ActivityIndicator size='large' color="grey" />
            </View>
        )
    }

    // to display the profile page
    _displayPage = () => {

        return (
            <View>
                {this._renderHeader()}
                {this._renderBody()}
            </View>
        )
    }

    // to display the principale view 
    _renderBody = () => {

        return (
            <View style={styles.body_container}>
                {/* ActifSpace */}
                {this._listContent()}
            </View>
        )
    }

    // to display the contents of the profile
    _listContent = () => {
        switch (this.state.space) {
            case 'feed': return (<ProfilePublication />)
            case 'music': {
                this.props.actions.getmusicProjectListByProfile(1, this.props.screenProps.rootNavigation.state.params.profileId)
                return (<ProfileMusic />)
            }
        }
    }

    render() {

        return (
            <View style={styles.container}>
                <ScrollView
                    scrollEventThrottle={5}
                    onMomentumScrollEnd={() => this._getPublicationList()}>
                    {this.props.Profile.isLoading ? this._displayLoading() : null}
                    {this.props.Profile.profile !== null ? this._displayPage() : null}
                </ScrollView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header_container: {
        position: 'relative',
    },
    title_btn_nav: {
        textAlign: 'center',
        paddingVertical: 12,
        paddingHorizontal: 15,
        fontWeight: '700',
        color: 'white'
    },
    body_container: {
        paddingTop: 5
    }
})

const mapStateToProps = state => ({
    Profile: state.Profile,
    ProfilePublications: state.ProfilePublications
})

const ActionCreators = Object.assign(
    {},
    ProfileActions,
    PublicationFeedActions,
    ProfilePublicationActions,
    MusicProjectListActions
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)