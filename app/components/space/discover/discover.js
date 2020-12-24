import React from 'react'
import { StyleSheet, View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator, LayoutAnimation } from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../../../redux/MyUser/actions'
import * as TopHastagActions from '../../../../redux/TopHastag/actions'
import * as DiscoverPublicationActions from '../../../../redux/DiscoverPublications/actions'
import * as SearchBarActions from '../../../../redux/SearchBar/actions'
import { bindActionCreators } from 'redux'
import PublicationStandard from '../../core/publication-standard'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch } from '@fortawesome/pro-light-svg-icons'
import SuggestionDiscover from './suggestion-discover'

class Discover extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isHeaderVisible: true,
            search: '',
            pagePublication: 0,
            publicationLoading: false,
            hastagSelected: 'trend',
            isRefreshing: false,
            actifCategory: 'All categories'
        }
    }

    componentDidMount() {
        this.props.actions.getTopHastag()
        this._getPublicationList()
    }

    // to load more publications
    _getPublicationList = () => {

        if (!this.props.DiscoverPublications.isLoading && !this.state.publicationLoading) {

            this.setState({ pagePublication: ++this.state.pagePublication, publicationLoading: true })
            setTimeout(() => this.setState({ publicationLoading: false }), 3000);

            if (this.state.hastagSelected == 'trend') this.props.actions.getTrend(this.state.pagePublication)
            else this.props.actions.getByName(this.state.pagePublication, this.state.hastagSelected)

        }

    }

    // to change the color of the hastag selected
    _selectedHastag = (word) => {
        if (word == this.state.hastagSelected) return { color: '#613BBA' }
    }

    // to filt the publication by hastag
    _changeHastag = (hastag) => {
        if (hastag == 'trend') this.props.actions.getTrend(1)
        else this.props.actions.getByName(1, hastag)
        this.setState({ hastagSelected: hastag, pagePublication: 1, search: '' })
    }

    // to search suggestion
    searchSuggest = (name) => {
        this.setState({ search: name })
        if (name.length > 3) {
            switch (this.state.actifCategory) {
                case 'All categories': this.props.actions.discoverSearch(name); break;
                case 'Profile': this.props.actions.discoverSearchWithCategory(name, 'ProfileSuggestion'); break;
                case 'Page': this.props.actions.discoverSearchWithCategory(name, 'PageSuggestion'); break;
                case 'Group': this.props.actions.discoverSearchWithCategory(name, 'GroupSuggestion'); break;
                case 'Music': this.props.actions.discoverSearchWithCategory(name, 'MusicSuggestion'); break;
                case 'MusicProject': this.props.actions.discoverSearchWithCategory(name, 'MusicProjectSuggestion'); break;
                default: return null
            }
        }
    }

    // to display the header view of the screen
    _header = () => {
        return (
            <View style={styles.header_container}>
                {/* search bar */}
                <View style={styles.container_search_bar}>
                    <TextInput
                        placeholder='Search'
                        style={styles.search_bar}
                        placeholderTextColor="#737373"
                        onChangeText={(val) => this.searchSuggest(val)}
                        value={this.state.search}
                        blurOnSubmit={true}
                    />
                    <FontAwesomeIcon icon={faSearch} color={'grey'} size={21} style={{ opacity: 0.8, position: 'absolute', right: 25 }} />
                </View>
            </View>
        )
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

    }

    // to display the top of the hastag
    _hastagView = () => {
        if (this.state.isHeaderVisible && this.props.TopHastag.top.length > 1) {
            return (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 7, paddingLeft: 15 }}
                        data={['trend', ...this.props.TopHastag.top]}
                        keyExtractor={(item) => item.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.one_hastag} onPress={() => this._changeHastag(item)}>
                                <Text style={[{ fontWeight: 'bold', fontSize: 15, lineHeight: 41, letterSpacing: 1, color: '#8E8E8E' }, this._selectedHastag(item)]}>#{item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )
        } else { return null }
    }

    // to select the loading animation
    _displayLoading() {
        return (
            <View style={styles.loading_container}>
                <ActivityIndicator size='large' color="grey" />
            </View>
        )
    }

    // to refresh the publications
    _refreshRequest = () => {
        this.setState({ isRefreshing: true, pagePublication: 1 })
        this.props.actions.resetPublicationActions()
        setTimeout(() => { this.setState({ isRefreshing: false }) }, 1000);
        if (this.state.hastagSelected == 'trend') this.props.actions.getTrend(this.state.pagePublication)
        else this.props.actions.getByName(1, this.state.hastagSelected)
    }

    // select the publication list
    _publicationFeed = () => {
        return (
            <FlatList
                onScroll={this._onScroll}
                style={{ borderTopLeftRadius: 35, borderTopRightRadius: 35, overflow: 'hidden' }}
                data={this.props.DiscoverPublications.publications}
                renderItem={({ item, index }) => <PublicationStandard index={index} navigation={this.props.navigation} publication={item} space={'discover'} />}
                keyExtractor={item => item.id}
            />
        )
    }

    // to select the discover view
    _displayDiscoverView = () => {
        return (
            <View>
                {this._hastagView()}
                {(this.props.DiscoverPublications.isLoading && this.state.pagePublication == 1) ? this._displayLoading() : this._publicationFeed()}
            </View>
        )
    }

    // display the suggestion menu
    _displaySuggestionView = () => {
        return (<SuggestionDiscover navigation={this.props.navigation} currentSearch={this.state.search} searchFilterUpdated={ actifCategory => this.setState({ actifCategory }) }/>)
    }

    render() {
        return (
            <View style={styles.main_container}>
                {this._header()}
                {this.state.search.length <= 2 ? this._displayDiscoverView() : null}
                {this.state.search.length > 2 ? this._displaySuggestionView() : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: '#eef2f4'
    },
    header_container: {
        paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() + 10 : 10,
        paddingBottom: 15,
        paddingHorizontal: 25,
        backgroundColor: '#f9fafc',
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        position: 'relative',
        borderWidth: 0.3,
        borderColor: '#c3c3c36e'
    },
    container_search_bar: {
        height: 45,
        fontSize: 15,
        paddingLeft: 15,
        flexDirection: 'row',
        borderRadius: 25,
        backgroundColor: '#edf1f3',
        overflow: 'hidden',
        alignItems: 'center'
    },
    one_hastag: {
        backgroundColor: 'white',
        marginTop: 8,
        marginBottom: 15,
        marginHorizontal: 5,
        paddingHorizontal: 15,
        borderRadius: 35,
        borderWidth: 0.3,
        borderColor: '#c3c3c36e'
    },
    loading_container: {
        alignItems: 'center',
        justifyContent: 'center',
        top: 250
    },
    search_bar: {
        fontSize: 15,
        paddingLeft: 5,
        paddingVertical: 15,
        width: '100%'
    }
})

const mapStateToProps = state => ({
    MyUser: state.MyUser,
    TopHastag: state.TopHastag,
    DiscoverPublications: state.DiscoverPublications
})

const ActionCreators = Object.assign(
    {},
    MyUserActions,
    TopHastagActions,
    DiscoverPublicationActions,
    SearchBarActions
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Discover)