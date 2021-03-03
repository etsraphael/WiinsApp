import React from 'react'
import { StyleSheet, View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as SearchActions from '../../../../redux/SearchBar/actions'
import * as CommentListActions from '../../../../redux/CommentList/actions'
import Modal from 'react-native-modal'
import I18n from '../../../i18n/i18n'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faComments } from '@fortawesome/pro-duotone-svg-icons'
import CommentList from './../components/comment-list'
import { faPaperPlane } from '@fortawesome/pro-light-svg-icons'
import { faReply } from '@fortawesome/pro-duotone-svg-icons'

class CommentListModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            textComment: '',
            baseComment: null
        }
    }

    __activePropagateSwipe = () => {
        return this.props._activePropagateSwipe()
    }

    __inactivePropagateSwipe = () => {
        return this.props._inactivePropagateSwipe()
    }

    render() {

        return (
            <Modal
                onSwipeComplete={() => this.props.closeModal()}
                onBackdropPress={() => this.props.closeModal()}
                isVisible={true}
                transparent={true}
                propagateSwipe={false}
                animationIn={'bounceInUp'}
                animationOut={'zoomOut'}
                animationInTiming={500}
                style={{ backgroundColor: '#fffffff2', flex: 1, margin: 0, borderRadius: 35, overflow: 'hidden', marginTop: '40%', marginBottom: 45 }}
                swipeDirection='down'
                swipeThreshold={50}
            >
                <View style={{ flex: 1 }}>
                    {/* Header */}
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 15, paddingBottom: 15, borderBottomWidth: 0.5, borderColor: '#cccccc' }}>
                        <FontAwesomeIcon style={{ marginHorizontal: 15 }} icon={faComments} size={25} color="blue" />
                        <Text style={{ color: '#1E2022', fontWeight: '400', fontSize: 20, fontFamily: 'Gill Sans', }}>{I18n.t('CORE.Comment')}</Text>
                    </View>

                    {/* Body */}
                    <SafeAreaView style={{ height: '80%', overflow: 'hidden' }}>
                        <CommentList
                            responseUser={(event) => this.setState({baseComment: event})}
                            commentList={this.props.CommentList.commentList}
                            activePropagateSwipe={this.__activePropagateSwipe}
                            inactivePropagateSwipe={this.__inactivePropagateSwipe}
                        />
                    </SafeAreaView>

                    <View style={{ position: 'absolute', width: '100%', bottom: 15, borderTopColor: '#d1d1d16b', borderTopWidth: 1}}>

                        {!!this.state.baseComment ?
                        <TouchableOpacity 
                        onPress={() => this.setState({baseComment: null})}
                        style={{position: 'absolute', top: -32, paddingVertical: 5, paddingHorizontal: 15, borderTopRightRadius: 20, borderColor: '#d1d1d16b', borderWidth: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesomeIcon style={{ marginRight: 5 }} icon={faReply} transform={{ rotate: 180 }} color={'#784BEA'} size={15} />
                            <Text style={{fontSize: 17, color: '#1E2022'}}>{this.state.baseComment.idProfil._meta.pseudo}<Text style={{color: '#7055E8', fontWeight: '600'}}> Cancel</Text> </Text>
                        </TouchableOpacity>
                        : null }

                        <View style={{ flexDirection: 'row', borderRadius: 15, marginVertical: 15, marginHorizontal: 20, backgroundColor: '#E8E8E8', height: 'auto' }}>

                            <TextInput
                                placeholder={I18n.t('FEED-PUBLICATION.Write-a-comment')}
                                placeholderTextColor="black"
                                value={this.state.textComment}
                                style={{ flex: 9, padding: 15, paddingTop: 20, color: "black", height: '100%', minHeight: 55, fontSize: 16 }}
                                onChangeText={(val) => this.setState({ textComment: val })}
                                onSubmitEditing={() => null}
                                multiline={true}
                                numberOfLines={10}
                            />

                            <TouchableOpacity onPress={() => null}
                                style={{ flex: 3, justifyContent: 'center', alignItems: 'center', borderLeftWidth: 1, borderColor: '#d3d3d34a' }}>
                                <FontAwesomeIcon icon={faPaperPlane} color={'black'} size={19} />
                            </TouchableOpacity>

                        </View>
                    </View>

                </View>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(CommentListModal)