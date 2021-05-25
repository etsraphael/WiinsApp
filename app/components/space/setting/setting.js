import React from 'react'
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, FlatList, SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../../redux/MyUser/actions'
import { bindActionCreators } from 'redux'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faCertificate, faSignOut, faUserShield, faLanguage } from '@fortawesome/pro-duotone-svg-icons'
import { faAngleRight } from '@fortawesome/pro-light-svg-icons'
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-community/async-storage'
import I18n from '../../../../assets/i18n/i18n'

class Setting extends React.Component {

    constructor(props) {
        super(props)
    }

    // to logout the user
    _logOut = async () => {
        await AsyncStorage.removeItem('userToken')
        this.props.actions.logOut()
    }

    // to display the header of the profile
    _renderHeader = () => {
        return (
            <View style={{ borderBottomRightRadius: 35, backgroundColor: '#0C1A32', height: 200, overflow: 'hidden' }}>

                <View style={{ flex: 1, position: 'relative' }}>

                    {/* Back Btn */}
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                        style={{ position: 'absolute', left: 25, width: 35, height: 35, top: 55, zIndex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={faArrowLeft} color={'white'} size={30} />
                    </TouchableOpacity>

                    {/* Cover Picture */}

                    <LinearGradient
                        colors={['#f12711', '#f5af19']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{ height: 200 }} />

                    {/* Profile picture and name */}
                    <View style={{ position: 'absolute', top: 130, width: '100%', flexDirection: 'row', paddingHorizontal: 5 }}>
                        <View style={{ flex: 1, paddingHorizontal: 35, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 28, color: 'white', fontFamily: 'Avenir-Heavy' }}>{I18n.t('CORE.Setting')}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    _actionSelected = (code) => {
        switch (code) {
            case 'SettingProfile': return this.props.navigation.navigate('SettingProfile')
            case 'SettingPassword': return this.props.navigation.navigate('SettingPassword')
            case 'SettingLedger': return this.props.navigation.navigate('SettingLedger')
            case 'SettingCertification': return this.props.navigation.navigate('SettingCertification')
            case 'SettingOther': return this.props.navigation.navigate('SettingOther')
            case 'SettingPrivacy': return this.props.navigation.navigate('SettingPrivacy')
            case 'SettingLanguage': return this.props.navigation.navigate('SettingLanguage')
            case 'Logout': return this._logOut()
        }
    }

    // icons setting
    _renderBody = () => {

        const listSetting = [
            // { title: I18n.t('CORE.Profile'), code: 'SettingProfile', icon: <FontAwesomeIcon icon={faUser} color={'#808080a3'} size={30} /> },
            // { title: I18n.t('CORE.Password'), code: 'SettingPassword', icon: <FontAwesomeIcon icon={faKey} color={'#808080a3'} size={30} /> },
            // { title: I18n.t('CORE.Ledger'), code: 'SettingLedger', icon: <FontAwesomeIcon icon={faWallet} color={'#808080a3'} size={30} /> },
            // { title: I18n.t('CORE.Others'), code: 'SettingOther', icon: <FontAwesomeIcon icon={faEllipsisH} color={'#808080a3'} size={30} /> },
            { title: I18n.t('CORE.Certification'), code: 'SettingCertification', icon: <FontAwesomeIcon icon={faCertificate} color={'#808080a3'} size={30} /> },
            { title: 'Privacy', code: 'SettingPrivacy', icon: <FontAwesomeIcon icon={faUserShield} color={'#808080a3'} size={30} /> },
            { title: I18n.t('SIDEBAR-SETTING.Language'), code: 'SettingLanguage', icon: <FontAwesomeIcon icon={faLanguage} color={'#808080a3'} size={30} /> },
            { title: I18n.t('NAVBAR.Logout'), code: 'Logout', icon: <FontAwesomeIcon icon={faSignOut} color={'#808080a3'} size={30} /> }
        ]

        return (
            <View style={{ flex: 1, padding: 15 }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <FlatList
                        style={{ flex: 1, paddingBottom: 45 }}
                        data={listSetting}
                        keyExtractor={(item) => item.code.toString()}
                        ItemSeparatorComponent={() => <View style={{ height: 0.5, backgroundColor: '#c0c0c0' }} />}
                        renderItem={({ item }) =>
                            <TouchableOpacity style={{ flexDirection: 'row', paddingVertical: 15 }} onPress={() => this._actionSelected(item.code)}>
                                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                    {item.icon}
                                </View>
                                <View style={{ flex: 6, justifyContent: 'center' }}>
                                    <Text style={{ color: '#000000', fontSize: 16, fontWeight: '600', fontFamily: 'Avenir-Heavy' }}>{item.title}</Text>
                                </View>
                                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                    <FontAwesomeIcon icon={faAngleRight} color={'#808080a3'} size={30} />
                                </View>
                            </TouchableOpacity>
                        }
                    />
                </SafeAreaView>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={{ height: '100%' }}>
                    {this._renderHeader()}
                    {this._renderBody()}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    onCard: {
        backgroundColor: 'white',
        borderWidth: 0,
        borderRadius: 9,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
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