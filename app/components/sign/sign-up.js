import React from 'react'
import { StyleSheet, View, TextInput, Text, TouchableOpacity, ActivityIndicator, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../../redux/MyUser/actions'
import { bindActionCreators } from 'redux'
import DatePicker from 'react-native-datepicker'
import { Platform, NativeModules } from 'react-native'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Snackbar from 'react-native-snackbar'
import I18n from '../../i18n/i18n'

class SignUp extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: null,
            pseudo: null,
            birthDate: null,
            password: null,
            registration_success: false
        }
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        if (!newProps.MyUser.isLoading) {
            if (!!newProps.MyUser.message) {
                switch (newProps.MyUser.message) {
                    case 'success': return this.setState({ registration_success: true })
                    case 'pseudo_already_exist': {
                        return Snackbar.show({ text: 'pseudo_already_exist', duration: Snackbar.LENGTH_LONG })
                    }
                    case 'email_already_exist': {
                        return Snackbar.show({ text: 'email_already_exist', duration: Snackbar.LENGTH_LONG })
                    }
                }
            }
        }
    }

    // to send the registration
    _register = () => {
        if (!this._verificationTrue()) return null
        else {
            const deviceLanguage = Platform.OS === 'ios' ? NativeModules.SettingsManager.settings.AppleLocale ||
                NativeModules.SettingsManager.settings.AppleLanguages[0] : NativeModules.I18nManager.localeIdentifier;
            const user = { pseudo: this.state.pseudo, email: this.state.email, password: this.state.birthDate }
            const userDetail = { language: deviceLanguage.split('_')[0], birthDate: this.state.birthDate }
            return this.props.actions.register(user, userDetail)
        }
    }

    // to check all the verifications
    _verificationTrue = () => {

        // null value
        if (!this.state.email || !this.state.pseudo || !this.state.birthDate || !this.state.password) {
            Snackbar.show({ text: 'empty information', duration: Snackbar.LENGTH_LONG })
            return false
        }

        // email validation
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(this.state.email) === false) {
            Snackbar.show({ text: 'Email is Not Correct', duration: Snackbar.LENGTH_LONG })
            return false
        }

        // password validation
        if (this.state.password.length <= 4) {
            Snackbar.show({ text: 'Password required must be more than 5 characters', duration: Snackbar.LENGTH_LONG })
            return false
        }

        // pseudo validation
        if (this.state.pseudo.length <= 4) {
            Snackbar.show({ text: 'Pseudo required must be more than 5 characters', duration: Snackbar.LENGTH_LONG })
            return false
        }

        return true
    }

    // to select the loading animation
    _displayLoading() {
        return (
            <View style={styles.loading_container}>
                <ActivityIndicator size='large' color="#ffffff" />
            </View>
        )
    }

    // to select the line separator
    _orSeparator = () => {
        return (
            <View style={{ flexDirection: 'row', paddingVertical: 25, alignItems: 'center' }}>
                <View style={{ flex: 5, height: 1, backgroundColor: 'white' }}></View>
                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 19 }}>Or</Text>
                </View>
                <View style={{ flex: 5, height: 1, backgroundColor: 'white' }}></View>
            </View>
        )
    }

    // to select the input views
    _displayInput() {
        return (
            <View>
                <TextInput placeholder={I18n.t('PROFILE.Pseudo')}
                    style={styles.input_container}
                    placeholderTextColor="white"
                    onChangeText={(val) => this.setState({ pseudo: val })}
                />
                <TextInput placeholder={I18n.t('PROFILE.Email')}
                    autoCompleteType={'email'}
                    style={styles.input_container}
                    placeholderTextColor="white"
                    onChangeText={(val) => this.setState({ email: val })}
                />
                <TextInput
                    placeholder={I18n.t('CORE.Password')}
                    style={styles.input_container}
                    secureTextEntry={true}
                    placeholderTextColor="white"
                    onChangeText={(val) => this.setState({ password: val })}
                />
                <DatePicker
                    style={dateStyle.containerDatePicker}
                    date={this.state.birthDate}
                    mode="date"
                    placeholder={I18n.t('PROFILE.BirthDate')}
                    format="YYYY-MM-DD"
                    maxDate={new Date().getFullYear() - 18}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={dateStyle}
                    onDateChange={(val) => this.setState({ birthDate: val })}
                />
                <TouchableOpacity onPress={() => this._register()} style={styles.btn_log} underlayColor='#fff'>
                    <Text style={styles.loginText}>{I18n.t('LOGIN-REGISTRER.Registration')}</Text>
                </TouchableOpacity>
                {this._orSeparator()}
                <TouchableOpacity onPress={() => this.props.view('login')} style={styles.btn_back}>
                    <Text style={styles.btn_Text}> Back </Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {

        if (!this.state.registration_success) {
            return (
                <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 0 }}>
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'flex-end', flex: 3 }}>
                        <Image style={styles.logoBrand} source={require('../../../assets/image/icon-wiins-name.png')} />
                    </View>
                    <View style={{ flex: 4, width: '100%' }}>
                        {this.props.MyUser.isLoading ? this._displayLoading() : this._displayInput()}
                    </View>
                </ScrollView>
            )
        } else {
            return (
                <View style={{ width: '100%', paddingHorizontal: 45, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                            <FontAwesomeIcon icon={faCheckCircle} color={'white'} size={25} />
                        </View>
                        <View style={{ flex: 8, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, color: 'white' }}>
                                Veuillez confirmer votre compte par courriel.
                        </Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: 'white', marginVertical: 25, height: 1, width: '80%' }}></View>
                    <TouchableOpacity onPress={() => this.props.view('login')} style={styles.btn_back}>
                        <Text style={[styles.btn_Text, { paddingHorizontal: 45 }]}> Se connecter </Text>
                    </TouchableOpacity>
                </View>
            )
        }

    }
}

const dateStyle = StyleSheet.create({
    containerDatePicker: {
        width: '100%',
        paddingVertical: 5,
    },
    dateIcon: {
        display: 'none'
    },
    dateInput: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 20,
        height: 39
    },
    placeholderText: {
        color: 'white',
        fontSize: 20,
    },
    dateText: {
        color: 'white',
        fontSize: 20,
    }
})

const styles = StyleSheet.create({
    logoBrand: {
        width: 190,
        height: 190,
        paddingRight: 25,
        resizeMode: 'contain',
    },
    input_container: {
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 20,
        height: 39
    },
    wiins_logo: {
        width: 70,
        height: 70,
        borderRadius: 70 / 2,
        borderColor: 'grey',
    },
    btn_log: {
        marginTop: 10,
        borderRadius: 20,
        height: 42,
    },
    loginText: {
        paddingTop: 5,
        paddingBottom: 5,
        textAlign: 'center',
        color: 'white',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'white',
        fontSize: 20
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
        textAlign: 'center',
        color: 'white',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'white',
        fontSize: 20
    },
    btn_back: {
        marginTop: 10,
        backgroundColor: '#ffffff26',
        borderRadius: 20
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