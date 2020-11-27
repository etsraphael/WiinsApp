import React from 'react'
import { StyleSheet, View, Text, TextInput, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../../../redux/MyUser/actions'
import * as TopHastagActions from '../../../../redux/TopHastag/actions'
import * as DiscoverPublicationActions from '../../../../redux/DiscoverPublications/actions'
import { bindActionCreators } from 'redux'
import PublicationStandard from '../../core/publication-standard'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

class Discover extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isHeaderVisible: true,
            search: '',
            pagePublication: 0,
            publicationLoading: false,
            hastagSelected: 'trend',
            isRefreshing: false
        }
    }

    componentDidMount() {
        this.props.actions.getTopHastag()
        this._getPublicationList()
    }

    // to load more publications
    _getPublicationList = () => {

        if (!this.props.DiscoverPublications.isLoading && !this.state.publicationLoading) {

            this.setState({ pagePublication: ++this.state.pagePublication, publicationLoading: true  })
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

    // to select the header view of the screen
    _header = () => {
        return (
            <View style={styles.header_container}>

                {/* search bar */}
                <View style={styles.container_search_bar}>
                    <Image style={{ marginLeft: 20, width: 18, height: 18 }} source={require('../../../../assets/image/icon/search-icon.png')} />
                    <Text style={{ marginLeft: 20, color: '#737373' }}>#</Text>
                    <TextInput
                        placeholder='Search'
                        style={styles.search_bar}
                        placeholderTextColor="#737373"
                        onChangeText={(val) => this.setState({ search: val.replace(/\s/g, '') })}
                        value={this.state.search}
                        blurOnSubmit={true}
                        onSubmitEditing={(event) => this._changeHastag(event.nativeEvent.text)}
                    />
                </View>

                {/* top hastag right now */}
                {this.props.TopHastag.top.length > 1 ?
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <FlatList
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 7 }}
                            data={['trend', ...this.props.TopHastag.top]}
                            keyExtractor={(item) => item.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.one_hastag} onPress={() => this._changeHastag(item)}>
                                    <Text style={[{ fontWeight: 'bold', fontSize: 34, fontFamily: 'Avenir-Heavy', lineHeight: 41, letterSpacing: 1, color: '#8E8E8E' }, this._selectedHastag(item)]}>#{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    : null}

            </View>
        )
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
            style={{borderTopLeftRadius: 35, borderTopRightRadius: 35, overflow: 'hidden'}}
            data={this.props.DiscoverPublications.publications}
            renderItem={({ item, index }) => <PublicationStandard index={index} navigation={this.props.navigation} publication={item} space={'discover'} />}
            keyExtractor={item => item.id}
        />
        )
    }

    render() {
        return (
            <View style={styles.main_container}>
                {this._header()}
                {(this.props.DiscoverPublications.isLoading && this.state.pagePublication == 1) ? this._displayLoading() : this._publicationFeed()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() + 5 : 5
    },
    header_container: {
        position: 'relative',
        marginVertical: 5,
        paddingHorizontal: 15
    },
    container_search_bar: {
        height: 38,
        fontSize: 15,
        paddingLeft: 15,
        flexDirection: 'row',
        borderRadius: 18,
        backgroundColor: '#8e8e9329',
        overflow: 'hidden',
        alignItems: 'center'
    },
    one_hastag: {
        marginHorizontal: 8
    },
    loading_container: {
        alignItems: 'center',
        justifyContent: 'center',
        top: 250
    },
    search_bar: {
        fontSize: 15,
        paddingLeft: 5
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
    DiscoverPublicationActions
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Discover)