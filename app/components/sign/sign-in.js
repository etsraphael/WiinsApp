import React from 'react'
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Keyboard, ActivityIndicator, StatusBar, Platform } from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../redux/MyUser/actions'
import { bindActionCreators } from 'redux'
import Snackbar from 'react-native-snackbar';
import I18n from '../../../assets/i18n/i18n'
import LinearGradient from 'react-native-linear-gradient'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLongArrowLeft } from '@fortawesome/pro-light-svg-icons'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

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
                <ActivityIndicator size='large' color="#ffffff" />
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
                        colors={[ '#35D1FE', '#960CF8' ]}
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
            <>
            <StatusBar barStyle="dark-content" hidden = {false} backgroundColor = "transparent" translucent = {true}/>
            <View style={styles.actionBarStyle}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('OnBoarding')}>
                    <FontAwesomeIcon icon={faLongArrowLeft} size={35} color={'grey'} />  
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, width: '100%', padding: 31, paddingTop: 50, backgroundColor: 'white' }}>
                <View style={styles.brand_container}>
                    <Text style={{ color: '#960CF8', fontSize: 32 }}>{I18n.t('CORE.Hello')}</Text>
                    <Text style={{ color: '#787878', marginTop: 10, fontSize: 20 }}>{!this.props.MyUser.isLoading ? I18n.t('LOGIN-REGISTRER.Login-first-to-continue') : I18n.t('LOGIN-REGISTRER.Checking-yr-infos')}</Text>
                </View>
                <View style={styles.card_container}>
                    {this.props.MyUser.isLoading ? this._displayLoading() : this._displayInput()}
                </View>
            </View>
            </>
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