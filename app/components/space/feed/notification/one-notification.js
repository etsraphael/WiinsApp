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
import Snackbar from 'react-native-snackbar'
import I18n from '../../../../../assets/i18n/i18n'

class OneNotification extends React.Component {

    constructor(props) {
        super(props)
    }

    _activeBackground = (read) => {
        if (read) return { backgroundColor: '#eef2f4' }
        else return { backgroundColor: '#cce0ff' }
    }

    _notificationToCode = (item) => {
        return (<View />)
    }

    _notificationCommentFeedRender = (notif) => {
        return (
            <TouchableOpacity
                style={[{ flexDirection: 'row', paddingVertical: 10 }, this._activeBackground(notif.read)]}
                onPress={() => this._goToNotification()}
            >

                {/* Picture profile notification */}
                {this._avatarNotificationRender(notif.profile.pictureprofile)}

                {/* Description */}
                <View style={{ flex: 5, justifyContent: 'center', marginStart: 10, marginEnd: 15 }}>
                    <Text style={{ fontSize: 15 }}>{I18n.t('NOTIFICATIONS.Value-comment-yr-publication', { value: notif.profile._meta.pseudo }) }</Text>
                    <Text style={{ fontSize: 13, color: 'grey', paddingTop: 2 }}>{getDateTranslated(notif.updatedAt)}</Text>
                </View>

                {/* Content Publication */}
                {this._ellipsiBtnRender()}

            </TouchableOpacity>
        )
    }

    _verificationRender = (notif) => {
        return (
            <View style={[{ flexDirection: 'row', paddingVertical: 10 }, this._activeBackground(notif.read)]}>

                {/* Picture profile notification */}
                {this._avatarNotificationRender('https://eps-file-default.s3.eu-west-3.amazonaws.com/icon-wiins.png')}

                {/* Description */}
                <View style={{ flex: 5, justifyContent: 'center', marginStart: 10, marginEnd: 15 }}>
                    {notif.accepted && <Text style={{ fontSize: 15 }}>{I18n.t('VALID-MESSAGE.You-h-been-verified-i-t-platform-D')}</Text>}
                    {!notif.accepted && <Text style={{ fontSize: 15 }}>{I18n.t('ERROR-MESSAGE.You-havnt-been-verified-due-t-yr-requirements-D')}</Text>}
                    <Text style={{ fontSize: 13, color: 'grey', paddingTop: 2 }}>{getDateTranslated(notif.updatedAt)}</Text>
                </View>

                {/* Content Publication */}
                {this._ellipsiBtnRender()}

            </View>
        )
    }

    _notificationCommentLikePlaylistRender = (notif) => {
        return (
            <View style={[{ flexDirection: 'row', paddingVertical: 10 }, this._activeBackground(notif.read)]}>

                {/* Picture profile notification */}
                {this._avatarNotificationRender(notif.profile.pictureprofile)}

                {/* Description */}
                <View style={{ flex: 5, justifyContent: 'center', marginStart: 10, marginEnd: 15 }}>
                    <Text style={{ fontSize: 15 }}>{I18n.t('NOTIFICATIONS.Value-like-yr-comment-in-a-music-playlist', { value: notif.profile._meta.pseudo })}</Text>
                    <Text style={{ fontSize: 13, color: 'grey', paddingTop: 2 }}>{getDateTranslated(notif.updatedAt)}</Text>
                </View>

                {/* Content Publication */}
                {this._ellipsiBtnRender()}

            </View>
        )
    }

    _notificationLikeFeedPublicationRender = (notif) => {
        return (
            <TouchableOpacity 
                style={[{ flexDirection: 'row', paddingVertical: 10}, this._activeBackground(notif.read)]}
                onPress={() => this._goToNotification()}
            >

                {/* Picture profile notification */}
                {this._avatarNotificationRender(notif.profile.pictureprofile)}

                {/* Description */}
                <View style={{ flex: 5, justifyContent: 'center', marginStart: 10, marginEnd: 15 }}>
                    <Text style={{ fontSize: 15 }}>{I18n.t('NOTIFICATIONS.Value-liked-yr-publication-in-t-feed', { value: notif.profile._meta.pseudo })}</Text>
                    <Text style={{ fontSize: 13, color: 'grey', paddingTop: 2 }}>{getDateTranslated(notif.updatedAt)}</Text>
                </View>

                {/* Content Publication */}
                {this._ellipsiBtnRender()}

            </TouchableOpacity>
        )
    }

