import React from 'react'
import {
    StyleSheet, View, Text, TouchableOpacity, Image,
    ActivityIndicator, KeyboardAvoidingView, Platform, FlatList, Keyboard, TextInput
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Modal from 'react-native-modal'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import TagSuggest from '../tag-suggest'
import Video from 'react-native-video'
import { getDateTranslated } from '../../../services/translation/translation-service'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCommentLines, faHeart as faHeartEmpty, faPaperPlane } from '@fortawesome/pro-light-svg-icons'
import { faHeart, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import I18n from '../../../i18n/i18n'
import CommentListModal from './comment-list-modal'

class OptionPublicationModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <View>

                <Modal
                    onSwipeComplete={() => this.props.toggleReportModal()}
                    onBackdropPress={() => this.props.toggleReportModal()}
                    isVisible={true}
                    transparent={true}
                    animationIn={'bounceInUp'}
                    animationOut={'bounceOutDown'}
                    animationInTiming={500}
                    style={styles.container_modal}
                    swipeDirection={'down'}
                    propagateSwipe={true}
                >
                    <View style={{ flex: 1, backgroundColor: 'white' }} />
                </Modal>


            </View>
        )
    }

}

const styles = StyleSheet.create({
    container_modal: {
        flex: 1,
        marginHorizontal: 0,
        marginBottom: 0,
        marginTop: '40%',
        overflow: 'hidden',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30
    },
})

const mapStateToProps = state => ({
    MyProfile: state.MyProfile.profile
})

const ActionCreators = Object.assign(
    {}
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(OptionPublicationModal)