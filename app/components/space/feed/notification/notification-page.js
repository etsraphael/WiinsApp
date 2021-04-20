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
import OneFriendRequestNotification from './one-friend-request-notification'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft } from '@fortawesome/pro-solid-svg-icons'

class NotificationPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            pageSelected: 'earlier'
        }
    }

    componentDidMount = () => {
        this.props.actions.resetActivityNotificationNumberAction()
        this.props.actions.getActivityNotificationList(1)
        this.props.actions.getRequestNotificationList(1)
    }

    _getNextPageOfNotification = () => {
        this.setState({ page: this.state.page++ })
        this.props.actions.getActivityNotificationList(this.state.page)
    }

    _backgroundBtnHeaderActif = () => {
        return { backgroundColor: '#6600ff' }
    }

    _colorTextBtnHeaderActif = () => {
        return { color: 'white' }
    }

    _rendeRequestNumber = () => {
        if (this.props.Notifications.requestNumber > 0) {
            return (<Text>({this.props.Notifications.requestNumber})</Text>)
        }
    }

    _goTofriendRequest = () => {
        this.props.actions.resetFriendRequestNotificationNumberAction()
        this.setState({ pageSelected: 'friendRequest' })
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
                    onPress={() => this._goTofriendRequest()}
                >
                    <Text style={[styles.header_text_btn, this.state.pageSelected == 'friendRequest' && this._colorTextBtnHeaderActif()]}>
                        Friend Request {this._rendeRequestNumber()}
                    </Text>
                </TouchableOpacity>

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
                        onRefresh={() => this.props.actions.refreshActivityNotifications()}
                        refreshing={this.props.Notifications.activity_isRefreshing}
                        showsVerticalScrollIndicator={false}
                        style={{ marginBottom: 50 }}
                        data={this.props.Notifications.activity_list}
                        renderItem={({ item, index }) => <OneNotification notification={item[index]} navigation={this.props.navigation} />}
                        keyExtractor={(item, index) => item[index]._id}
                        getItemCount={() => this.props.Notifications.activity_list.length}
                        getItem={(data) => data}
                        scrollEventThrottle={5}
                        onMomentumScrollEnd={() => this._getNextPageOfNotification()}
                    />
                }

                {/* Friends request notification */}
                { this.state.pageSelected == 'friendRequest' &&
                    <VirtualizedList
                        ListHeaderComponent={this._headerRender}
                        onRefresh={() => null}
                        refreshing={this.props.Notifications.request_isRefreshing}
                        showsVerticalScrollIndicator={false}
                        style={{ marginBottom: 50 }}
                        data={this.props.Notifications.request_list}
                        renderItem={({ item, index }) => <OneFriendRequestNotification notification={item[index]} navigation={this.props.navigation} />}
                        keyExtractor={(item, index) => item[index]}
                        getItemCount={() => this.props.Notifications.request_list.length}
                        getItem={(data) => data}
                        scrollEventThrottle={5}
                    />
                }

            </SafeAreaView>
        )
    }

}

const styles = StyleSheet.create({
    container_btn_header: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 5,
        borderRadius: 8,
        backgroundColor: '#d9d9d9'
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