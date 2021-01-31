import React from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native'
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
    }

    // to get the view one comment
    _oneComment(comment) {
        return (
            <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 10 }}>
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
                        <View style={{ paddingLeft: 10 }}>
                            <Text style={{ color: '#1E2022', fontWeight: '600' }}>{comment.idProfil._meta.pseudo}</Text>
                            <Text style={{ color: '#77838F', lineHeight: 18, paddingTop: 5}}>{comment.text} sdlkvsdof sdflsdf jsdlfksj dflksdjflsdkfjsdl fsdflksdjfsldfnskg sfgj dfgkjdfg nkdfgnfdgd nfgdfk gjdfn <Text style={{paddingLeft: 5, color: '#7055E8', fontWeight: '600'}}>{i18n.t('CORE.answer')}</Text></Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 5}}>
                                <FontAwesomeIcon style={{marginRight: 5}} icon={faReply} transform={{ rotate: 180 }} color={'#784BEA'} size={15} />
                                <Text>8 responses </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 15 }}>
                    <TouchableOpacity style={{flexDirection: 'row'}}>
                        <FontAwesomeIcon icon={faHeart} color={'#784BEA'} size={17} />
                        <Text style={{marginHorizontal: 5, color: '#77838F'}}>12</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        return (
            <ScrollView style={{flex: 1}}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={[...this.props.commentList.sort((a, b) => a.createdAt.localeCompare(b.createdAt)), ...this.props.commentList.sort((a, b) => a.createdAt.localeCompare(b.createdAt)), ...this.props.commentList.sort((a, b) => a.createdAt.localeCompare(b.createdAt)), ...this.props.commentList.sort((a, b) => a.createdAt.localeCompare(b.createdAt)), ...this.props.commentList.sort((a, b) => a.createdAt.localeCompare(b.createdAt)), ...this.props.commentList.sort((a, b) => a.createdAt.localeCompare(b.createdAt)), ...this.props.commentList.sort((a, b) => a.createdAt.localeCompare(b.createdAt))]}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item }) => this._oneComment(item) }
                />
            </ScrollView>
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