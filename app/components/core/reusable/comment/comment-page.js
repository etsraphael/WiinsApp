import React from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FastImage from 'react-native-fast-image'
import * as SearchActions from '../../../../redux/SearchBar/actions'
import * as CommentListActions from '../../../../redux/CommentList/actions'
import * as SearchBarActions from '../../../../redux/SearchBar/actions'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart } from '@fortawesome/pro-solid-svg-icons'
import { faReply } from '@fortawesome/pro-duotone-svg-icons'
import i18n from '../../../../../assets/i18n/i18n'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { faAngleLeft, faPaperPlane } from '@fortawesome/pro-light-svg-icons'
import TagSuggest from './../suggest/tag-suggest'


class CommentPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            textComment: '',
            baseComment: null,
            tagSearching: '',
            searchingActif: false
        }
    }

    _heartColor = (liked) => {
        if (liked) return '#784BEA'
        else return '#77838F'
    }

    _addPseudoInComment = (profile) => {

        const inputComment = this.state.textComment.replace('@' + this.state.tagSearching, '@' + profile._meta.pseudo + ' ')

        this.setState({
            textComment: inputComment,
            searchingActif: false,
            tagSearching: ''
        })
        this.props.actions.searchResetActions()
    }

    _renderSuggest() {
        return (
            <View style={styles.container_suggestions}>
                <FlatList
                    style={{ margin: 15, borderRadius: 15, backgroundColor: '#acacac1a' }}
                    data={this.props.SearchList.tag}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item }) => (<TagSuggest suggest={item} addPseudoInComment={(event) => this._addPseudoInComment(event)} />)}
                />
            </View>
        )
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
                                <Text style={{ color: '#77838F', lineHeight: 18, paddingTop: 5 }}>
                                    <Text>{comment.text} </Text>
                                    <Text
                                        style={{ marginLeft: 15, color: '#7055E8', fontWeight: '600' }}
                                        onPress={() => this.setState({ baseComment: comment })}
                                    >
                                        ({i18n.t('CORE.answer')})
                                    </Text>
                                </Text>
                                {comment.response > 0 && !comment.responseList ?
                                    <TouchableOpacity
                                        style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }} onPress={() => this.props.actions.getResponseByIdAndPage(comment._id)}>
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
                { !!comment.responseList && comment.responseList.length > 0 ? this._responseList(comment.responseList) : null}
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

    _headerRender = () => {
        return (
            <View style={styles.container_header}>
                <View style={{ flex: 1, height: '100%', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <FontAwesomeIcon icon={faAngleLeft} color={'black'} size={25} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 19 }}>{i18n.t('CORE.Comment')}</Text>
                </View>
                <View style={{ flex: 1 }} />
            </View>
        )
    }

    _bodyRender = () => {
        return (<FlatList
            style={{ flex: 1, paddingTop: 20 }}
            showsVerticalScrollIndicator={false}
            data={this.props.CommentList.commentList.sort((a, b) => a.createdAt.localeCompare(b.createdAt))}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => this._oneComment(item)}
        />)
    }

    _writtingListener = (val) => {
        this.setState({ textComment: val })
    }

    _tagListener = (val) => {

        // active the search
        if (val == '@') {
            return this.setState({ searchingActif: true })
        }

        // stop the search
        if (this.searchingActif && val == ' ') {
            return this.setState({ searchingActif: false })
        }

        // update the search
        if (this.state.searchingActif) {

            let searchingValue

            if (val == 'Backspace' && this.state.tagSearching == '') {
                this.props.actions.searchResetActions()
                return this.setState({ searchingActif: false, tagSearching: '' })
            }
            if (val == 'Backspace') { searchingValue = this.state.tagSearching.slice(0, -1) }
            else { searchingValue = this.state.tagSearching + val }

            this.setState({ tagSearching: searchingValue })

            return this.props.actions.tagSearchAction(searchingValue)
        }

    }

    _sendComment() {
        switch (this.props.route.params.page) {
            case 'modal-feed-publication': {




                const comment = {
                    tagFriend: [''],
                    text: this.state.textComment,
                    baseComment: '',
                    commentProfile: '',
                    publicationId: this.props.route.params.publicationId,
                    publicationProfile: this.props.route.params.publicationProfile,
                    space: 'feed-publication'
                }

                console.log(comment)



                return null
            }
            case 'tube': {
                return null
            }
        }
    }

    _footerRender = () => {
        return (
            <View>
                {!!this.state.baseComment ?
                    <TouchableOpacity
                        onPress={() => this.setState({ baseComment: null })}
                        style={styles.container_badge_response}>
                        <FontAwesomeIcon style={{ marginRight: 5 }} icon={faReply} transform={{ rotate: 180 }} color={'#784BEA'} size={15} />
                        <Text style={{ fontSize: 17, color: '#1E2022' }}>{this.state.baseComment.idProfil._meta.pseudo}<Text style={{ color: '#7055E8', fontWeight: '600' }}> Cancel</Text> </Text>
                    </TouchableOpacity>
                    : null}

                <View style={styles.container_input_comment}>
                    <TextInput
                        placeholder={i18n.t('FEED-PUBLICATION.Write-a-comment')}
                        placeholderTextColor="black"
                        value={this.state.textComment}
                        style={styles.comment_input}
                        onChangeText={(val) => this._writtingListener(val)}
                        onKeyPress={(event) => this._tagListener(event.nativeEvent.key)}
                        onSubmitEditing={() => this._sendComment()}
                        multiline={true}
                        numberOfLines={10}
                    />

                    <TouchableOpacity onPress={() => this._sendComment()}
                        style={{ flex: 3, justifyContent: 'center', alignItems: 'center', borderLeftWidth: 1, borderColor: '#d3d3d34a' }}>
                        <FontAwesomeIcon icon={faPaperPlane} color={'black'} size={19} />
                    </TouchableOpacity>
                </View>
            </View>


        )
    }

    render() {
        return (
            <View style={styles.main_container}>
                {this._headerRender()}
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
                    style={{ flex: 1 }}
                >
                    {this._bodyRender()}
                    {this.props.SearchList.tag.length !== 0 ? this._renderSuggest() : null}
                    {this._footerRender()}
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0
    },
    container_avatar_comment: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 46,
        height: 46
    },
    container_header: {
        height: 55,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderColor: '#b3b3b3',
        borderBottomWidth: 0.3,
    },
    container_badge_response: {
        position: 'absolute',
        top: -32,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderColor: '#d1d1d16b',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    container_input_comment: {
        flexDirection: 'row',
        borderRadius: 15,
        marginVertical: 15,
        marginHorizontal: 20,
        backgroundColor: '#E8E8E8',
        height: 'auto'
    },
    comment_input: {
        flex: 9,
        padding: 15,
        paddingTop: 20,
        color: 'black',
        height: '100%',
        minHeight: 55,
        fontSize: 16
    },
    container_suggestions: {
        flex: 2,
        top: 0,
        position: 'absolute',
        width: '100%',
        borderTopWidth: 1,
        borderColor: '#e6e6e6'
    }
})

const mapStateToProps = state => ({
    MyProfile: state.MyProfile,
    CommentList: state.CommentList,
    SearchList: state.Search
})

const ActionCreators = Object.assign(
    {},
    SearchActions,
    CommentListActions,
    SearchBarActions
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentPage)