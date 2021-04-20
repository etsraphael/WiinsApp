import React from 'react'
import { StyleSheet, SafeAreaView, VirtualizedList, View, TouchableOpacity, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'
import * as PublicationFeedActions from '../../../../redux/FeedPublications/actions'
import * as SearchActions from '../../../../redux/SearchBar/actions'
import * as PublicationInModalActions from '../../../../redux/PublicationInModal/actions'
import * as StoriesActions from '../../../../redux/Stories/actions'
import * as NotificationsActions from '../../../../redux/Notifications/actions'
import { bindActionCreators } from 'redux'
import OneNotification from './one-notification'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft } from '@fortawesome/pro-solid-svg-icons'
import FastImage from 'react-native-fast-image'

class NotificationPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            pageSelected: 'earlier'
        }
    }

    componentDidMount = () => {
        this.props.actions.getNotificationList(1)
        this.props.actions.resetNotificationNumberAction()
    }

    _getNextPageOfNotification = () => {
        this.setState({ page: this.state.page++ })
        this.props.actions.getNotificationList(this.state.page)
    }

    _backgroundBtnHeaderActif = () => {
        return { backgroundColor: '#6600ff' }
    }

    _colorTextBtnHeaderActif = () => {
        return { color: 'white' }
    }


    _headerRender = () => {
        return (
            <View style={{ paddingHorizontal: 15, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>

                <TouchableOpacity
                    style={[styles.container_btn_header, this.state.pageSelected == 'earlier' && this._backgroundBtnHeaderActif()]}
                    onPress={() => this.setState({ pageSelected: 'earlier' })}
                >
                    <Text style={[styles.header_text_btn, this.state.pageSelected == 'earlier' && this._colorTextBtnHeaderActif()]}>Earlier</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.container_btn_header, this.state.pageSelected == 'friendRequest' && this._backgroundBtnHeaderActif()]}
                    onPress={() => this.setState({ pageSelected: 'friendRequest' })}
                >
                    <Text style={[styles.header_text_btn, this.state.pageSelected == 'friendRequest' && this._colorTextBtnHeaderActif()]}>Friend Request</Text>
                </TouchableOpacity>

            </View>
        )
    }

    _friendRequestRender = () => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <FastImage
                        style={{ width: 70, height: 70, borderRadius: 70, resizeMode: 'cover' }}
                        source={{ uri: 'https://images.unsplash.com/photo-1618692526479-be59c699eae8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80', priority: FastImage.priority.normal }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                </View>
                <View style={{ flex: 5 }}>

                </View>
            </View>
        )
    }




    render = () => {
        return (
            <SafeAreaView style={{ flex: 1 }}>

                {/* Title page */}
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ paddingHorizontal: 15 }}>
                        <FontAwesomeIcon icon={faAngleLeft} color={'black'} size={35} />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ fontSize: 30, fontWeight: '700' }}>Notification</Text>
                    </View>
                </View>


                {/* Ealier notification */}
                { this.state.pageSelected == 'earlier' &&
                    <VirtualizedList
                        ListHeaderComponent={this._headerRender}
                        onRefresh={() => this.props.actions.refreshList()}
                        refreshing={this.props.Notifications.isRefreshing}
                        showsVerticalScrollIndicator={false}
                        style={{ marginBottom: 50 }}
                        data={this.props.Notifications.list}
                        renderItem={({ item, index }) => <OneNotification notification={item[index]} navigation={this.props.navigation} />}
                        keyExtractor={(item, index) => item[index]._id}
                        getItemCount={() => this.props.Notifications.list.length}
                        getItem={(data) => data}
                        scrollEventThrottle={5}
                        onMomentumScrollEnd={() => this._getNextPageOfNotification()}
                    />
                }

                {/* Friends request notification */}
                { this.state.pageSelected == 'friendRequest' &&
                    <VirtualizedList
                        ListHeaderComponent={this._headerRender}
                        // onRefresh={() => this.props.actions.refreshList()}
                        // refreshing={this.props.Notifications.isRefreshing}
                        showsVerticalScrollIndicator={false}
                        style={{ marginBottom: 50 }}
                        data={[1,2,3,4,5,6,7]}
                        renderItem={({ item, index }) => null}
                        keyExtractor={(item, index) => item[index]}
                        getItemCount={() => 6}
                        getItem={(data) => data}
                        scrollEventThrottle={5}
                        onMomentumScrollEnd={() => alert('oh')}
                    />}




            </SafeAreaView>
        )
    }

}

const styles = StyleSheet.create({
    container_btn_header: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 5,
        borderRadius: 8
    },
    header_text_btn: {
        fontSize: 19,
        fontWeight: '600'
    }
})

const mapStateToProps = state => ({
    FeedPublications: state.FeedPublications,
    MyUser: state.MyUser,
    SearchList: state.Search,
    MyProfile: state.MyProfile,
    Stories: state.Stories,
    Notifications: state.Notifications
})

const ActionCreators = Object.assign(
    {},
    PublicationFeedActions,
    PublicationInModalActions,
    NotificationsActions,
    StoriesActions,
    SearchActions,
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPage)