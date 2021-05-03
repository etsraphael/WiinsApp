import React from 'react'
import { StyleSheet, View, ActivityIndicator, TouchableOpacity, Text, ScrollView, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FastImage from 'react-native-fast-image'
import * as ProfileActions from '../../../redux/Profile/actions'
import * as ProfilePublicationActions from '../../../redux/ProfilePublications/actions'
import * as MusicProjectListActions from '../../../redux/MusicProjectList/actions'
import * as PublicationFeedActions from '../../../redux/FeedPublications/actions'
import * as PublicationInModalActions from '../../../redux/PublicationInModal/actions'
import LinearGradient from 'react-native-linear-gradient'
import ProfilePublication from './profile-publication'
import ProfileMusic from './profile-music'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserPlus, faArrowLeft, faEllipsisH } from '@fortawesome/pro-light-svg-icons'
import PublicationModalContainer from './../../core/modal/publication-modal-container'
import OptionPublicationModal from './../../core/modal/option-publication-modal'
import OptionProfileModal from './../../core/modal/option-profile-modal'
import { faCircle } from '@fortawesome/pro-solid-svg-icons'
import { TabActions } from '@react-navigation/native'
import I18n from '../../../../assets/i18n/i18n'

class Profile extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            space: 'feed',
            pagePublication: 1,
            publicationLoading: false,
            modal: false,
            reportModal: false,
            optionProfileModalExist: false,
            optionProfileModal: false,
            reportPublicationId: null,
            ownerReportPublication: null,
            spaceAvalaible: ['feed']
        }
    }

    componentWillUnmount() {
        this.props.actions.getByModeProfile(1, 'FollowerAndFriend')
    }

    _initializeNavBar = (space) => {
        switch (space) {
            case 1: return this.setState({ spaceAvalaible: ['feed'] })
            case 2: return this.setState({ spaceAvalaible: ['feed', 'music'] })
            case 3: return this.setState({ spaceAvalaible: ['feed', 'tube'] })
            case 4: return this.setState({ spaceAvalaible: ['feed', 'music', 'tube'] })
        }
    }

    // to show the publications feed
    _getPublicationList = () => {
        if (!this.props.ProfilePublications.isLoading) {
            this.setState({ pagePublication: ++this.state.pagePublication, publicationLoading: true })
            this.props.actions.getByModeProfile(++this.state.pagePublication, 'profile/' + this.props.route.params.profileId)
            setTimeout(() => this.setState({ publicationLoading: false }), 3000);
        }
    }

    componentDidMount() {
        this.props.actions.getProfile(this.props.route.params.profileId, (space) => this._initializeNavBar(space))
        this.props.actions.getByModeProfile(1, 'profile/' + this.props.route.params.profileId)
    }


    // to display the button to confirm the friend request
    _displayBtnConfirmFriend = () => {
        return (
            <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}
                colors={['#38ef7d', '#11998e']} style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 8, marginLeft: 15 }}>
                <TouchableOpacity onPress={() => this.props.actions.confirmFriendRequest(this.props.Profile.profile._id)}
                    style={{ borderRadius: 7, overflow: 'hidden', padding: 12, flexDirection: 'row' }}>
                    <FontAwesomeIcon icon={faUserPlus} color={'white'} size={18} style={[styles.icon_relation, { marginHorizontal: 7 }]} />
                    <Text style={{ color: 'white', fontWeight: '600' }}>{I18n.t('CORE.Confirm')}</Text>
                </TouchableOpacity>
            </LinearGradient>
        )
    }

    // to display the header of the view
    _renderHeader = () => {
        return (
            <View style={styles.header_container}>

                <View style={{ flex: 1, position: 'relative' }}>

                    {/* Title and btn */}
                    <View style={{ position: 'absolute', top: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', zIndex: 1, width: '100%' }}>
                        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                                style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <FontAwesomeIcon icon={faArrowLeft} color={'white'} size={30} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, color: 'white', fontWeight: '800' }}>{I18n.t('CORE.Profile')}</Text>
                        </View>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => this._toggleOptionProfileReportModal()}>
                            <FontAwesomeIcon icon={faEllipsisH} color={'white'} size={40} />
                        </TouchableOpacity>
                    </View>

                    {/* Cover Picture */}
                    <FastImage
                        style={{ height: 230, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}
                        resizeMode={FastImage.resizeMode.cover}
                        source={{ uri: this.props.Profile.profile.picturecover, priority: FastImage.priority.normal }}
                    />

                    {/* Background Filter */}
                    <View style={{ backgroundColor: '#0000004d', width: '100%', height: 230, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, position: 'absolute' }} />

                    {/* Profile picture and name */}
                    <View style={{ bottom: -50, width: '100%', flexDirection: 'row', paddingHorizontal: 5, position: 'absolute', paddingHorizontal: 35 }}>
                        <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <FastImage
                                style={{ width: '100%', aspectRatio: 1, borderRadius: 15, borderColor: '#6600ff', borderWidth: 2 }}
                                source={{
                                    uri: this.props.Profile.profile.pictureprofile,
                                    priority: FastImage.priority.normal,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                        </View>
                        <View style={{ flex: 7, paddingLeft: 15, justifyContent: 'space-evenly' }}>
                            {this._displayBtnFollowing()}
                            {this._displayBtnRelation()}
                            <View style={{ position: 'relative', bottom: -15 }}>
                                <Text style={{ fontSize: 22, color: '#333333', fontFamily: 'Avenir-Heavy' }}>@{this.props.Profile.profile._meta.pseudo}</Text>
                                <Text style={{ color: '#77838F', fontSize: 15, fontFamily: 'Avenir-Book' }}>{I18n.t('CORE.Community')} : {this.props.Profile.profile.communityTotal}</Text>
                            </View>
                        </View>
                    </View>

                </View>

                <View style={{ height: 75 }} />

            </View>
        )
    }

    _openRoomInMessenger = () => {
        const jumpToAction = TabActions.jumpTo('MAIN_MESSENGER')
        return this.props.navigation.dispatch(jumpToAction)
    }

    _displayBtnFollowing = () => {

        if (!this.props.Profile.profile.follow.following) return null
        if (this.props.Profile.profile.relation == 'friend') return null

        return (
            <View style={{ flexDirection: 'row', marginVertical: 7 }}>
                {this.props.Profile.profile.relation == 'following' ?
                    <TouchableOpacity style={{ flex: 2 }}>
                        <View style={{ backgroundColor: '#6600ff', borderRadius: 5, justifyContent: 'center', alignItems: 'center', paddingVertical: 5 }}>
                            <Text style={{ fontSize: 19, fontWeight: '600', color: 'white' }}>{I18n.t('CORE.Following')}</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={{ flex: 2 }} onPress={() => this.props.actions.follow(this.props.Profile.profile._id)}>
                        <View style={{ backgroundColor: '#6600ff', borderRadius: 5, justifyContent: 'center', alignItems: 'center', paddingVertical: 5 }}>
                            <Text style={{ fontSize: 19, fontWeight: '600', color: 'white' }}>{I18n.t('CORE.Follow')}</Text>
                        </View>
                    </TouchableOpacity>
                }
                <View style={{ flex: 1 }} />
            </View>
        )

    }

    _displayBtnRelation = () => {
        switch (this.props.Profile.profile.relation) {
            case 'friend': return (
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ flex: 2 }} onPress={() => this._openRoomInMessenger()}>
                        <View style={{ backgroundColor: '#6600ff', borderRadius: 5, justifyContent: 'center', alignItems: 'center', paddingVertical: 5 }}>
                            <Text style={{ fontSize: 19, fontWeight: '600', color: 'white' }}>{I18n.t('CORE.Message')}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ flex: 1 }} />
                </View>
            )
            case 'following':
            case 'not-friend': return (
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ flex: 4 }} onPress={() => this.props.actions.askFriend(this.props.Profile.profile._id)}>
                        <View style={{ backgroundColor: '#6600ff', borderRadius: 5, justifyContent: 'center', alignItems: 'center', paddingVertical: 5 }}>
                            <Text style={{ fontSize: 19, fontWeight: '600', color: 'white' }}>{I18n.t('CORE.Friend-request')}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
            case 'pendingFromMe': return (
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ flex: 4 }} onPress={() => this.props.actions.cancelFriendRequest(this.props.Profile.profile._id)}>
                        <View style={{ backgroundColor: '#6600ff', borderRadius: 5, justifyContent: 'center', alignItems: 'center', paddingVertical: 5 }}>
                            <Text style={{ fontSize: 19, fontWeight: '600', color: 'white' }}>{I18n.t('CORE.Pending')}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
            default: return null
        }
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
                {this._navbarRender()}
                {this._renderBody()}
            </View>
        )
    }

    _actifTextNavbar = (item) => {
        if (this.state.space == item) return { color: '#6600ff' }
    }

    _changeSpace = (space) => {
        switch (space) {
            case 'music':
                this.props.actions.getmusicProjectListByProfile(1, this.props.route.params.profileId)
                return this.setState({ space: 'music' })
            case 'feed': {
                return this.setState({ space: 'feed' })
            }
            case 'tube': {
                return this.setState({ space: 'tube' })
            }
            default: return null
        }
    }

    _navbarRender = () => {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <FlatList
                    data={this.state.spaceAvalaible}
                    horizontal={true}
                    keyExtractor={(item) => item.toString()}
                    renderItem={({ item }) =>
                        <TouchableOpacity style={{ paddingVertical: 5, paddingHorizontal: 7, flexDirection: 'row', alignItems: 'center' }} onPress={() => this._changeSpace(item)}>
                            {this.state.space == item && <FontAwesomeIcon style={{ margin: 5 }} icon={faCircle} color={'#6600ff'} size={10} />}
                            <Text style={[styles.text_navbar, this._actifTextNavbar(item)]}>{I18n.t('CORE.'+item)}</Text>
                        </TouchableOpacity>
                    }
                />
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

    // to display the modal view
    _toggleModal = (event) => {
        if (!!event) { this.props.actions.putPublicationInModalActions(event.publication) }
        else { this.props.actions.resetPublicationInModalActions() }
        this.setState({ modal: !this.state.modal, PublicationModal: event })
    }

    // to display the contents of the profile
    _listContent = () => {
        switch (this.state.space) {
            case 'feed': return (
                <ProfilePublication
                    toggleReportModal={(id, ownerId) => this._toggleReportModal(id, ownerId)}
                    toggleModal={(event) => this._toggleModal(event)}
                />
            )
            case 'music': {
                return (<ProfileMusic />)
            }
            case 'tube': {
                return (<View />)
            }
        }
    }

    _goToProfile = () => {
        this.setState({ modal: false, PublicationModal: null })
    }

    _toggleReportModal = (id, ownerId) => {
        this.setState({ reportModal: !this.state.reportModal, reportPublicationId: id, ownerReportPublication: ownerId })
        setTimeout(() => this.setState({ reportModalExist: !this.state.reportModalExist }), 100)
    }

    _toggleOptionProfileReportModal = () => {
        this.setState({ optionProfileModal: !this.state.optionProfileModal })
        setTimeout(() => this.setState({ optionProfileModalExist: !this.state.optionProfileModalExist }), 100)
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

                {this.state.modal &&
                    <PublicationModalContainer
                        publicationModal={this.state.PublicationModal}
                        toggleModal={(event) => this._toggleModal(event)}
                        goToProfile={(payload) => this._goToProfile(payload)}
                        pageName={'Profile'}
                    />
                }

                {this.state.reportModal &&
                    <OptionPublicationModal
                        toggleReportModal={(event) => this._toggleReportModal(event)}
                        isVisible={this.state.reportModal}
                        publicationId={this.state.reportPublicationId}
                        myProfileId={this.props.MyProfile.profile._id}
                        ownerId={this.state.ownerReportPublication}
                    />
                }


                {this.state.optionProfileModal &&
                    <OptionProfileModal
                        toggleOptionProfileReportModal={() => this._toggleOptionProfileReportModal()}
                        isVisible={this.state.optionProfileModal}
                        profileId={this.props.Profile.profile._id}
                    />
                }

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
    },
    text_navbar: {
        color: '#77838F',
        fontSize: 19,
        fontWeight: '600'
    }
})

const mapStateToProps = state => ({
    Profile: state.Profile,
    ProfilePublications: state.ProfilePublications,
    MyProfile: state.MyProfile
})

const ActionCreators = Object.assign(
    {},
    ProfileActions,
    PublicationFeedActions,
    ProfilePublicationActions,
    MusicProjectListActions,
    PublicationInModalActions
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)