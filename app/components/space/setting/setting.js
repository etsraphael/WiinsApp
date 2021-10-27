import React from 'react'
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../../redux/MyUser/actions'
import { bindActionCreators } from 'redux'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/pro-duotone-svg-icons'
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-community/async-storage'
import I18n from '../../../../assets/i18n/i18n'
import Modal from 'react-native-modal'
import SettingLanguage from './setting-language'
import SettingCertification from './setting-certification'
import SettingPrivacy from './setting-privacy'

const listPage = [
    { title: I18n.t('CORE.Profile'), code: 'SettingMenuProfile' },
    // { title: I18n.t('CORE.Profile'), code: 'SettingProfile' },
    // { title: I18n.t('CORE.Password'), code: 'SettingPassword' },
    // { title: I18n.t('CORE.Ledger'), code: 'SettingLedger' },
    // { title: I18n.t('CORE.Others'), code: 'SettingOther' },
    { title: I18n.t('CORE.Certification'), code: 'SettingCertification' },
    { title: 'Privacy', code: 'SettingPrivacy' },
    { title: I18n.t('SIDEBAR-SETTING.Language'), code: 'SettingLanguage' },
    { title: I18n.t('NAVBAR.Logout'), code: 'Logout' },
]

class Setting extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            pageSelected: null
        }
    }

    // to logout the user
    _logOut = async () => {
        await AsyncStorage.removeItem('userToken')
        this.props.actions.logOut()
    }

    // to display the header of the profile
    _renderHeader = () => {
        return (
            <View style={{ backgroundColor: '#0C1A32', height: 150, overflow: 'hidden' }}>

                <View style={{ flex: 1, position: 'relative' }}>

                    {/* Back Btn */}
                    <View style={{ flexDirection: 'row', textAlign: 'center', position: 'absolute', width: '100%', zIndex: 1, top: 20, paddingHorizontal: 25, paddingVertical: 20 }}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <FontAwesomeIcon icon={faArrowLeft} color={'white'} size={30} />
                        </TouchableOpacity>
                        <View style={{ paddingLeft: 15, justifyContent: 'center', top: -3 }}>
                            <Text style={{ fontSize: 28, color: 'white', fontFamily: 'Avenir-Heavy' }}>{I18n.t('CORE.Setting')}</Text>
                        </View>
                    </View>

                    {/* Cover Picture */}
                    <LinearGradient
                        colors={['#2CB0D6', '#3087D7', '#6743E0', '#ED6569']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{ height: 150 }}
                    />
                </View>
            </View>
        )
    }

    // show the page selected
    _pageSelected = () => {
        switch (this.state.pageSelected) {
            // navigation for the profile
            case 'profile': return (<View/>)
            case 'settingLanguage': return (<SettingLanguage/>)
            case 'settingPrivacy': return (<SettingPrivacy/>)
            case 'SettingCertification': return (<SettingCertification/>)
            default: return this._defaultPage()
        }
    }

    // default view 
    _defaultPage = () => {
        return (<View/>)
    }

    // open modal 
    _modalView = (mode) => {

        return (
            <Modal
                onSwipeComplete={() => this.setState({ modalVisible: false })}
                isVisible={this.state.modalVisible}
                transparent={true}
                propagateSwipe={true}
                animationIn={'bounceInUp'}
                animationOut={'bounceOutDown'}
                animationInTiming={500}
                style={styles.modalContainer}
                swipeThreshold={50}
                onBackdropPress={() => this.setState({ modalVisible: false })}
            >
                <ScrollView style={{ flex: 1 }}>
                    {this._pageSelected()}
                    {/* <SettingLanguage/> */}
                    {/* <SettingCertification/> */}
                    {/* <SettingPrivacy/> */}
                </ScrollView >
            </Modal>)
    }

    _openModal = () => {
        this.setState({ modalVisible: true })
    }

    _renderMenu = () => {
        return (
            <View style={styles.listBtnContainer}>
                <SafeAreaView style={{ flex: 1 }}>
                    {
                        listPage.map(item => (
                            <TouchableOpacity
                                style={{ flexDirection: 'row', paddingVertical: 5 }}
                                onPress={() => this._openModal(item.code)}
                            >
                                <View style={styles.navigationBtn}>
                                    <Text style={styles.textBtnNaviagation}>{item.title}</Text>
                                </View>
                            </TouchableOpacity>))
                    }
                </SafeAreaView>
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView
                    style={styles.main_container}
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    <View style={{ height: 40 }}>
                        {this._renderHeader()}
                    </View>
                    <View style={{ flex: 1, top: 100, marginBottom: 150 }}>
                        {this._renderMenu()}
                    </View>
                </ScrollView>
                {this._modalView()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    modalContainer: {
        backgroundColor: 'white',
        flex: 1,
        margin: 0,
        overflow: 'hidden',
        marginTop: 110,
        borderTopStartRadius: 25,
        borderTopEndRadius: 25
    },
    listBtnContainer: {
        flex: 1,
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 25,
        top: -30,
        justifyContent: 'flex-end'
    },
    navigationBtn: {
        flex: 1,
        justifyContent: 'center',
        borderRadius: 11,
        backgroundColor: '#F6F7FA',
        paddingVertical: 20,
        paddingHorizontal: 19
    },
    textBtnNaviagation: {
        color: '#000000',
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Avenir-Heavy'
    }
})

const mapStateToProps = state => ({
    MyUser: state.MyUser,
    MyProfile: state.MyProfile
});

const ActionCreators = Object.assign(
    {},
    MyUserActions,
);

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Setting)