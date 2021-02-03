import React from 'react'
import {
    StyleSheet, View, FlatList, TouchableOpacity,
    LayoutAnimation, Image, LogBox, ScrollView, SafeAreaView
} from 'react-native'
import { connect } from 'react-redux'
import * as PublicationFeedActions from '../../../../redux/FeedPublications/actions'
import * as SearchActions from '../../../../redux/SearchBar/actions'
import { bindActionCreators } from 'redux'
import PublicationStoryHeader from './stories/publication-story-header'
import StantardSuggest from '../../core/stantard-suggest'
import PublicationModal from '../../core/modal/publication-modal'
import MainPublication from '../publication/main-publication'
import StoriesTrend from './stories/stories-trend'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserCircle, faCog } from '@fortawesome/pro-light-svg-icons'
import CardNewFeed from './../../core/card/card-new-feed'

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
}

class Feed extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isHeaderVisible: true,
            search: '',

            pagePublication: 1,
            isRefreshing: false,
            isLoadingMore: false,

            modal: false,
            PublicationModal: null,
            publicationMode: false,
            publicationModeExist: false,
            storysModal: false,
            storysModalExist: false
        }
        _listViewOffset = 0

    }

    UNSAFE_componentWillMount() {
        this._getPublicationList()
        this.props.actions.resetPublication()
    }

    // to display the modal view
    _toggleModal = (event) => {
        this.setState({ modal: !this.state.modal, PublicationModal: event })
    }

    // to load the next page of the publication
    _getPublicationList = () => {

        if (!this.props.FeedPublications.isLoading) {
            this.props.actions.getByMode(this.state.pagePublication, 'FollowerAndFriend')
            this.setState({ pagePublication: this.state.pagePublication + 1 })
        }

    }

    // to add some event during the scrolling
    _onScroll = (event) => {

        const CustomLayoutLinear = {
            duration: 100,
            create: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
            update: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
            delete: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity }
        }
        // Check if the user is scrolling up or down by confronting the new scroll position with your own one
        const currentOffset = event.nativeEvent.contentOffset.y
        const direction = (currentOffset > 0 && currentOffset > this._listViewOffset)
            ? 'down'
            : 'up'
        // If the user is scrolling down (and the action-button is still visible) hide it
        const isHeaderVisible = direction === 'up'
        if (isHeaderVisible !== this.state.isHeaderVisible) {
            LayoutAnimation.configureNext(CustomLayoutLinear)
            this.setState({ isHeaderVisible })
        }
        // Update your scroll position
        this._listViewOffset = currentOffset

        // load new publication
        if (isCloseToBottom(event.nativeEvent)) this._getPublicationList()
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
                        style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={faCog} size={24} color={'#aeaeae'} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{ width: 65, height: 35 }} source={require('../../../../assets/image/wiins-written.png')} />
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('MyProfile')}
                        style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={faUserCircle} size={27} color={'#aeaeae'} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    // to refresh the publications
    _refreshRequest = () => {
        this.setState({ isRefreshing: true, pagePublication: 1 })
        this.props.actions.resetPublicationActions()
        setTimeout(() => { this.setState({ isRefreshing: false }) }, 1000);
        this.props.actions.getByMode(1, 'FollowerAndFriend')
    }

    _publicationList = () => {
        if (!!this.props.FeedPublications.publications && this.props.FeedPublications.publications.length !== 0) {
            return (
                <FlatList
                    onRefresh={this._refreshRequest}
                    refreshing={this.state.isRefreshing}
                    onScrollBeginDrag={this._onScroll}
                    data={this.props.FeedPublications.publications}
                    renderItem={({ item, index }) =>
                        <CardNewFeed
                            index={index}
                            navigation={this.props.navigation}
                            publication={item}
                            space={'feed'}
                            toggleModal={(event) => this._toggleModal(event)}
                        />
                    }
                    keyExtractor={(item) => item._id.toString()}
                    ItemSeparatorComponent={FeedSeparator}
                />
            )
        } else return null
    }

    // to display the list of the publications
    _displayPublicationFeed = () => { //borderTopLeftRadius: 35, borderTopRightRadius: 35
        return (
            <View style={{ flex: 1, overflow: 'hidden' }}>
                <ScrollView scrollEventThrottle={5} style={{ borderTopLeftRadius: 35, borderTopRightRadius: 35, borderColor: 'white' }} showsVerticalScrollIndicator={false} >
                    <PublicationStoryHeader goToPublication={this._togglePublicationMode} openStory={this._toggleStoryTrend} />
                    {this._publicationList()}
                </ScrollView>
            </View>
        )
    }

    // to display the suggestion list
    _suggestionSearch = () => {
        return (
            <FlatList
                style={styles.list}
                data={this.props.SearchList.list}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (<StantardSuggest suggest={item} navigation={this.props.navigation} />)}
            />
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

    render = () => {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.feed_container}>

                    {/* Header */}
                    {this._header()}
                    {this.state.search.length == 0 ? this._displayPublicationFeed() : this._suggestionSearch()}

                    {/* Modal */}
                    {this.state.publicationModeExist ? <MainPublication getBack={this._togglePublicationMode} isVisible={this.state.publicationMode} /> : null}
                    {this.state.modal ? <PublicationModal publicationModal={this.state.PublicationModal} toggleModal={(event) => this._toggleModal(event)} /> : null}
                    {this.state.storysModalExist ? <StoriesTrend goBack={this._toggleStoryTrend} isVisible={this.state.storysModal} /> : null}

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
        paddingHorizontal: 30,
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

const FeedSeparator = () => {
    return (
        <View></View>
    )
}

const mapStateToProps = state => ({
    FeedPublications: state.FeedPublications,
    MyUser: state.MyUser,
    SearchList: state.Search,
    MyProfile: state.MyProfile,
    Stories: state.Stories
})

const ActionCreators = Object.assign(
    {},
    PublicationFeedActions,
    SearchActions
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Feed)