    _notificationTagCommentPublicationRender = (notif) => {

        return (
            <TouchableOpacity
                style={[{ flexDirection: 'row', paddingVertical: 10 }, this._activeBackground(notif.read)]}
                onPress={() => this._goToNotification()}
            >

                {/* Picture profile notification */}
                {this._avatarNotificationRender(notif.profile.pictureprofile)}

                {/* Description */}
                <View style={{ flex: 5, justifyContent: 'center', marginStart: 10, marginEnd: 15 }}>
                    <Text style={{ fontSize: 15 }}>{I18n.t('NOTIFICATIONS.Value-tagged-you-in-a-publication-in-t-feed', { value: notif.profile._meta.pseudo })}</Text>
                    <Text style={{ fontSize: 13, color: 'grey', paddingTop: 2 }}>{getDateTranslated(notif.updatedAt)}</Text>
                </View>

                {/* Content Publication */}
                {this._ellipsiBtnRender()}

            </TouchableOpacity>
        )
    }

    _notificationTagCommentPlaylistRender = (notif) => {
        return (
            <TouchableOpacity
                style={[{ flexDirection: 'row', paddingVertical: 10 }, this._activeBackground(notif.read)]}
                onPress={() => this._goToNotification()}
            >

                {/* Picture profile notification */}
                {this._avatarNotificationRender(notif.profile.pictureprofile)}

                {/* Description */}
                <View style={{ flex: 5, justifyContent: 'center', marginStart: 10, marginEnd: 15 }}>
                    <Text style={{ fontSize: 15 }}>{I18n.t('NOTIFICATIONS.Value-tagged-you-in-a-publication-a-music-playlist', { value: notif.profile._meta.pseudo })}</Text>
                    <Text style={{ fontSize: 13, color: 'grey', paddingTop: 2 }}>{getDateTranslated(notif.updatedAt)}</Text>
                </View>

                {/* Content Publication */}
                {this._ellipsiBtnRender()}

            </TouchableOpacity>
        )
    }


    _goToNotification = () => {

        this.props.actions.putViewOnNotificationByIdAction(this.props.notification._id)

        switch (this.props.notification.type) {
            case 'NotificationCertification':
            case 'NotificationVerification': {
                return null
            }
            case 'NotificationComment':
            case 'NotificationTagCommentPublication': {

                if(!this.props.notification.publication){
                    return Snackbar.show({ text: I18n.t('ERROR-MESSAGE.T-publication-no-longer-exists'), duration: Snackbar.LENGTH_LONG })
                }

                return this.props.actions.getNotificationTagCommentPublicationAction(this.props.notification.publication._id, this.props.navigation)
            }
            case 'NotificationLike': {
                return this.props.actions.getNotificationPublicationLikeAction(this.props.notification.publication._id, this.props.navigation) 
            }
            case 'NotificationCommentLikePlaylist':
            case 'NotificationTagCommentPlaylist': 
            case 'NotificationCommentResponsePlaylist': {
                const jumpToAction = TabActions.jumpTo('MAIN_MUSIC', { type: 'playlist-redirection', playlistId: this.props.notification.playlist })
                return this.props.navigation.dispatch(jumpToAction)
            }

            case 'NotificationResponse':
            case 'NotificationCommentLike':
            case 'NotificationTagPublication':
            case 'NotificationFeatPublication':
            case 'NotificationReport':
            case 'NotificationPageReport':
            default: return null
        }
    }

    _avatarNotificationRender = (link) => {
        return (
            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                <FastImage
                    style={{ width: 60, height: 60, borderRadius: 70, resizeMode: 'cover' }}
                    source={{ uri: link, priority: FastImage.priority.normal }}
                    resizeMode={FastImage.resizeMode.cover}
                />
            </View>
        )
    }

    _ellipsiBtnRender = () => {
        return null
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
            case 'NotificationTagCommentPlaylist': return this._notificationTagCommentPlaylistRender(this.props.notification)
            case 'NotificationResponse':
            case 'NotificationCommentLike':
            case 'NotificationCommentResponsePlaylist':
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