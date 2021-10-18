import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../../redux/MyUser/actions'
import { bindActionCreators } from 'redux'
import AsyncStorage from '@react-native-community/async-storage'
import I18n from '../../../../assets/i18n/i18n'

class SettingMainMenu extends React.Component {


    constructor(props) {
        super(props)
    }

    // to logout the user
    _logOut = async () => {
        await AsyncStorage.removeItem('userToken')
        this.props.actions.logOut()
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
            case 'SettingMenuProfile': return this.props.navigation.navigate('SettingMenuProfile')
            case 'Logout': return this._logOut()
        }
    }

    render() {
        const listSetting = [
            { title: I18n.t('CORE.Profile'), code: 'SettingMenuProfile' },
            // { title: I18n.t('CORE.Profile'), code: 'SettingProfile' },
            // { title: I18n.t('CORE.Password'), code: 'SettingPassword' },
            // { title: I18n.t('CORE.Ledger'), code: 'SettingLedger' },
            // { title: I18n.t('CORE.Others'), code: 'SettingOther' },
            { title: I18n.t('CORE.Certification'), code: 'SettingCertification' },
            { title: 'Privacy', code: 'SettingPrivacy' },
            { title: I18n.t('SIDEBAR-SETTING.Language'), code: 'SettingLanguage' },
            { title: I18n.t('NAVBAR.Logout'), code: 'Logout' }
        ]

        return (

            <View style={styles.listBtnContainer}>
                <SafeAreaView style={{ flex: 1, flexGrow: 1 }}>

                    {
                        listSetting.map(item => (
                        <TouchableOpacity
                            style={{ flexDirection: 'row', paddingVertical: 5 }}
                            onPress={() => this._actionSelected(item.code)}
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
}

const styles = StyleSheet.create({
    listBtnContainer: {
        height: '100%',
        padding: 15,
        backgroundColor: 'white',
        top: -30,
        paddingTop: 35
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
    },

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

export default connect(mapStateToProps, mapDispatchToProps)(SettingMainMenu)