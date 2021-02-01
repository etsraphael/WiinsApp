import React from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FastImage from 'react-native-fast-image'
import * as SearchActions from '../../../../redux/SearchBar/actions'
import * as CommentListActions from '../../../../redux/CommentList/actions'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart } from '@fortawesome/pro-solid-svg-icons'
import { faReply } from '@fortawesome/pro-duotone-svg-icons'
import i18n from '../../../i18n/i18n'

class CommentList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    _heartColor = (liked) => {
        if (liked) return '#784BEA'
        else return '#77838F'
    }

    _likeComment = (comment) => {
        if (!comment.liked) {
            const newComment = {
                commentID: comment._id,
                ownerType: 'profile',
                publicationID: comment.publicationId,
                publicationProfile: comment.idProfil._id,
                type: 'base'
            }
            this.props.actions.likeCommentPublication(newComment)
        }
        else this.props.actions.unlikeCommentPublication(comment._id)
    }

    _likeResponse = (comment) => {
        if (!comment.liked) {
            const newComment = {
                commentID: comment._id,
                ownerType: 'profile',
                publicationID: comment.publicationId,
                publicationProfile: comment.idProfil._id,
                type: 'base'
            }
            this.props.actions.likeResponsePublication(newComment)
        }
        else this.props.actions.unlikeResponsePublication(comment._id)
    }

    _oneComment = (comment) => {
        return (
            <View>
                <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 10, position: 'relative' }}>
                    <View style={{ flex: 1 }}>
                        <View style={styles.container_avatar_comment}>
                            <FastImage
                                style={{ width: 45, height: 45, borderRadius: 45 }} resizeMode={FastImage.resizeMode.cover}
                                source={{ uri: comment.idProfil.pictureprofile, priority: FastImage.priority.normal }}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 5 }}>
                        <View style={{ justifyContent: 'center', paddingTop: 5 }}>
                            <View style={{ paddingLeft: 10, position: 'relative' }}>
                                <Text style={{ color: '#1E2022', fontWeight: '600' }}>{comment.idProfil._meta.pseudo}</Text>
                                <Text style={{ color: '#77838F', lineHeight: 18, paddingTop: 5 }}>{comment.text} <TouchableOpacity onPress={() => this.props.responseUser(comment)}><Text style={{ paddingLeft: 5, color: '#7055E8', fontWeight: '600' }}>({i18n.t('CORE.answer')})</Text></TouchableOpacity></Text>
                                {comment.response > 0 && !comment.responseList ?
                                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }} onPress={() => this.props.actions.getResponseByIdAndPage(comment._id)}>
                                        <FontAwesomeIcon style={{ marginRight: 5 }} icon={faReply} transform={{ rotate: 180 }} color={'#784BEA'} size={15} />
                                        <Text>{comment.response} responses </Text>
                                    </TouchableOpacity>
                                    : null}
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 15 }}>
                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this._likeComment(comment)}>
                            <FontAwesomeIcon icon={faHeart} color={this._heartColor(comment.liked)} size={17} />
                            {comment.like > 0 ? <Text style={{ marginHorizontal: 5, color: '#77838F' }}>{comment.like}</Text> : null}
                        </TouchableOpacity>
                    </View>
                </View>
                { !!comment.responseList && comment.responseList.length > 0 ? this._responseList(comment.responseList) : null }
            </View>
        )
    }

    _oneResponse = (comment) => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }} />
                <View style={{ flex: 6, flexDirection: 'row', paddingHorizontal: 15, paddingTop: 10 }}>
                    <View style={{ flex: 1 }}>
                        <View style={styles.container_avatar_comment}>
                            <FastImage
                                style={{ width: 35, height: 35, borderRadius: 35 }} resizeMode={FastImage.resizeMode.cover}
                                source={{ uri: comment.commentProfile.pictureprofile, priority: FastImage.priority.normal }}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 5 }}>
                        <View style={{ justifyContent: 'center', paddingTop: 5 }}>
                            <View style={{ paddingLeft: 10 }}>
                                <Text style={{ color: '#1E2022', fontWeight: '600' }}>{comment.commentProfile._meta.pseudo}</Text>
                                <Text style={{ color: '#77838F', lineHeight: 18, paddingTop: 5 }}>{comment.text}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 15 }}>
                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this._likeResponse(comment)}>
                            <FontAwesomeIcon icon={faHeart} color={this._heartColor(comment.liked)} size={17} />
                            {comment.like > 0 ? <Text style={{ marginHorizontal: 5, color: '#77838F' }}>{comment.like}</Text> : null}
                        </TouchableOpacity>
                    </View>
                </View>
        )
    }

    _responseList = (response) => {
        return (<FlatList
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            data={response.sort((a, b) => a.createdAt.localeCompare(b.createdAt))}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => this._oneResponse(item)}
        />)
    }

    _onScroll = (e) => {
        if (e.nativeEvent.contentOffset.y <= 0) {
            this.props.activePropagateSwipe()
        } else {
            this.props.inactivePropagateSwipe()
        }
    }

    render() {
        return (
            <FlatList
                style={{ flex: 1 }}
                onScroll={this._onScroll}
                showsVerticalScrollIndicator={false}
                data={this.props.commentList.sort((a, b) => a.createdAt.localeCompare(b.createdAt))}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => this._oneComment(item)}
            />
        )
    }
}

const styles = StyleSheet.create({
    container_avatar_comment: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 46,
        height: 46
    }
})

const mapStateToProps = state => ({
    MyProfile: state.MyProfile,
    CommentList: state.CommentList
})

const ActionCreators = Object.assign(
    {},
    SearchActions,
    CommentListActions
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentList)