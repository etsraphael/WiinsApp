import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as SearchActions from '../../../../redux/SearchBar/actions'
import * as CommentListActions from '../../../../redux/CommentList/actions'
import Modal from 'react-native-modal'
import I18n from '../../../i18n/i18n'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faComments } from '@fortawesome/pro-duotone-svg-icons'
import CommentList from './../components/comment-list'


class CommentListModal extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        return (
            <Modal
                onSwipeComplete={() => this.props.closeModal()}
                onBackdropPress={() => this.props.closeModal()}
                isVisible={true}
                transparent={true}
                propagateSwipe={true}
                animationIn={'bounceInUp'}
                animationOut={'zoomOut'}
                animationInTiming={500}
                style={{ backgroundColor: '#fffffff2', flex: 1, margin: 0, borderRadius: 35, overflow: 'hidden', marginTop: '40%' }}
                swipeDirection='down'
                swipeThreshold={50}
            >
                <View style={{ flex: 1 }}>
                    {/* Header */}
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 15, paddingBottom: 15, borderBottomWidth: 0.5, borderColor: '#cccccc' }}>
                        <FontAwesomeIcon style={{ marginHorizontal: 15 }} icon={faComments} size={25} color="blue" />
                        <Text style={{ color: '#1E2022', fontWeight: '400', fontSize: 20, fontFamily: 'Gill Sans', }}>{I18n.t('CORE.Comment')}</Text>
                    </View>

                    {/* Body and footer */}
                    <CommentList commentList={this.props.CommentList.commentList}/>
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