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

class OneNotification extends React.Component {

    constructor(props) {
        super(props)
    }

    _activeBackground = (read) => {
        if (read) return { backgroundColor: '#eef2f4' }
        else return { backgroundColor: '#cce0ff' }
    }

    _notificationToCode = (item) => {
        console.log(item)
        return (<View />)
    }

    _notificationCommentFeedRender = (notif) => {
        return (
            <TouchableOpacity
                style={[{ flexDirection: 'row', paddingVertical: 9 }, this._activeBackground(notif.read)]}
                onPress={() => alert('oh')}
            >

                {/* Picture profile notification */}
                {this._avatarNotificationRender(notif.profile.pictureprofile)}

                {/* Description */}
                <View style={{ flex: 5, justifyContent: 'center', paddingHorizontal: 15 }}>
                    <Text style={{ fontSize: 15 }}>{notif.profile._meta.pseudo} comment your publication </Text>
                    <Text style={{ fontSize: 13, color: 'grey', paddingTop: 2 }}>{getDateTranslated(notif.updatedAt)}</Text>
                </View>

                {/* Content Publication */}
                {this._ellipsiBtnRender()}

            </TouchableOpacity>
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

    _notificationCommentLikePlaylistRender = (notif) => {
        return (
            <View style={[{ flexDirection: 'row', paddingVertical: 9 }, this._activeBackground(notif.read)]}>

                {/* Picture profile notification */}
                {this._avatarNotificationRender(notif.profile.pictureprofile)}

                {/* Description */}
                <View style={{ flex: 5, justifyContent: 'center', paddingHorizontal: 15 }}>
                    <Text style={{ fontSize: 15 }}>{notif.profile._meta.pseudo} like your comment in a music playlist </Text>
                    <Text style={{ fontSize: 13, color: 'grey', paddingTop: 2 }}>{getDateTranslated(notif.updatedAt)}</Text>
                </View>

                {/* Content Publication */}
                {this._ellipsiBtnRender()}

            </View>
        )
    }

    _notificationLikeFeedPublicationRender = (notif) => {
        return (
            <View style={[{ flexDirection: 'row', paddingVertical: 9 }, this._activeBackground(notif.read)]}>

                {/* Picture profile notification */}
                {this._avatarNotificationRender(notif.profile.pictureprofile)}

                {/* Description */}
                <View style={{ flex: 5, justifyContent: 'center', paddingHorizontal: 15 }}>
                    <Text style={{ fontSize: 15 }}>{notif.profile._meta.pseudo} like your publication in the feed </Text>
                    <Text style={{ fontSize: 13, color: 'grey', paddingTop: 2 }}>{getDateTranslated(notif.updatedAt)}</Text>
                </View>

                {/* Content Publication */}
                {this._ellipsiBtnRender()}

            </View>
        )
    }

    _notificationTagCommentPublicationRender = (notif) => {

        return (
            <TouchableOpacity
                style={[{ flexDirection: 'row', paddingVertical: 9 }, this._activeBackground(notif.read)]}
                onPress={() => this._goToNotification()}
            >

                {/* Picture profile notification */}
                {this._avatarNotificationRender(notif.profile.pictureprofile)}

                {/* Description */}
                <View style={{ flex: 5, justifyContent: 'center', paddingHorizontal: 15 }}>
                    <Text style={{ fontSize: 15 }}>{notif.profile._meta.pseudo} tagged you in a publication in the feed </Text>
                    <Text style={{ fontSize: 13, color: 'grey', paddingTop: 2 }}>{getDateTranslated(notif.updatedAt)}</Text>
                </View>

                {/* Content Publication */}
                {this._ellipsiBtnRender()}

            </TouchableOpacity>
        )
    }


    _goToNotification = () => {
        switch (this.props.notification.type) {

            case 'NotificationTagCommentPublication': {
                return this.props.actions.getNotificationTagCommentPublicationAction(this.props.notification.publication._id, this.props.navigation)
            }


            case 'NotificationVerification':
            case 'NotificationComment':
            case 'NotificationCommentLikePlaylist':
            case 'NotificationLike':
            case 'NotificationResponse':
            case 'NotificationCommentLike':
            case 'NotificationCommentResponsePlaylist':
            case 'NotificationTagCommentPlaylist':
            case 'NotificationTagPublication':
            case 'NotificationFeatPublication':
            case 'NotificationReport':
            case 'NotificationPageReport':
            case 'NotificationCertification':
            default: return alert(this.props.notification.type)
        }
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
            case 'NotificationCommentLikePlaylist': return this._notificationCommentLikePlaylistRender(this.props.notification)
            case 'NotificationLike': return this._notificationLikeFeedPublicationRender(this.props.notification)
            case 'NotificationTagCommentPublication': return this._notificationTagCommentPublicationRender(this.props.notification)
            case 'NotificationResponse':
            case 'NotificationCommentLike':
            case 'NotificationCommentResponsePlaylist':
            case 'NotificationTagCommentPlaylist':
            case 'NotificationTagPublication':
            case 'NotificationFeatPublication':
            case 'NotificationReport':
            case 'NotificationPageReport':
            case 'NotificationCertification':
            default: return this._notificationToCode(this.props.notification)
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
    StoriesActions,
    NotificationActions
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(OneNotification)