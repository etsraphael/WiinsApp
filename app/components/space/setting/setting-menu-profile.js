import React from 'react'
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, FlatList, SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../../redux/MyUser/actions'
import { bindActionCreators } from 'redux'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faCertificate, faSignOut, faUserShield, faLanguage } from '@fortawesome/pro-duotone-svg-icons'
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-community/async-storage'
import I18n from '../../../../assets/i18n/i18n'
import { SettingNavigationMain } from '../../../navigation/setting-navigation'

class SettingMenuProfile extends React.Component {

    constructor(props) {
        super(props)
    }

    // to display the header of the profile
    _renderHeader = () => {
        return (
            <View style={{ paddingLeft: 25, paddingTop: 5 }}>
                <Text style={{ fontSize: 28, color: 'grey', fontFamily: 'Avenir-Heavy', fontWeight: '600' }}>{I18n.t('CORE.Profile')}</Text>
            </View>
        )
    }

    _actionSelected = (code) => {
        switch (code) {
            case 'SettingProfile':
            default: return null
        }
    }

    // icons setting
    _renderBody = () => {

        const listSetting = [
            { title: 'General information', code: 'SettingCertification' },
            { title: 'Confidentiality', code: 'SettingPrivacy' },
            { title: 'Language', code: 'SettingLanguage' },
            { title: 'Download data', code: 'SettingLanguage2' },
            { title: 'To become Wiinser Pro', code: 'SettingLanguage3' },
            { title: 'Notifications', code: 'SettingLanguage4' }
        ]

        return (
            <View style={styles.listBtnContainer}>
                <SafeAreaView style={{ flex: 1 }}>




                {
                        listSetting.map(item => (
                        <TouchableOpacity
                            style={{ flexDirection: 'row', paddingVertical: 5 }}
                            onPress={() => this._actionSelected(item.code)}
                            key={item.code}
                        >
                            <View style={styles.navigationBtn}>
                                <Text style={styles.textBtnNaviagation}>{item.title}</Text>
                            </View>
                        </TouchableOpacity>))
                    }





                    {/* <FlatList
                        style={{ flex: 1, paddingBottom: 45 }}
                        data={listSetting}
                        keyExtractor={(item) => item.code.toString()}
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', paddingVertical: 5 }}
                                onPress={() => this._actionSelected(item.code)}
                            >
                                <View style={styles.navigationBtn}>
                                    <Text style={styles.textBtnNaviagation}>{item.title}</Text>
                                </View>
                            </TouchableOpacity>
                        }
                    /> */}




                </SafeAreaView>




            </View>
        )
    }

    _renderMenu = () => {
        return (
            <View style={styles.listBtnContainer}>
                <SafeAreaView style={{ flex: 1, minHeight: 400 }}>
                    {this._renderBody()}
                </SafeAreaView>
            </View>
        )
    }

    render() {


        return (
            <View style={styles.main_container}>
                <ScrollView style={{ height: '100%' }}>
                    {this._renderHeader()}
                    {this._renderMenu()}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: 'white'
    },
    listBtnContainer: {
        flex: 1,
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 25
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingMenuProfile)