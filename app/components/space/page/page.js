import React from 'react'
import { StyleSheet, View, ActivityIndicator, TouchableOpacity, Text, ScrollView, LogBox } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FastImage from 'react-native-fast-image'
import * as PageActions from '../../../redux/Page/actions'
import * as ProfilePublicationActions from '../../../redux/ProfilePublications/actions'
import * as PublicationFeedActions from '../../../redux/FeedPublications/actions'
import LinearGradient from 'react-native-linear-gradient'
import ProfilePublication from './../profile/profile-publication'
import i18n from '../../../../assets/i18n/i18n'

class Page extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            space: 'feed',
            pagePublication: 1,
            publicationLoading: false
        }

        LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
    }

    // to show the publications feed
    _getPublicationList = () => {
        if (!this.props.ProfilePublications.isLoading) {
            this.setState({ pagePublication: ++this.state.pagePublication, publicationLoading: true })
            this.props.actions.getByModeProfile(this.state.pagePublication, 'page/' + this.props.navigation.state.params.pageId)
            setTimeout(() => this.setState({ publicationLoading: false }), 3000);
        }
    }

    componentWillUnmount(){
        this.props.actions.getByModeProfile(1, 'FollowerAndFriend')
    }

    componentDidMount() {
        this.props.actions.getByModeProfile(1, 'page/' + this.props.navigation.state.params.pageId)
        this.props.actions.getPage(this.props.navigation.state.params.pageId)
    }

    // to display the follow/unfollow button
    _renderBtnRelation = () => {

        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {this.props.Page.page.followed ?  this._displayBtnUnFollow() : this._displayBtnFollow()}
            </View>
        )
    }

    // to display the unfollow button
    _displayBtnUnFollow = () => {
        return (
            <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#e65c00', '#F9D423']} style={styles.btn_nav}
            style={{ paddingVertical: 12, paddingHorizontal: 12, borderRadius: 8, backgroundColor: '#e6e6e6', alignItems: 'center', justifyContent: 'center', marginHorizontal: 15 }}>
                <TouchableOpacity onPress={() => this.props.actions.unfollowPage(this.props.Page.page._id)}>
                    <Text style={{ fontSize: 12, color: 'white', fontWeight: '600' }}>{i18n.t('CORE.Subscribed')}</Text>
                </TouchableOpacity>
            </LinearGradient>
        )
    }

    // to display the follow button
    _displayBtnFollow = () => {
        return (
            <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#2193b0', '#6dd5ed']} style={styles.btn_nav}
            style={{ paddingVertical: 12, paddingHorizontal: 15, borderRadius: 8, backgroundColor: '#e6e6e6', alignItems: 'center', justifyContent: 'center', marginHorizontal: 15 }}>
                <TouchableOpacity onPress={() => this.props.actions.followPage(this.props.Page.page._id)}>
                    <Text style={{ fontSize: 12, color: 'white', fontWeight: '600' }}>{i18n.t('CORE.Follow')}</Text>
                </TouchableOpacity>
            </LinearGradient>
        )
    }

    // to display the header of the page view
    _renderHeader = () => {

        return (
            <View style={styles.header_container}>
                <View style={{ flex: 1 }}>
                    <FastImage style={{ width: '100%', height: 220 }} resizeMode={FastImage.resizeMode.cover}
                        source={{
                            uri: this.props.Page.page.picturecover,
                            priority: FastImage.priority.normal,
                        }}
                    />
                </View>
                <View style={styles.sub_header}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 3, alignItems: 'center', flexDirection: 'column-reverse' }}>
                            {this._renderBtnRelation()}
                        </View>
                        <View style={{ flex: 4, alignItems: 'center' }}>
                            <View style={styles.border_avatar}>
                                <FastImage
                                    style={{ height: 150, width: 150, borderRadius: 78 }}
                                    source={{
                                        uri: this.props.Page.page.pictureprofile,
                                        priority: FastImage.priority.normal,
                                    }}
                                    resizeMode={FastImage.resizeMode.cover}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 3 }}>
                            <View style={{ position: 'absolute', bottom: 0, alignItems: 'center', marginLeft: 15 }}>
                                <Text>Community</Text>
                                <Text>{this.props.Page.page.followers}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ paddingVertical: 15, fontSize: 27 }}>{this.props.Page.page.name}</Text>
                </View>
            </View>
        )
    }

    // to display the animation loading
    _displayLoading = () => {
        return (
            <View style={styles.loading_container}>
                <ActivityIndicator size='large' color="grey" />
            </View>
        )
    }

    // to display the main view
    _displayPage = () => {

        return (
            <View>
                {this._renderHeader()}
                {this._renderBody()}
            </View>
        )
    }

    // to display the publication list
    _renderBody = () => {

        return (
            <View style={styles.container}>
                <ProfilePublication />
            </View>
        )
    }

    render() {

        return (
            <View style={styles.container}>
                <ScrollView
                    scrollEventThrottle={5}
                    onMomentumScrollEnd={() => this._getPublicationList()}>
                    {this.props.Page.isLoading ? this._displayLoading() : null}
                    {this.props.Page.page !== null ? this._displayPage() : null}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 300,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header_container: {
        height: 350,
        position: 'relative',
    },
    sub_header: {
        height: 120,
        left: 0,
        bottom: 25,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    border_avatar: {
        height: 156,
        width: 156,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 78,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
})

const mapStateToProps = state => ({
    ProfilePublications: state.ProfilePublications,
    Profile: state.Profile,
    Page: state.Page
})

const ActionCreators = Object.assign(
    {},
    PageActions,
    PublicationFeedActions,
    ProfilePublicationActions
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Page)