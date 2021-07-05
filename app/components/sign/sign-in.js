import React from 'react'
import {
    StyleSheet, View, TextInput, Text, TouchableOpacity,
    Keyboard, ActivityIndicator, StatusBar, Platform,
    KeyboardAvoidingView, ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../redux/MyUser/actions'
import { bindActionCreators } from 'redux'
import Snackbar from 'react-native-snackbar'
import I18n from '../../../assets/i18n/i18n'
import LinearGradient from 'react-native-linear-gradient'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLongArrowLeft } from '@fortawesome/pro-light-svg-icons'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { WInput, WGradientButton, WCheckBox, Theme } from '../core/design'

class SignIn extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            pseudo_email: null,
            password: null,
        }
    }

    UNSAFE_componentWillReceiveProps = (newProps) => {
        if (!newProps.MyUser.isLoading && newProps.MyUser.error) {
            switch (newProps.MyUser.error) {
                case 'email_or_password_invalid': {
                    return Snackbar.show({ text: I18n.t('ERROR-MESSAGE.Pseudo-Or-Email-Incorrect'), duration: Snackbar.LENGTH_LONG })
                }
                case 'account_deactivated': {
                    return Snackbar.show({ text: I18n.t('ERROR-MESSAGE.Account_desactivated'), duration: Snackbar.LENGTH_LONG })
                }
            }
        }
    }

    // to log the user
    _login = () => {
        Keyboard.dismiss()
        if (!this.state.pseudo_email || !this.state.password) {
            return Snackbar.show({ text: I18n.t('ERROR-MESSAGE.Pseudo-Or-Email-Incorrect'), duration: Snackbar.LENGTH_LONG })
        }
        this.props.actions.login(this.state.pseudo_email, this.state.password)
    }

    // to select the loading animation
    _displayLoading = () => {
        return (
            <View style={styles.loading_container}>
                <ActivityIndicator size='large' color="#2CB0D6" />
            </View>
        )
    }

    // to select the form view
    _displayInput = () => {
        return (
            <View>
                <View>
                    <Text style={styles.inputLabel}>{I18n.t('LOGIN-REGISTRER.PseudoOrEmail')}</Text>
                    <TextInput
                    textContentType="newPassword"
                        style={styles.input_container}
                        onChangeText={(val) => this.setState({ pseudo_email: val })}
                    />
                </View>
                <View>
                    <Text style={styles.inputLabel}>{I18n.t('CORE.Password')}</Text>
                    <TextInput
                        style={styles.input_container}
                        secureTextEntry={true}
                        onChangeText={(val) => { this.setState({ password: val }) }}
                    />
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.inputLabel}>{I18n.t('LOGIN-REGISTRER.ForgotPassword')}</Text>
                </View>
                <View style={{ marginTop: 25 }}>
                    <TouchableOpacity style={styles.btn_log} onPress={() => this._login()} underlayColor='#fff'>
                        <LinearGradient
                            colors={['#35D1FE', '#960CF8']}
                            locations={[0, 1]}
                            start={{ x: 0.1, y: 0.09 }}
                            end={{ x: 0.94, y: 0.95 }}
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.loginText}>{I18n.t('LOGIN-REGISTRER.Login')}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        return (
            <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'white' }}>
                <View
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    keyboardVerticalOffset={0}
                    style={{ width: '100%', paddingHorizontal: 36, flex: 1 }}
                >
                    <ScrollView showsVerticalScrollIndicator={false}  style={{ marginVertical: 36, flex: 1 }} bounces>
                        <Text style={styles.mainLargeText}>Welcome Back</Text>
                        <Text style={styles.subText}>Hello Winnser, sign to continue!</Text>
                        <View style={{ marginTop: 48 }}>
                            <WInput boxStyle={styles.inputBox} label={I18n.t('LOGIN-REGISTRER.PseudoOrEmail')} textContentType="username" onChangeText={(val) => this.setState({ pseudo_email: val })} />
                            <WInput boxStyle={styles.inputBox} label={I18n.t('CORE.Password')} textContentType="password" secureTextEntry={true} onChangeText={(val) => this.setState({ password: val })} />
                            <View style={{ alignItems: 'flex-start', marginBottom: 26 }}>
                                <Text style={styles.forgotPwdLabel}>{I18n.t('LOGIN-REGISTRER.ForgotPassword')}</Text>
                            </View>
                            <WGradientButton text="Sign in" style={styles.createButton} />
                        </View>
                        {/* <View style={styles.card_container}>
                            {this.props.MyUser.isLoading ? this._displayLoading() : this._displayInput()}
                        </View> */}
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    mainLargeText: { color: "#002251", fontSize: 24 },
    subText: { color: '#7A869A', fontSize: 14 },
    inputBox: { marginBottom: 21 },
    termsBox: { flexDirection: 'row', marginBottom: 26, alignItems: 'center' },
    termsLabel: { color: Theme.wColor, fontSize: 13, flex: 1 },
    forgotPwdLabel: { color: Theme.wColor },
    createButton: {
    },
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
        backgroundColor: "white",
        height: 60 + StatusBar.currentHeight,
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() + 10 : 10
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)