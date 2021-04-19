import React from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity, Image, SafeAreaView, VirtualizedList, Text } from 'react-native'
import { connect } from 'react-redux'
import * as PublicationFeedActions from '../../../redux/FeedPublications/actions'
import * as SearchActions from '../../../redux/SearchBar/actions'
import * as PublicationInModalActions from '../../../redux/PublicationInModal/actions'
import * as StoriesActions from '../../../redux/Stories/actions'
import * as NotificationsActions from '../../../redux/Notifications/actions'
import { bindActionCreators } from 'redux'
import PublicationStoryHeader from './stories/publication-story-header'
import StantardSuggest from '../../core/reusable/suggest/stantard-suggest'
import PublicationModalContainer from '../../core/modal/publication-modal-container'
import MainPublication from '../publication/main-publication'
import StoriesTrend from './stories/stories-trend'
import OptionPublicationModal from './../../core/modal/option-publication-modal'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserCircle, faCog, faBell } from '@fortawesome/pro-light-svg-icons'
import CardNewFeed from './../../core/reusable/card/card-new-feed'
import { checkNotification } from './../../../services/notification/action-notification-service'

class Feed extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isHeaderVisible: true,
            search: '',
            pagePublication: 1,
            publicationMode: false,
            publicationModeExist: false,
            storysModal: false,
            storysModalExist: false,
            reportModal: false,
            reportModalExist: false,
            reportPublicationId: null,
            ownerReportPublication: null
        }
    }

    UNSAFE_componentWillMount() {
        this.props.actions.resetPublicationActions()
        this.props.actions.resetPublicationInModalActions()
        this.props.actions.getNotificationsNumberAction()
        this._getPublicationList()
    }

    componentDidMount() {
        checkNotification(this.props.navigation, {
            openToggleModal: (event) => this._toggleModal(event)
        })

        if (!!this.props.params) {
            console.log(this.props.params.notification)
        }
    }

    // go to profile
    _goToProfile = (payload) => {

        this.props.actions.resetPublicationInModalActions()

        if (payload.pageName == 'Profile') return null

        if (payload.profileId !== this.props.MyProfile._id) {
            this.props.navigation.navigate('Profile', { profileId: payload.profileId })
        }
        else {
            this.props.navigation.navigate('MyProfile')
        }
    }

    // to load the next page of the publication
    _getPublicationList = () => {
        if (!this.props.FeedPublications.isLoading) {
            this.props.actions.getByModeFeed(this.state.pagePublication, 'FollowerAndFriend')
            this.setState({ pagePublication: this.state.pagePublication + 1 })
        }
    }

    // to set the searching bar
    _searching = (val) => {
        this.setState({ search: val })
        if (this.state.search.length >= 4) {
            this.props.actions.feedsearch(val)
        }
    }

    // to display the header
    _header() {
        return (
            <View style={styles.header_container}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Setting')}
                        style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: 25 }}>
                        <FontAwesomeIcon icon={faCog} size={24} color={'#aeaeae'} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{ width: 65, height: 35 }} source={require('../../../../assets/image/wiins-written.png')} />
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Notification')}
                            style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
                            <FontAwesomeIcon icon={faBell} size={27} color={'#aeaeae'} />
                            {this.props.Notifications.badge > 0 && 
                            <View style={{
                                position: 'absolute',
                                backgroundColor: 'red',
                                width: 20,
                                height: 20,
                                borderRadius: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                top: -9,
                                left: 25
                                
                            }}>
                                <Text style={{ color: 'white' }}>{this.props.Notifications.badge}</Text>
                            </View>}
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('MyProfile')}
                            style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
                            <FontAwesomeIcon icon={faUserCircle} size={27} color={'#aeaeae'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    _getItemOwner = (item) => {
        if (!!item.profile) return item.profile._id
        else return item.page._id
    }

    _cardRender = (item, index) => {
        return (<CardNewFeed
            toggleReportModal={() => this._toggleReportModal(item._id, this._getItemOwner(item))}
            index={index}
            navigation={this.props.navigation}
            publication={item}
            space={'feed'}
        />)
    }

    _refreshPage = () => {
        this.props.actions.refreshFeed()
        this.props.actions.refreshStoriesActions()
    }

    _publicationList = () => {
        return (
            <SafeAreaView style={{ borderTopLeftRadius: 35, borderTopRightRadius: 35, borderColor: 'white', flex: 1, overflow: 'hidden' }}>
                <VirtualizedList
                    onRefresh={this._refreshPage}
                    refreshing={this.props.Stories.isRefreshing || this.props.FeedPublications.isRefreshing}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={<PublicationStoryHeader goToPublication={this._togglePublicationMode} openStory={this._toggleStoryTrend} />}
                    style={{ flex: 1 }}
                    data={this.props.FeedPublications.publications}
                    renderItem={({ item, index }) => this._cardRender(item[index], index)}
                    keyExtractor={(item, index) => item[index]._id}
                    getItemCount={() => this.props.FeedPublications.publications.length}
                    getItem={(data) => data}
                    scrollEventThrottle={5}
                    onMomentumScrollEnd={() => this._getPublicationList()}
                />
            </SafeAreaView>
        )
    }

    // to display the list of the publications
    _displayPublicationFeed = () => {
        return (
            <View style={{ flex: 1, overflow: 'hidden' }}>
                <SafeAreaView style={{ flex: 1 }}>
                    {this._publicationList()}
                </SafeAreaView>
            </View>
        )
    }

    // to display the suggestion list
    _suggestionSearch = () => {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                    style={styles.list}
                    data={this.props.SearchList.list}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (<StantardSuggest suggest={item} navigation={this.props.navigation} />)}
                />
            </SafeAreaView>
        )
    }

    // to display/hide the publication
    _togglePublicationMode = () => {
        this.setState({ publicationMode: !this.state.publicationMode })
        setTimeout(() => this.setState({ publicationModeExist: !this.state.publicationModeExist }), 100)
    }

    // to display/hide the story view
    _toggleStoryTrend = () => {
        this.setState({ storysModal: !this.state.storysModal })
        setTimeout(() => this.setState({ storysModalExist: !this.state.storysModalExist }), 100)
    }

    _toggleReportModal = (id, ownerId) => {
        this.setState({ reportModal: !this.state.reportModal, reportPublicationId: id, ownerReportPublication: ownerId })
        setTimeout(() => this.setState({ reportModalExist: !this.state.reportModalExist }), 100)
    }

    render = () => {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.feed_container}>

                    {/* Header */}
                    {this._header()}
                    {this.state.search.length == 0 ? this._displayPublicationFeed() : this._suggestionSearch()}

                    {/* Modal */}
                    {this.state.publicationModeExist ?
                        <MainPublication
                            getBack={this._togglePublicationMode}
                            isVisible={this.state.publicationMode}
                        /> : null}

                    {!!this.props.PublicationsInModal.publication &&
                        <PublicationModalContainer
                            goToProfile={(payload) => this._goToProfile(payload)}
                            pageName={'Feed'}
                        />
                    }

                    {this.state.storysModalExist ?
                        <StoriesTrend
                            goBack={this._toggleStoryTrend}
                            isVisible={this.state.storysModal}
                        /> : null}

                    {this.state.reportModal ?
                        <OptionPublicationModal
                            toggleReportModal={(event) => this._toggleReportModal(event)}
                            isVisible={this.state.reportModal}
                            publicationId={this.state.reportPublicationId}
                            myProfileId={this.props.MyProfile.profile._id}
                            ownerId={this.state.ownerReportPublication}
                        /> : null}

                </View>
            </SafeAreaView>
        )
    }

}

const styles = StyleSheet.create({
    feed_container: {
        flex: 1,
        backgroundColor: '#eef2f4'
    },
    header_container: {
        position: 'relative',
        flexDirection: 'row',
        marginVertical: 5,
        height: 38
    },
    search_bar: {
        height: 50,
        fontSize: 15,
        paddingLeft: 15,
        paddingVertical: 15,
        width: '100%'
    },
    list: {
        paddingTop: 5
    }
})

const mapStateToProps = state => ({
    FeedPublications: state.FeedPublications,
    MyUser: state.MyUser,
    SearchList: state.Search,
    MyProfile: state.MyProfile,
    Stories: state.Stories,
    PublicationsInModal: state.PublicationsInModal,
    Notifications: state.Notifications
})

const ActionCreators = Object.assign(
    {},
    PublicationInModalActions,
    PublicationFeedActions,
    SearchActions,
    StoriesActions,
    NotificationsActions
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Feed)