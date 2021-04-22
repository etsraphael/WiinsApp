import React from 'react'
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../../redux/MyUser/actions'
import { bindActionCreators } from 'redux'
import { faArrowLeft, faDownload } from '@fortawesome/pro-duotone-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import i18n from '../../../../assets/i18n/i18n'
import CheckBox from '@react-native-community/checkbox'
import LinearGradient from 'react-native-linear-gradient'

class SettingCertification extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            pageSelected: 'v',
            verifTerm: true
        }
    }

    _backgroundBtnHeaderActif = () => {
        return { backgroundColor: '#6600ff' }
    }

    _colorTextBtnHeaderActif = () => {
        return { color: 'white' }
    }

    _renderHeader = () => {
        return (
            <View>
                <View style={{ flexDirection: 'row', padding: 15 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                        style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={faArrowLeft} color={'grey'} size={30} />
                    </TouchableOpacity>
                </View>


                <View style={{ flexDirection: 'row', paddingHorizontal: 35 }}>

                    <View style={{ flex: 1 }}>
                        <TouchableOpacity
                            style={[styles.container_btn_header, this.state.pageSelected == 'v' && this._backgroundBtnHeaderActif()]}
                            onPress={() => this.setState({ pageSelected: 'v' })}
                        >
                            <Text style={[styles.header_text_btn, this.state.pageSelected == 'v' && this._colorTextBtnHeaderActif()]}>
                                {i18n.t('SETTING.verified.Verification')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity
                            style={[styles.container_btn_header, this.state.pageSelected == 'c' && this._backgroundBtnHeaderActif()]}
                            onPress={() => this.setState({ pageSelected: 'c' })}
                        >
                            <Text style={[styles.header_text_btn, this.state.pageSelected == 'c' && this._colorTextBtnHeaderActif()]}>Certification</Text>
                        </TouchableOpacity>
                    </View>

                </View>


            </View>
        )
    }

    _uploadIconAndTextRender = () => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faDownload} color={'grey'} size={24} />
                </View>
                <View style={{ flex: 5 }}>
                    <Text>{i18n.t('CORE.Upload-yr-file-here')}</Text>
                </View>
            </View>
        )
    }

    _certificationRender = () => {
        return (
            <View>
                <View style={{ flexDirection: 'row' }}>
                </View>
            </View>
        )
    }

    _saveFile = (type) => {
        switch (type) {
            case 'id-recto': return null
            case 'id-verso': return null
            case 'face-photo': return null
        }
    }

    _verificationRender = () => {
        return (
            <View style={{ padding: 25 }}>

                <Text style={{ textAlign: 'center' }}>{i18n.t('SETTING.verified.Pl-s-t-docs-a-complet-t-form-below')}</Text>

                <TouchableOpacity style={styles.container_section} onPress={() => this._saveFile('id-recto')}>
                    {this._uploadIconAndTextRender()}
                    <View style={{ paddingHorizontal: 15 }}>
                        <Text>{i18n.t('SETTING.verified.Upload-yr-password-id-identity-or-driver-license')}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.container_section} onPress={() => this._saveFile('id-verso')}>
                    {this._uploadIconAndTextRender()}
                    <View style={{ paddingHorizontal: 15 }}>
                        <Text>{i18n.t('SETTING.verified.M-s-t-upload-t-back-of-the-card-if-its-a-national-id-card')}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.container_section} onPress={() => this._saveFile('face-photo')}>
                    {this._uploadIconAndTextRender()}
                    <View style={{ paddingHorizontal: 15 }}>
                        <Text>{i18n.t('SETTING.verified.Upload-a-photo-holding-t-ID-D')}</Text>
                    </View>
                </TouchableOpacity>

                <View style={{ paddingVertical: 15, flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <CheckBox
                            value={this.state.verifTerm}
                            disabled={false}
                            boxType={'square'}
                            lineWidth={1}
                            onValueChange={(newValue) => this.setState({ verifTerm: newValue })}
                            style={{ width: 20, height: 20 }}
                        />
                    </View>
                    <View style={{ flex: 6 }}>
                        <Text>{i18n.t('SETTING.verified.I-agree-t-m-data-may-b-used-t-check-my-account')}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity>
                        <LinearGradient colors={['#f12711', '#f5af19']} start={{ x: 1, y: 1 }} end={{ x: 0, y: 1 }}
                            style={{ borderRadius: 7, paddingHorizontal: 20, paddingVertical: 15 }}>
                            <Text style={{ color: 'white', fontSize: 15, fontWeight: '800' }}>{i18n.t('CORE.Confirm')}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                {/* <Text>{i18n.t('SETTING.verified.Yr-profil-is-currently-being-checked-D')}</Text>
                <Text>{i18n.t('CORE.Loading')}</Text> */}

            </View>
        )
    }

    render() {
        return (
            <ScrollView style={styles.main_container}>
                {this._renderHeader()}
                {this.state.pageSelected == 'c' && this._certificationRender()}
                {this.state.pageSelected == 'v' && this._verificationRender()}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
        marginBottom: 65
    },
    container_btn_header: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginHorizontal: 5,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d9d9d9'
    },
    header_text_btn: {
        fontSize: 19,
        fontWeight: '600'
    },
    container_section: {
        marginVertical: 15,
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: '#d9d9d9',
        borderRadius: 10
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingCertification)