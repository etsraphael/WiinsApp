import React from 'react'
import {
    StyleSheet, View, TextInput, Text, TouchableOpacity,
    ActivityIndicator, ScrollView, StatusBar, KeyboardAvoidingView
} from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../redux/MyUser/actions'
import { bindActionCreators } from 'redux'
import { Platform } from 'react-native'
import { faLongArrowLeft, faCheckCircle } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Snackbar from 'react-native-snackbar'
import LinearGradient from 'react-native-linear-gradient'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import CheckBox from '@react-native-community/checkbox'
import i18n from './../../../assets/i18n/i18n'
import { getCurrentLanguageOfTheDevice } from './../../services/translation/translation-service'

class SignUp extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: null,
            pseudo: null,
            password: null,
            password2: null,
            registration_success: false,
            conditionAccepted: false
        }
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        if (!newProps.MyUser.isLoading) {
            if (!!newProps.MyUser.message) {
                switch (newProps.MyUser.message) {
                    case 'success': return this.setState({ registration_success: true })
                    case 'pseudo_already_exist': {
                        return Snackbar.show({ text: i18n.t('ERROR-MESSAGE.Pseudo-already-exist'), duration: Snackbar.LENGTH_LONG })
                    }
                    case 'email_already_exist': {
                        return Snackbar.show({ text: i18n.t('ERROR-MESSAGE.Email_already_exist'), duration: Snackbar.LENGTH_LONG })
                    }
                }
            }
        }
    }

    // to send the registration
    _register = () => {

        if (!this.state.conditionAccepted) {
            return Snackbar.show({ text: i18n.t('ERROR-MESSAGE.y-h-to-accept-the-tou'), duration: Snackbar.LENGTH_LONG })
        }

        if (!this._verificationTrue()) return null
        else {

            const user = { pseudo: this.state.pseudo, email: this.state.email, password: this.state.password }
            const userDetail = { language: getCurrentLanguageOfTheDevice() }

            return this.props.actions.register(user, userDetail)
        }
    }

    // to check all the verifications
    _verificationTrue = () => {

        // null value
        if (!this.state.email || !this.state.pseudo || !this.state.password) {
            Snackbar.show({ text: i18n.t('ERROR-MESSAGE.Missing-informations'), duration: Snackbar.LENGTH_LONG })
            return false
        }

        // email validation
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(this.state.email) === false) {
            Snackbar.show({ text: i18n.t('ERROR-MESSAGE.Email-invalid'), duration: Snackbar.LENGTH_LONG })
            return false
        }

        // password validation
        if (this.state.password.length <= 4) {
            Snackbar.show({ text: i18n.t('SETTING.password.Error-min-5-char'), duration: Snackbar.LENGTH_LONG })
            return false
        }

        if (this.state.password !== this.state.password2 ) {
            Snackbar.show({ text: i18n.t('PLACEHOLDER.Password-not-matching'), duration: Snackbar.LENGTH_LONG })
            return false
        }

        // pseudo validation
        if (this.state.pseudo.length <= 4) {
            Snackbar.show({ text: i18n.t('ERROR-MESSAGE.Your-username-must-have-at-least-4-char'), duration: Snackbar.LENGTH_LONG })
            return false
        }

        return true
    }

    // to select the loading animation
    _displayLoading() {
        return (
            <View style={styles.loading_container}>
                <ActivityIndicator size='large' color='grey' />
            </View>
        )
    }

    // to make sure the user is more than 18 years old
    _getMaxDate = () => {
        let date = new Date()
        date.setFullYear(date.getFullYear() - 18)
        return Number(date.getTime())
    }

    // to select the input views
    _displayInput() {

        return (
            <View style={{ marginBottom: 70 }}>
                <View>
                    <Text style={styles.inputLabel}>{i18n.t('PROFILE.Pseudo')}</Text>
                    <TextInput
                        value={this.state.pseudo}
                        style={styles.input_container}
                        onChangeText={(val) => this.setState({ pseudo: val.replace(/\s/g, '') })}
                    />
                </View>
                <View>
                    <Text style={styles.inputLabel}>{i18n.t('PROFILE.Email')}</Text>
                    <TextInput
                        value={this.state.email}
                        autoCompleteType={'email'}
                        style={styles.input_container}
                        onChangeText={(val) => this.setState({ email: val.replace(/\s/g, '') })}
                    />
                </View>
                <View>
                    <Text style={styles.inputLabel}>{i18n.t('CORE.Password')}</Text>
                    <TextInput
                        style={styles.input_container}
                        secureTextEntry={true}
                        onChangeText={(val) => this.setState({ password: val })}
                    />
                </View>

                <View>
                    <Text style={styles.inputLabel}>{i18n.t('PLACEHOLDER.Confirm-your-password')}</Text>
                    <TextInput
                        style={styles.input_container}
                        secureTextEntry={true}
                        onChangeText={(val) => this.setState({ password2: val })}
                    />
                </View>

                <View style={{ flexDirection: 'row', marginVertical: 25 }}>

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <CheckBox
                            style={{ width: 20, height: 20, marginTop: 5 }}
                            disabled={false}
                            boxType={'square'}
                            lineWidth={1}
                            value={this.state.conditionAccepted}
                            onValueChange={(newValue) => this.setState({ conditionAccepted: newValue })}
                        />
                    </View>

                    <View style={{ flex: 7, paddingLeft: 15 }}>
                        <Text>
                            {i18n.t('LOGIN-REGISTRER.accept-tou')}
                            <Text style={{ color: '#960CF8' }} onPress={() => this.props.navigation.navigate('SettingPrivacy')}> (click here to read it)</Text>
                        </Text>
                    </View>
                </View>

                <View style={{ marginTop: 5 }}>
                    <TouchableOpacity onPress={() => this._register()} style={styles.btn_log} underlayColor='#fff'>
                        <LinearGradient
                            colors={['#35D1FE', '#960CF8']}
                            locations={[0, 1]}
                            start={{ x: 0.1, y: 0.09 }}
                            end={{ x: 0.94, y: 0.95 }}
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.loginText}>{i18n.t('LOGIN-REGISTRER.Registration')}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    render() {
        return (
            <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() + 10 : 10 }}>
                    <View style={styles.actionBarStyle}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('OnBoarding')}>
                            <FontAwesomeIcon icon={faLongArrowLeft} size={35} color={'grey'} />
                        </TouchableOpacity>
                    </View>
                    {
                        !this.state.registration_success ? (
                            <KeyboardAvoidingView
                                behavior={Platform.OS === "ios" ? "padding" : null}
                                keyboardVerticalOffset={0}
                            >
                                <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 31, marginTop: 56 }}>
                                    <View style={styles.brand_container}>
                                        <Text style={{ color: '#960CF8', fontSize: 32 }}>{i18n.t('CORE.Hello')}</Text>
                                        <Text style={{ color: '#787878', marginTop: 10, fontSize: 20 }}>{!this.props.MyUser.isLoading ? i18n.t('LOGIN-REGISTRER.Create-yr-account') : i18n.t('LOGIN-REGISTRER.Creating-yr-account')}</Text>
                                    </View>
                                    <View style={{ flex: 4, width: '100%', marginTop: 56 }}>
                                        {this.props.MyUser.isLoading ? this._displayLoading() : this._displayInput()}
                                    </View>
                                </ScrollView>
                            </KeyboardAvoidingView>
                        ) : (
                            <View style={{ width: '100%', paddingHorizontal: 45, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                        <FontAwesomeIcon icon={faCheckCircle} color={'green'} size={25} />
                                    </View>
                                    <View style={{ flex: 8, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 18 }}>{i18n.t('LOGIN-REGISTRER.click-on-email')}</Text>
                                    </View>
                                </View>
                                <View style={{ backgroundColor: 'white', marginVertical: 25, height: 1, width: '80%' }}></View>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.btn_back}>
                                    <Text style={[styles.btn_Text, { paddingHorizontal: 45 }]}>{i18n.t('CORE.Back')}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                </View>
            </ScrollView>
        )

    }
}

