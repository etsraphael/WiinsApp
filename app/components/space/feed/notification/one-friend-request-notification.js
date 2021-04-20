import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import * as PublicationFeedActions from '../../../../redux/FeedPublications/actions'
import * as SearchActions from '../../../../redux/SearchBar/actions'
import * as PublicationInModalActions from '../../../../redux/PublicationInModal/actions'
import * as StoriesActions from '../../../../redux/Stories/actions'
import * as NotificationActions from '../../../../redux/Notifications/actions'
import { bindActionCreators } from 'redux'
import FastImage from 'react-native-fast-image'
import { faEllipsisH } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { getDateTranslated } from '../../../../services/translation/translation-service'
import { TabActions } from '@react-navigation/native'

class OneFriendRequestNotification extends React.Component {

    constructor(props) {
        super(props)
    }

    render = () => {
        return (
            <View style={{ flexDirection: 'row', paddingVertical: 15 }}>
                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <FastImage
                        style={{ width: 70, height: 70, borderRadius: 70, resizeMode: 'cover' }}
                        source={{ uri: 'https://images.unsplash.com/photo-1618692526479-be59c699eae8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80', priority: FastImage.priority.normal }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                </View>
                <View style={{ flex: 5, justifyContent: 'center' }}>

                    <View style={{paddingHorizontal: 10}}>
                        <Text style={{ fontSize: 15 }}>Rachel sent you a friend request</Text>
                        <Text style={{ fontSize: 13, color: 'grey' }}>2 days ago</Text>
                    </View>

                    <View style={{ flexDirection: 'row', paddingHorizontal: 5 }}>

                        <View style={{ flex: 1 }}>
                            <TouchableOpacity style={[styles.container_answer_btn, { backgroundColor: '#6600ff' }]}>
                                <Text style={{ fontSize: 15, color: 'white', fontWeight: '700' }}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity style={[styles.container_answer_btn, { backgroundColor: '#e6e6e6' }]}>
                                <Text style={{ fontSize: 15, fontWeight: '700' }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>



                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container_answer_btn: {
        margin: 5,
        paddingVertical: 9,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
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
    SearchActions,
    PublicationInModalActions,
    StoriesActions,
    NotificationActions
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(OneFriendRequestNotification)