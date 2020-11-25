import React from 'react'
import {
    StyleSheet, View, FlatList, TextInput, TouchableOpacity,
    LayoutAnimation, Image, LogBox, DeviceEventEmitter, ScrollView, Text
} from 'react-native'
import { connect } from 'react-redux'
import * as PublicationFeedActions from '../../../../redux/FeedPublications/actions'
import * as SearchActions from '../../../../redux/SearchBar/actions'
import { bindActionCreators } from 'redux'
import PublicationStandard from '../../core/publication-standard'
import PublicationStoryHeader from './stories/publication-story-header'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient';
import StantardSuggest from '../../core/stantard-suggest'
import PublicationModal from '../../core/publication-modal'
import MainPublication from '../publication/main-publication'
import StoriesTrend from './stories/stories-trend'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

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
            publicationLoading: false,
            isRefreshing: false,
            modal: false,
            PublicationModal: null,
            publicationMode: false,
            publicationModeExist: false,
            storysModal: false,
            storysModalExist: false
        }
        _listViewOffset = 0

        LogBox.ignoreLogs([
            'VirtualizedLists should never be nested', // TODO: Remove when fixed
        ])
    }

    UNSAFE_componentWillMount() {
        this._getPublicationList()
        this.props.actions.resetPublication()
        this.eventListener = DeviceEventEmitter.addListener('toggleModal', this.toggleModal);
    }

    componentWillUnmount() {
        this.eventListener.remove();
    }

    // to display the modal view
    toggleModal = (event) => {
        this.setState({ modal: !this.state.modal, PublicationModal: event })
    }

    // to load the next page of the publication
    _getPublicationList = () => {

        if (!this.props.FeedPublications.isLoading && !this.state.publicationLoading) {
            this.props.actions.getByMode(this.state.pagePublication, 'FollowerAndFriend')
            this.setState({ pagePublication: this.state.pagePublication + 1, publicationLoading: true })
            setTimeout(() => this.setState({ publicationLoading: false }), 3000); 
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
                <View style={{ flex: 8, flexDirection: 'row', alignItems: 'center', borderRadius: 18, backgroundColor: '#8e8e9329', overflow: 'hidden' }}>
                    <Image style={{ marginLeft: 20, width: 18, height: 18 }} source={require('../../../../assets/image/icon/search-icon.png')} />
                    <TextInput
                        placeholder='Search'
                        style={styles.search_bar}
                        placeholderTextColor="#737373"
                        onChangeText={(val) => this._searching(val)}
                    />
                </View>
                <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity underlayColor='#fff' onPress={() => this.props.navigation.navigate('MyProfile')}>
                        <LinearGradient
                            colors={['#202D83', '#9f49ee94']}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={
                                {
                                    overflow: 'hidden',
                                    borderRadius: 25,
                                    width: 39,
                                    height: 39,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginHorizontal: 5
                                }
                            }>
                            <FastImage
                                style={{ width: 34, height: 34, borderRadius: 25 }}
                                source={{
                                    uri: this.props.MyProfile.profile.pictureprofile,
                                    priority: FastImage.priority.normal,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                        </LinearGradient>
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

    // to display the list of the publications
    _PublicationFeed = () => {

        return (
            <ScrollView
                onScroll={this._onScroll}
                scrollEventThrottle={5}
            >
                {this.props.Stories.stories.length > 0 ? <PublicationStoryHeader goToPublication={this._togglePublicationMode} openStory={this._toggleStoryTrend}/> : null}

                <FlatList
                    data={this.props.FeedPublications.publications}
                    renderItem={({ item, index }) => <PublicationStandard index={index} navigation={this.props.navigation} publication={item} space={'feed'} />}
                    keyExtractor={item => item.id}
                />

            </ScrollView>
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

    // to display the button to add a new post
    _btnPublication = () => {
        return (
            <View style={{ borderRadius: 45, width: 75, height: 75, position: 'absolute', bottom: 10, left: 15, overflow: 'hidden' }}>

                <TouchableOpacity onPress={this._togglePublicationMode}>

                <Image
                    source={require('../../../../assets/image/icon/faplus.png')}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode={'cover'}
                />
                </TouchableOpacity>

            </View>
        )
    }

    render = () => {
        return (
            <View style={styles.feed_container}>

                {/* Header */}
                {this.state.isHeaderVisible ? this._header() : null}
                {this.state.search.length == 0 ? this._PublicationFeed() : this._suggestionSearch()}

                {/* Modal */}
                {this._btnPublication()}
                {this.state.publicationModeExist ? <MainPublication getBack={this._togglePublicationMode} isVisible={this.state.publicationMode} /> : null}
                {this.state.modal ? <PublicationModal publicationModal={this.state.PublicationModal} /> : null}
                {this.state.storysModalExist ? <StoriesTrend goBack={this._toggleStoryTrend} isVisible={this.state.storysModal} /> : null}

            </View>
        )
    }

}

const styles = StyleSheet.create({
    feed_container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() + 5 : 0
    },
    header_container: {
        position: 'relative',
        flexDirection: 'row',
        marginVertical: 5,
        paddingHorizontal: 15,
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