const styles = StyleSheet.create({
    brand_container: {
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    logoBrand: {
        width: 190,
        height: 190,
        paddingRight: 25,
        resizeMode: 'contain',
    },
    card_container: {
        width: '100%',
        marginTop: 56
    },
    input_container: {
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 10,
        marginBottom: 10,
        color: 'black',
        height: 39,
        borderBottomColor: '#ABABAB',
        borderBottomWidth: .5,
    },
    wiins_logo: {
        width: 70,
        height: 70,
        borderRadius: 70 / 2,
        borderColor: 'grey',
    },
    btn_log: {
        marginTop: 10,
        height: 60,
        overflow: 'hidden',
        borderWidth: 0,
        borderRadius: 10
    },
    loginText: {
        paddingTop: 5,
        paddingBottom: 5,
        textAlign: 'center',
        color: 'white',
        fontSize: 16
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
    },
    btn_Text: {
        paddingTop: 5,
        paddingBottom: 5,
        color: 'black',
        fontSize: 16
    },
    inputLabel: {
        color: '#ABABAB',
    },
    actionBarStyle: {
        flexDirection: 'row',
        paddingTop: StatusBar.currentHeight,
        paddingHorizontal: 31,
        backgroundColor: 'white',
        height: 60 + StatusBar.currentHeight,
        alignItems: 'center'
    },
    btn_back: {
        backgroundColor: '#e6e6e6',
        padding: 5,
        borderRadius: 5
    },
    textSection: {
        color: 'white',
        fontWeight: '700',
        paddingVertical: 8,
        fontSize: 18,
        textAlign: 'center'
    }
})

const mapStateToProps = state => ({
    MyUser: state.MyUser
})

const ActionCreators = Object.assign(
    {},
    MyUserActions
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)