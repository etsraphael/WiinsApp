import React from 'react'
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../../redux/MyUser/actions'
import { bindActionCreators } from 'redux'
import { faArrowLeft, faDownload } from '@fortawesome/pro-duotone-svg-icons'
import { faCheck } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import i18n from '../../../../assets/i18n/i18n'
import CheckBox from '@react-native-community/checkbox'
import LinearGradient from 'react-native-linear-gradient'
import { launchImageLibrary } from 'react-native-image-picker'
import { uploadImageFileWithSignedUrl } from './../../../services/upload/upload'
import Snackbar from 'react-native-snackbar'
import AsyncStorage from '@react-native-community/async-storage'

class SettingCertification extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            pageSelected: 'v',
            verifTerm: false,
            certifTerm: false,
            idRectoReceived: false,
            idVersoReceived: false,
            facePhotoReceived: false,
            idRectoIsLoading: false,
            idVersoIsLoading: false,
            facePhotoIsLoading: false,
            idRectoLink: null,
            idVersoLink: null,
            facePhotoLink: null,
            verificationIsLoading: false,
            certificationIsLoading: false,
            verificationSent: false,
            certificationSent: false
        }
    }

    UNSAFE_componentWillMount = async () => {
        switch (this.props.MyProfile.profile.levelCertification) {
            case 0: {
                await this._checkVerificationState()
                await this._checkCertificationState()
                return null
            }

            case 1: {
                await this._checkCertificationState()
                return null
            }
            default: return null
        }
    }

    _checkCertificationState = async () => {

        this.setState({ certificationIsLoading: true })

        const token = await AsyncStorage.getItem('userToken')
        return fetch('https://wiins-backend.herokuapp.com/admin/getCertificationProfile', {
            method: 'GET',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.status == 200) {
                    this.setState({ certificationIsLoading: false, certificationSent: true })
                } else {
                    this.setState({ certificationIsLoading: false })
                }
            }).catch(() => {
                this.setState({ certificationIsLoading: false })
            })
    }

    _checkVerificationState = async () => {

        this.setState({ verificationIsLoading: true })

        const token = await AsyncStorage.getItem('userToken')
        return fetch('https://wiins-backend.herokuapp.com/admin/getVerificationProfile', {
            method: 'GET',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.status == 200) {
                    this.setState({ verificationIsLoading: false, verificationSent: true })
                } else {
                    this.setState({ verificationIsLoading: false })
                }
            }).catch(() => {
                this.setState({ verificationIsLoading: false })
            })
    }

    _backgroundBtnHeaderActif = () => {
        return { backgroundColor: '#6600ff' }
    }

    _colorTextBtnHeaderActif = () => {
        return { color: 'white' }
    }

    _loadingForSectionRender = () => {
        return (
            <View style={{ position: 'absolute', right: 8, top: 8 }}>
                <ActivityIndicator size='large' color="grey" />
            </View>
        )
    }

    _renderHeader = () => {
        return (
            <View>
                <View style={{ flexDirection: 'row', padding: 15 }}>
                    <TouchableOpacity onPress={() => this.props.closeModal()}
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
                            <Text style={[styles.header_text_btn, this.state.pageSelected == 'c' && this._colorTextBtnHeaderActif()]}>
                                {i18n.t('CORE.Certification')}
                            </Text>
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

    _confirmationRender = (text) => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 35 }}>
                <FontAwesomeIcon style={{ marginVertical: 15 }} icon={faCheck} color={'#29a329'} size={54} />
                <Text style={{ fontSize: 19, fontWeight: '800', color: 'grey' }}>{i18n.t(text)}</Text>
            </View>
        )
    }

    _certificationRender = () => {

        if (this.props.MyProfile.profile.levelCertification == 2) {
            return this._confirmationRender('SETTING.verified.Already-certified')
        }

        if (this.state.certificationIsLoading) {
            return this._loadingMenuRender()
        }

        if (this.state.certificationSent) {
            return this._pendingRequest()
        }

        return (
            <View>
                <View style={{ padding: 25 }}>
                    <Text style={{ textAlign: 'center' }}>{i18n.t('SETTING.verified.Y-m-complet-t-following-cdt-t-b-certified')}</Text>

                    <View style={styles.separator_line} />

                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 16, textAlign: 'center' }}>{i18n.t('SETTING.verified.H-m-t-1000-user-in-t-community')}</Text>
                    </View>

                    <View style={styles.separator_line} />


                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 16, textAlign: 'center' }}>{i18n.t('SETTING.verified.Have-content-t-d-not-offend-the-community')}</Text>
                    </View>

                    <View style={styles.separator_line} />


                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 16, textAlign: 'center' }}>{i18n.t('SETTING.verified.T-b-accepted-b-t-administration')}</Text>
                    </View>


                    <View style={styles.separator_line} />

                    <View style={{ paddingVertical: 15, flexDirection: 'row' }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <CheckBox
                                value={this.state.certifTerm}
                                disabled={false}
                                boxType={'square'}
                                lineWidth={1}
                                onValueChange={(newValue) => this.setState({ certifTerm: newValue })}
                                style={{ width: 20, height: 20 }}
                            />
                        </View>
                        <View style={{ flex: 6 }}>
                            <Text>{i18n.t('SETTING.verified.I-agree-t-m-data-may-b-used-t-check-my-account')}</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 25 }}>
                        <TouchableOpacity onPress={() => this._submitCertification()}>
                            <LinearGradient colors={['#f12711', '#f5af19']} start={{ x: 1, y: 1 }} end={{ x: 0, y: 1 }}
                                style={{ borderRadius: 7, paddingHorizontal: 20, paddingVertical: 15 }}>
                                <Text style={{ color: 'white', fontSize: 15, fontWeight: '800' }}>{i18n.t('CORE.Confirm')}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        )
    }

    _saveFile = (type) => {

        const options = { storageOptions: { skipBackup: true, path: 'images' } }

        launchImageLibrary(options, (response) => {
            if (!response.uri) return null
            else return this._sendFile(response.uri, type)
        })

    }


    _sendFile = async (file, type) => {

        switch (type) {
            case 'id-recto': {
                this.setState({ idRectoIsLoading: true })
                const upload = await uploadImageFileWithSignedUrl('eps-file-verification', file)
                if (!!upload) return this.setState({ idRectoReceived: true, idRectoIsLoading: false, idRectoLink: upload })
                else return this.setState({ idRectoReceived: false, idRectoIsLoading: false, idRectoLink: null })
            }
            case 'id-verso': {
                this.setState({ idVersoIsLoading: true })
                const upload = await uploadImageFileWithSignedUrl('eps-file-verification', file)
                if (!!upload) return this.setState({ idVersoReceived: true, idVersoIsLoading: false, idVersoLink: upload })
                else return this.setState({ idVersoReceived: false, idVersoIsLoading: false, idVersoLink: null })
            }
            case 'face-photo': {
                this.setState({ facePhotoIsLoading: true })
                const upload = await uploadImageFileWithSignedUrl('eps-file-verification', file)
                if (!!upload) return this.setState({ facePhotoReceived: true, facePhotoIsLoading: false, facePhotoLink: upload })
                else return this.setState({ facePhotoReceived: false, facePhotoIsLoading: false, facePhotoLink: null })
            }
        }
    }

    _pendingRequest = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 45 }}>
                <Text style={{ fontSize: 16, textAlign: 'center' }}>{i18n.t('SETTING.verified.Yr-profil-is-currently-being-checked-D')}</Text>
            </View>
        )
    }

    _verificationRender = () => {

        if (this.props.MyProfile.profile.levelCertification > 0) {
            return this._confirmationRender('SETTING.verified.Already-verified')
        }

        if (this.state.verificationIsLoading) {
            return this._loadingMenuRender()
        }

        if (this.state.verificationSent) {
            return this._pendingRequest()
        }

        return (
            <View style={{ padding: 25 }}>

                <Text style={{ textAlign: 'center' }}>{i18n.t('SETTING.verified.Pl-s-t-docs-a-complet-t-form-below')}</Text>

                <TouchableOpacity
                    style={styles.container_section(this.state.idRectoReceived)}
                    onPress={() => this._saveFile('id-recto')}
                >
                    {this.state.idRectoIsLoading && this._loadingForSectionRender()}
                    {this._uploadIconAndTextRender()}
                    <View style={{ paddingHorizontal: 15 }}>
                        <Text>{i18n.t('SETTING.verified.Upload-yr-passport-id-identity-or-driver-license')}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.container_section(this.state.idVersoReceived)}
                    onPress={() => this._saveFile('id-verso')}
                >
                    {this.state.idVersoIsLoading && this._loadingForSectionRender()}
                    {this._uploadIconAndTextRender()}
                    <View style={{ paddingHorizontal: 15 }}>
                        <Text>{i18n.t('SETTING.verified.M-s-t-upload-t-back-of-the-card-if-its-a-national-id-card')}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.container_section(this.state.facePhotoReceived)}
                    onPress={() => this._saveFile('face-photo')}
                >
                    {this.state.facePhotoIsLoading && this._loadingForSectionRender()}
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
                    <TouchableOpacity onPress={() => this._submitVerification()}>
                        <LinearGradient colors={['#f12711', '#f5af19']} start={{ x: 1, y: 1 }} end={{ x: 0, y: 1 }}
                            style={{ borderRadius: 7, paddingHorizontal: 20, paddingVertical: 15 }}>
                            <Text style={{ color: 'white', fontSize: 15, fontWeight: '800' }}>{i18n.t('CORE.Confirm')}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    _submitCertification = async () => {

        if (!this.state.certifTerm) {
            return Snackbar.show({ text: i18n.t('ERROR-MESSAGE.y-h-to-accept-the-tou'), duration: Snackbar.LENGTH_LONG })
        }

        if (this.props.MyProfile.profile.levelCertification <= 1) {
            return Snackbar.show({ text: i18n.t('ERROR-MESSAGE.You-hv-to-be-verified'), duration: Snackbar.LENGTH_LONG })
        }


        if (this.props.MyProfile.profile.communityTotal < 1000) {
            return Snackbar.show({ text: i18n.t('ERROR-MESSAGE.You-hv-to-get-t-community'), duration: Snackbar.LENGTH_LONG })
        }

        this.setState({ certificationIsLoading: true })
        const token = await AsyncStorage.getItem('userToken')

        return fetch('https://wiins-backend.herokuapp.com/admin/createCertificationProfile', {
            method: 'GET',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.status == 201) {
                    return this.setState({ certificationIsLoading: false, certificationSent: true })
                } else {
                    this.setState({ certificationIsLoading: false })
                    return Snackbar.show({ text: i18n.t('ERROR-MESSAGE.A-err-has-occurred'), duration: Snackbar.LENGTH_LONG })
                }
            }).catch(() => {
                this.setState({ certificationIsLoading: false })
                return Snackbar.show({ text: i18n.t('ERROR-MESSAGE.A-err-has-occurred'), duration: Snackbar.LENGTH_LONG })
            })

    }

    _submitVerification = async () => {

        if (!this.state.verifTerm) {
            return Snackbar.show({ text: i18n.t('ERROR-MESSAGE.y-h-to-accept-the-tou'), duration: Snackbar.LENGTH_LONG })
        }

        if (!this.state.idRectoLink || !this.state.facePhotoLink) {
            return Snackbar.show({ text: i18n.t('ERROR-MESSAGE.A-err-has-occurred'), duration: Snackbar.LENGTH_LONG })
        }

        const verification = {
            identityFile: this.state.idRectoLink,
            identityFileBack: this.state.idVersoLink,
            pictureTakeFile: this.state.facePhotoLink
        }

        this.setState({ verificationIsLoading: true })
        const token = await AsyncStorage.getItem('userToken')

        return fetch('https://wiins-backend.herokuapp.com/admin/createVerificationProfile', {
            method: 'POST',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ verification })
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.status == 201) {
                    return this.setState({ verificationIsLoading: false, verificationSent: true })
                } else {
                    this.setState({ verificationIsLoading: false })
                    return Snackbar.show({ text: i18n.t('ERROR-MESSAGE.A-err-has-occurred'), duration: Snackbar.LENGTH_LONG })
                }
            }).catch(() => {
                this.setState({ verificationIsLoading: false })
                return Snackbar.show({ text: i18n.t('ERROR-MESSAGE.A-err-has-occurred'), duration: Snackbar.LENGTH_LONG })
            })

    }


    _loadingMenuRender = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 150 }}>
                <ActivityIndicator size='large' color="grey" />
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
        marginBottom: 65,
        backgroundColor: 'white'
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
    container_section: (actif) => ({
        marginVertical: 15,
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: actif ? '#c2f0c2' : '#d9d9d9',
        borderRadius: 10
    }),
    separator_line: {
        width: '100%',
        backgroundColor: 'grey',
        height: 0.5,
        opacity: 0.5,
        marginVertical: 15
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