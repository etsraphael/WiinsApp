import React from 'react'
import { StyleSheet, SafeAreaView, VirtualizedList, View, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import * as PublicationFeedActions from '../../../../redux/FeedPublications/actions'
import * as SearchActions from '../../../../redux/SearchBar/actions'
import * as PublicationInModalActions from '../../../../redux/PublicationInModal/actions'
import * as StoriesActions from '../../../../redux/Stories/actions'
import { bindActionCreators } from 'redux'
import OneNotification from './one-notification'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft } from '@fortawesome/pro-solid-svg-icons'


const notificationList = [
    { _id: 1, type: 'NotificationComment', read: true },
    { _id: 2, type: 'NotificationResponse', read: true },
    { _id: 3, type: 'NotificationLike', read: false },
    { _id: 4, type: 'NotificationCommentLike', read: true },
    { _id: 5, type: 'NotificationCommentLikePlaylist', read: true },
    { _id: 6, type: 'NotificationCommentResponsePlaylist', read: true },
    { _id: 7, type: 'NotificationRequest', read: true },
    { _id: 8, type: 'NotificationTagCommentPublication', read: true },
    { _id: 9, type: 'NotificationTagCommentPlaylist', read: true },
    { _id: 10, type: 'NotificationTagPublication', read: true },
    { _id: 11, type: 'NotificationFeatPublication', read: true },
    { _id: 12, type: 'NotificationReport', read: true },
    { _id: 13, type: 'NotificationPageReport', read: true },
    { _id: 14, type: 'NotificationVerification', read: true },
    { _id: 15, type: 'NotificationCertification', read: true },
]

class NotificationPage extends React.Component {

    constructor(props) {
        super(props)
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
                    onRefresh={null}
                    refreshing={false}
                    showsVerticalScrollIndicator={false}
                    style={{ marginBottom: 50 }}
                    data={notificationList}
                    renderItem={({ item, index }) => <OneNotification notification={item[index]} />}
                    keyExtractor={(item, index) => item[index]._id}
                    getItemCount={() => notificationList.length}
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
    Stories: state.Stories
})

const ActionCreators = Object.assign(
    {},
    PublicationFeedActions,
    SearchActions,
    PublicationInModalActions,
    StoriesActions
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPage)