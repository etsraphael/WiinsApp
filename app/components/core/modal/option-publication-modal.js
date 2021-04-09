import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Modal from 'react-native-modal'
import I18n from '../../../../assets/i18n/i18n'
import { faCheckCircle } from '@fortawesome/pro-duotone-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { sendReport } from './../../../services/report/report-service'



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

class OptionPublicationModal extends React.Component {

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
                code: 'reportPublication',
                title: 'Report Publication',
                color: 'red',
                display: this.props.myProfileId !== this.props.ownerId
            },
            { 
                code: 'deletePublication',
                title: 'Delete Publication',
                color: 'black',
                display: this.props.myProfileId == this.props.ownerId
            },
            { 
                code: 'blockUser', 
                title: 'Block User', 
                color: 'black', 
                display: this.props.myProfileId !== this.props.ownerId
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
                        onPress={() => this.props.toggleReportModal()}
                        style={styles.btn_close}>
                        <Text>{I18n.t('CORE.Close')} </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    _sentReportWithCategory = (categorySelected) => {

        const report = {
            type: 'feed-publication',
            id: this.props.publicationId,
            categorie: categorySelected
        }

        return sendReport(report).then(() => this.setState({ menu: 'reportPublicationSent' }))
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
                    onPress={() => this.props.toggleReportModal()}
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

    _reportPublicationSentView = () => {
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

    _displaySection = () => {
        switch (this.state.menu) {
            case 'reportPublication': return this._reportPublicationView()
            case 'blockUser': return this._blockUserView()
            case 'reportPublicationSent': return this._reportPublicationSentView()
            case 'blockUserSent': return this._blockUserSentView()
            default: return this._defaultMenu()
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
                    <View style={{ height: 'auto' }}>
                        {this._displaySection()}
                    </View>
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
    MyProfile: state.MyProfile.profile
})

const ActionCreators = Object.assign(
    {}
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(OptionPublicationModal)