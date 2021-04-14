import React from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity, Image, SafeAreaView, VirtualizedList, Text } from 'react-native'
import { connect } from 'react-redux'
import * as PublicationFeedActions from '../../../../redux/FeedPublications/actions'
import * as SearchActions from '../../../../redux/SearchBar/actions'
import * as PublicationInModalActions from '../../../../redux/PublicationInModal/actions'
import * as StoriesActions from '../../../../redux/Stories/actions'
import { bindActionCreators } from 'redux'
import FastImage from 'react-native-fast-image'
import { faEllipsisH } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { getDateTranslated } from '../../../../services/translation/translation-service'

class OneNotification extends React.Component {

    constructor(props) {
        super(props)
    }

    _activeBackground = (read) => {
        if (read) return { backgroundColor: '#eef2f4' }
        else return { backgroundColor: '#cce0ff' }
    }

    _oneNotificationRender = (item) => {
        return (
            <View style={[{ flexDirection: 'row', paddingVertical: 9 }, this._activeBackground(item.read)]}>

                {/* Picture profile notification */}
                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <FastImage
                        style={{ width: 70, height: 70, borderRadius: 70, resizeMode: 'cover' }}
                        source={{ uri: 'https://images.unsplash.com/photo-1617961940214-ae863cb58f1a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1300&q=80', priority: FastImage.priority.normal }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                </View>

                {/* Description */}
                <View style={{ flex: 5, justifyContent: 'center', paddingHorizontal: 15 }}>
                    <Text style={{ fontSize: 15 }}> sdfkjdsnf dsflkmds fljsdnfdsljkndsbdsfsdnf dsljfnsd fsdb fmjbfkds fmhdsf bdsmhfk</Text>
                </View>

                {/* Content Publication */}
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity>
                        <FontAwesomeIcon icon={faEllipsisH} color={'grey'} size={19} />
                    </TouchableOpacity>
                </View>

            </View>
        )
    }


    _notificationCommentFeedRender = (notif) => {
        return (
            <View style={[{ flexDirection: 'row', paddingVertical: 9 }, this._activeBackground(notif.read)]}>

                {/* Picture profile notification */}
                {this._avatarNotificationRender(notif.profile.pictureprofile)}

                {/* Description */}
                <View style={{ flex: 5, justifyContent: 'center', paddingHorizontal: 15 }}>
                    <Text style={{ fontSize: 15 }}>{notif.profile._meta.pseudo} comment your publication </Text>
                    <Text style={{ fontSize: 13, color: 'grey', paddingTop: 2 }}>{getDateTranslated(notif.updatedAt)}</Text>
                </View>

                {/* Content Publication */}
                {this._ellipsiBtnRender()}
            </View>
        )
    }

    _verificationRender = (notif) => {
        return (
            <View style={[{ flexDirection: 'row', paddingVertical: 9 }, this._activeBackground(notif.read)]}>

                {/* Picture profile notification */}
                {this._avatarNotificationRender('https://eps-file-default.s3.eu-west-3.amazonaws.com/icon-wiins.png')}

                {/* Description */}
                <View style={{ flex: 5, justifyContent: 'center', paddingHorizontal: 15 }}>
                    {notif.accepted && <Text style={{ fontSize: 15 }}>You have been verified in the platform. You can enjoy all the extras now. </Text>}
                    {!notif.accepted && <Text style={{ fontSize: 15 }}>You havn't been verified due to your requirements. Try a new time when you're ready</Text>}
                    <Text style={{ fontSize: 13, color: 'grey', paddingTop: 2 }}>{getDateTranslated(notif.updatedAt)}</Text>
                </View>

                {/* Content Publication */}
                {this._ellipsiBtnRender()}

            </View>
        )
    }

    _avatarNotificationRender = (link) => {
        return (
            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                <FastImage
                    style={{ width: 70, height: 70, borderRadius: 70, resizeMode: 'cover' }}
                    source={{ uri: link, priority: FastImage.priority.normal }}
                    resizeMode={FastImage.resizeMode.cover}
                />
            </View>
        )
    }

    _ellipsiBtnRender = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity>
                    <FontAwesomeIcon icon={faEllipsisH} color={'grey'} size={19} />
                </TouchableOpacity>
            </View>
        )
    }

    render = () => {
        switch (this.props.notification.type) {
            case 'NotificationVerification': return this._verificationRender(this.props.notification)
            case 'NotificationComment': return this._notificationCommentFeedRender(this.props.notification)
            default: return this._oneNotificationRender(this.props.notification)
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(OneNotification)