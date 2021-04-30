import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Modal from 'react-native-modal'
import I18n from '../../../../assets/i18n/i18n'
import { faCheckCircle } from '@fortawesome/pro-duotone-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { sendReport } from '../../../services/report/report-service'
import ActionSheet from 'react-native-actionsheet'
import * as PublicationFeedActions from '../../../redux/FeedPublications/actions'
import * as ProfileActions from '../../../redux/Profile/actions'


const categoriesReport = [
    {
        number: 1,
        type: 'REPORT.Code-Categorie.1',
        descriptions: [
            'REPORT.Report-Modal-Message.Descriptions.1.1',
            'REPORT.Report-Modal-Message.Descriptions.1.2',
            'REPORT.Report-Modal-Message.Descriptions.1.3',
            'REPORT.Report-Modal-Message.Descriptions.1.4',
            'REPORT.Report-Modal-Message.Descriptions.1.5',
            'REPORT.Report-Modal-Message.Descriptions.1.6',
            'REPORT.Report-Modal-Message.Descriptions.1.7'
        ]
    },
    {
        number: 2,
        type: 'REPORT.Code-Categorie.2',
        descriptions: [
            'REPORT.Report-Modal-Message.Descriptions.2.1',
            'REPORT.Report-Modal-Message.Descriptions.2.2',
            'REPORT.Report-Modal-Message.Descriptions.2.3'
        ]
    },
    {
        number: 3,
        type: 'REPORT.Code-Categorie.3',
        descriptions: [
            'REPORT.Report-Modal-Message.Descriptions.3.1',
            'REPORT.Report-Modal-Message.Descriptions.3.2',
            'REPORT.Report-Modal-Message.Descriptions.3.3'
        ]
    },
    {
        number: 4,
        type: 'REPORT.Code-Categorie.4',
        descriptions: [
            'REPORT.Report-Modal-Message.Descriptions.4.1',
            'REPORT.Report-Modal-Message.Descriptions.4.2',
            'REPORT.Report-Modal-Message.Descriptions.4.3',
            'REPORT.Report-Modal-Message.Descriptions.4.4',
            'REPORT.Report-Modal-Message.Descriptions.4.5',
            'REPORT.Report-Modal-Message.Descriptions.4.6',
            'REPORT.Report-Modal-Message.Descriptions.4.7',
            'REPORT.Report-Modal-Message.Descriptions.4.8'
        ]
    },
    {
        number: 5,
        type: 'REPORT.Code-Categorie.5',
        descriptions: [
            'REPORT.Report-Modal-Message.Descriptions.5.1'
        ]
    },
    {
        number: 6,
        type: 'REPORT.Code-Categorie.6',
        descriptions: [
            'REPORT.Report-Modal-Message.Descriptions.6.1',
            'REPORT.Report-Modal-Message.Descriptions.6.2',
            'REPORT.Report-Modal-Message.Descriptions.6.3'
        ]
    },
    {
        number: 7,
        type: 'REPORT.Code-Categorie.7',
        descriptions: [
            'REPORT.Report-Modal-Message.Descriptions.7.1'
        ]
    },
    {
        number: 8,
        type: 'REPORT.Code-Categorie.8',
        descriptions: [
            'REPORT.Report-Modal-Message.Descriptions.8.1',
            'REPORT.Report-Modal-Message.Descriptions.8.2'
        ]
    },
    {
        number: 9,
        type: 'REPORT.Code-Categorie.9',
        descriptions: [
            'REPORT.Report-Modal-Message.Descriptions.9.1',
            'REPORT.Report-Modal-Message.Descriptions.9.2'
        ]
    }
]

class OptionProfileModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            menu: ''
        }
    }

    _separatorItem = () => {
        return (<View style={{ height: 1, backgroundColor: '#9b9b9b45' }} />)
    }

    _defaultMenu = () => {

        const optionsList = [
            {
                code: 'report',
                title: 'Report the profile',
                color: 'red',
                display: true
            },
            {
                code: 'unfollow',
                title: 'Unfollow',
                color: 'black',
                display: this.props.Profile.relation == 'following'
            },
            {
                code: 'unfriend',
                title: 'Unfriend',
                color: 'black',
                display: this.props.Profile.relation == 'friend'
            },
            {
                code: 'blockUser',
                title: 'Block User',
                color: 'black',
                display: true
            }
        ]


        return (
            <View>
                <FlatList
                    scrollEnabled={false}
                    ItemSeparatorComponent={this._separatorItem}
                    style={{ backgroundColor: 'white', borderRadius: 15 }}
                    data={optionsList.filter(x => x.display == true)}
                    keyExtractor={(item) => item.code}
                    renderItem={({ item }) =>
                        <TouchableOpacity
                            style={styles.container_item_menu}
                            onPress={() => this.setState({ menu: item.code })}
                        >
                            <Text style={{ color: item.color }}>{item.title}</Text>
                        </TouchableOpacity>
                    }
                />
                <View style={{ marginVertical: 15 }}>
                    <TouchableOpacity
                        onPress={() => this.props.toggleOptionProfileReportModal()}
                        style={styles.btn_close}>
                        <Text>{I18n.t('CORE.Close')} </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    _sentReportWithCategory = (categorySelected) => {

        const report = {
            type: 'profile',
            id: this.props.Profile._id,
            categorie: [categorySelected]
        }

        return sendReport(report).then(() => this.setState({ menu: 'reportProfileSent' }))
    }

    _reportPublicationView = () => {
        return (
            <View style={{ backgroundColor: 'white', marginBottom: 15, borderRadius: 15 }}>

                {/* Header */}
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 15 }}>
                    <Text style={{ fontSize: 15, fontWeight: '700' }}>{I18n.t('BTN-DROPDOWN.Report')}</Text>
                </View>

                {/* Separator */}
                {this._separatorItem()}

                {/* Message */}
                <View style={{ paddingVertical: 15, paddingHorizontal: 20 }}>
                    <View style={{ paddingBottom: 5 }}>
                        <Text style={{ fontSize: 15, fontWeight: '700' }}>{I18n.t('VALIDATION.W-is-t-reason-to-report-t-post')}</Text>
                    </View>
                    <View>
                        <Text>{I18n.t('VALIDATION.W-is-t-reason-to-report-t-post-D')}</Text>
                    </View>
                </View>

                {this._separatorItem()}
                <FlatList
                    ItemSeparatorComponent={this._separatorItem}
                    style={{ backgroundColor: 'white', borderRadius: 15, maxHeight: 400 }}
                    data={categoriesReport}
                    keyExtractor={(item) => item.number}
                    renderItem={({ item }) =>
                        <TouchableOpacity
                            style={styles.container_item_menu}
                            onPress={() => this._sentReportWithCategory(item.number)}
                        >
                            <Text style={{ color: item.color }}>{I18n.t(item.type)}</Text>
                        </TouchableOpacity>
                    }
                />


            </View>
        )
    }

    _blockUserView = () => {
        return (
            <View style={{ backgroundColor: 'white', marginBottom: 15, borderRadius: 15 }}>

                {/* Header */}
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 15 }}>
                    <Text style={{ fontSize: 15, fontWeight: '700' }}>{I18n.t('CORE.Block-t-user')}</Text>
                </View>

                {/* Separator */}
                {this._separatorItem()}

                {/* Message */}
                <View style={{ paddingVertical: 15, paddingHorizontal: 20 }}>
                    <View style={{ paddingBottom: 5 }}>
                        <Text style={{ fontSize: 15, fontWeight: '700' }}>{I18n.t('VALIDATION.A-y-s-to-block-t-user')}</Text>
                    </View>
                    <View>
                        <Text>{I18n.t('VALIDATION.Y-a-abt-t-block-t-user-D')}</Text>
                    </View>
                </View>

                {this._separatorItem()}
                <TouchableOpacity
                    onPress={() => this.props.toggleOptionProfileReportModal()}
                    style={styles.container_item_menu}
                >
                    <Text>{I18n.t('CORE.No')}</Text>
                </TouchableOpacity>

                {this._separatorItem()}
                <TouchableOpacity
                    style={styles.container_item_menu}
                    onPress={() => this.setState({ menu: 'blockUserSent' })}
                >
                    <Text>{I18n.t('CORE.Yes')}</Text>
                </TouchableOpacity>

            </View>
        )
    }

    _reportProfileSentView = () => {
        return (
            <View style={{ backgroundColor: 'white', marginBottom: 15, borderRadius: 15 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 35 }}>
                    <FontAwesomeIcon icon={faCheckCircle} color={'#33cc33'} secondaryColor={'#f2f2f2'} size={75} />
                </View>
                {this._separatorItem()}
                <View style={{ paddingHorizontal: 15, paddingVertical: 10, marginBottom: 30 }}>
                    <Text>{I18n.t('VALIDATION.T-content-has-been-reported')}</Text>
                </View>
            </View>
        )
    }

    _showActionSheetPublicationDeletion = () => {
        this.ActionSheet.show()
    }

    _blockUserSentView = () => {
        return (
            <View style={{ backgroundColor: 'white', marginBottom: 15, borderRadius: 15 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 35 }}>
                    <FontAwesomeIcon icon={faCheckCircle} color={'#33cc33'} secondaryColor={'#f2f2f2'} size={75} />
                </View>
                {this._separatorItem()}
                <View style={{ paddingHorizontal: 15, paddingVertical: 10, marginBottom: 30 }}>
                    <Text>{I18n.t('VALIDATION.T-user-has-been-blocked-D')}</Text>
                </View>
            </View>
        )
    }

    _unfollowConfirmView = () => {
        return (
            <View style={{ backgroundColor: 'white', marginBottom: 15, borderRadius: 15 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 35 }}>
                    <FontAwesomeIcon icon={faCheckCircle} color={'#33cc33'} secondaryColor={'#f2f2f2'} size={75} />
                </View>
                {this._separatorItem()}
                <View style={{ paddingHorizontal: 15, paddingVertical: 10, marginBottom: 30 }}>
                    <Text>This account is not in your community anymore</Text>
                </View>
            </View>
        )
    }

    _displaySection = () => {
        switch (this.state.menu) {
            case 'report': return this._reportPublicationView()
            case 'blockUser': return this._blockUserView()
            case 'unfollow': return this._unfollowView()
            case 'unfriend': return this._unfriendView()
            case 'reportProfileSent': return this._reportProfileSentView()
            case 'blockUserSent': return this._blockUserSentView()
            case 'unfriendConfirm':
            case 'unfollowSentConfirm': return this._unfollowConfirmView()
            default: return this._defaultMenu()
        }
    }

    _unfollowAction = () => {
        this.props.actions.unfollow(this.props.Profile._id).then(
            () => this.setState({ menu: 'unfollowSentConfirm' })
        )  
    }

    _unfollowView = () => {
        return (
            <View style={{ backgroundColor: 'white', marginBottom: 15, borderRadius: 15 }}>

                {/* Header */}
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                    <Text style={{ fontSize: 15, fontWeight: '700' }}>Are you sure to unfollow this profile ? </Text>
                </View>

                {this._separatorItem()}
                <TouchableOpacity
                    onPress={() => this.props.toggleOptionProfileReportModal()}
                    style={styles.container_item_menu}
                >
                    <Text>{I18n.t('CORE.No')}</Text>
                </TouchableOpacity>

                {this._separatorItem()}
                <TouchableOpacity
                    style={styles.container_item_menu}
                    onPress={() => this._unfollowAction()}
                >
                    <Text>{I18n.t('CORE.Yes')}</Text>
                </TouchableOpacity>

            </View>
        )
    }

    _unfriendView = () => {
        return (
            <View style={{ backgroundColor: 'white', marginBottom: 15, borderRadius: 15 }}>

                {/* Header */}
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                    <Text style={{ fontSize: 15, fontWeight: '700' }}>Are you sure to delete this friend in your friend list ?</Text>
                </View>

                {this._separatorItem()}
                <TouchableOpacity
                    onPress={() => this.props.toggleOptionProfileReportModal()}
                    style={styles.container_item_menu}
                >
                    <Text>{I18n.t('CORE.No')}</Text>
                </TouchableOpacity>

                {this._separatorItem()}
                <TouchableOpacity
                    style={styles.container_item_menu}
                    onPress={() => this.setState({ menu: 'blockUserSent' })}
                >
                    <Text>{I18n.t('CORE.Yes')}</Text>
                </TouchableOpacity>

            </View>
        )
    }

    _actionSheetDeletionCommand = (index) => {
        switch (index) {
            case 0: {
                this.props.actions.deleteFeedPublicationById(this.props.publicationId)
                return this.props.toggleOptionProfileReportModal()
            }
            default: {
                return this.setState({ menu: '' })
            }
        }
    }

    render() {
        return (
            <View>
                <Modal
                    onSwipeComplete={() => this.props.toggleOptionProfileReportModal()}
                    onBackdropPress={() => this.props.toggleOptionProfileReportModal()}
                    isVisible={true}
                    transparent={true}
                    animationIn={'bounceInUp'}
                    animationOut={'bounceOutDown'}
                    animationInTiming={500}
                    style={styles.container_modal}
                    swipeDirection={'down'}
                    propagateSwipe={true}
                >
                    <View style={{ height: 'auto' }}>
                        {this._displaySection()}
                    </View>

                    <ActionSheet
                        ref={o => this.ActionSheet = o}
                        options={['Delete', 'Cancel']}
                        message={'Are you sure to delete this publication ? you will not be able to get it a new time'}
                        cancelButtonIndex={1}
                        destructiveButtonIndex={1}
                        onPress={(index) => this._actionSheetDeletionCommand(index)}
                    />

                </Modal>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container_modal: {
        flex: 1,
        marginHorizontal: 15,
        marginBottom: 0,
        height: 'auto',
        overflow: 'hidden',
        justifyContent: 'flex-end'
    },
    container_item_menu: {
        paddingVertical: 23,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn_close: {
        backgroundColor: 'white',
        paddingVertical: 23,
        paddingHorizontal: 20,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const mapStateToProps = state => ({
    MyProfile: state.MyProfile.profile,
    Profile: state.Profile.profile,
})

const ActionCreators = Object.assign(
    {},
    PublicationFeedActions,
    ProfileActions
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(OptionProfileModal)