import React from 'react'
import { StyleSheet, SafeAreaView, VirtualizedList, View, TouchableOpacity, Text } from 'react-native'
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


class NotificationPage extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount = () => {
        this.props.actions.getNotificationList(1)
    }

    render = () => {
        return (
            <SafeAreaView style={{ flex: 1 }}>

                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ paddingHorizontal: 15 }}>
                        <FontAwesomeIcon icon={faAngleLeft} color={'black'} size={35} />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ fontSize: 30, fontWeight: '700' }}>Notification</Text>
                    </View>
                </View>

                <VirtualizedList
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
                    onMomentumScrollEnd={() => null}
                />
            </SafeAreaView>
        )
    }

}

const styles = StyleSheet.create({

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