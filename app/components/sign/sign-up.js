import React from 'react'
import {
    StyleSheet, View, TextInput, Text, TouchableOpacity,
    ActivityIndicator, ScrollView, StatusBar, KeyboardAvoidingView
} from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../redux/MyUser/actions'
import { bindActionCreators } from 'redux'
import { Platform, NativeModules } from 'react-native'
import { faLongArrowLeft, faCheckCircle } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Snackbar from 'react-native-snackbar'
import LinearGradient from 'react-native-linear-gradient'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import CheckBox from '@react-native-community/checkbox'
import i18n from './../../../assets/i18n/i18n'

class SignUp extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: null,
            pseudo: null,
            password: null,
            registration_success: false,
            conditionAccepted: false,
            countDownString: null,
            counterDone: false
        }
    }

    componentDidMount() {
        this._startTimer()
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
            const deviceLanguage = Platform.OS === 'ios' ? NativeModules.SettingsManager.settings.AppleLocale ||
                NativeModules.SettingsManager.settings.AppleLanguages[0] : NativeModules.I18nManager.localeIdentifier;
            const user = { pseudo: this.state.pseudo, email: this.state.email, password: this.state.password }
            const userDetail = { language: deviceLanguage.split('_')[0] }
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
                        style={styles.input_container}
                        onChangeText={(val) => this.setState({ pseudo: val })}
                    />
                </View>
                <View>
                    <Text style={styles.inputLabel}>{i18n.t('PROFILE.Email')}</Text>
                    <TextInput
                        autoCompleteType={'email'}
                        style={styles.input_container}
                        onChangeText={(val) => this.setState({ email: val })}
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

    // timer test
    _startTimer = () => {
        let countDownDate = new Date('May 1, 2021 00:00:00').getTime()

        let x = setInterval(() => {

            // Get today's date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            this.setState({ countDownString: days + "d " + hours + "h " + minutes + "m " + seconds + "s " })

            // If the count down is finished, write some text
            if (distance <= 0) {
                this.setState({ counterDone: true })
                clearInterval(x)
            }
        }, 1000)

    }

    _renderTimer = () => {
        return (
            <LinearGradient
                colors={['#35D1FE', '#0041C4', '#960CF8']}
                style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() + 10 : 10 }}
                locations={[0, 0.5596885789406173, 1]}
                start={{ x: 0.1, y: 0.09 }}
                end={{ x: 0.94, y: 0.95 }} >
                <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('OnBoarding')}>
                        <FontAwesomeIcon icon={faLongArrowLeft} size={35} color={'white'} />
                    </TouchableOpacity>
                </View>

                {this.state.countDownString ? <View style={{ flex: 1, height: '100%', alignItems: 'center' }}>
                    <Text style={{ fontSize: 25, color: 'white', fontWeight: '800', backgroundColor: '#5f5f5fb0', padding: 15, borderRadius: 15, overflow: 'hidden' }}>{this.state.countDownString}</Text>
                </View> : null}

                <View style={{ paddingTop: 15, paddingHorizontal: 10 }}>
                    <Text style={styles.textSection}>
                        Wiin's t’annonce qu’à compter du 01 mai, tu bénéficieras d’un accès anticipé à nos services.
                        En attendant cette grande révolution, il va falloir que tu patientes !
                        “Tu peux d’ores et déjà renseigner ton adresse email pour avoir le privilège de faire partie de nos premiers Wiinser.”
                        Tu seras contacté en priorité pour bénéficier de cet accès.
                        Attention, cet accès sera disponible aux 1000 premières inscriptions, En savoir plus
                    </Text>
                    <Text style={styles.textSection}>
                        Pourquoi cet accès anticipé ?
                        Et pourquoi pas…? :wink:
                        Wiin’s souhaite révolutionner la relation que tu as avec ton téléphone :rofl:
                        Aussi, nous avons besoin de ton aide afin d’améliorer nos services et t’offrir une expérience exclusive qui sera totalement GRATUITE pendant cette période.
                        Et en plus, en tant que premier Winser, tu profiteras de… :shushing_face:  une réduction sur ton futur abonnement.
                    </Text>
                    <Text style={styles.textSection}>
                        Que propose l'accès anticipé ?
                        L'accès anticipé te permet d'utiliser toutes les fonctionnalités actuellement disponibles de Wiin's. Nous te laissons le soin d’en découvrir plus grâce à la vidéo, si tu ne l'as pas déjà fait .
                    </Text>
                    <Text style={styles.textSection}>
                        Pendant combien de temps la plateforme sera-t-elle en accès anticipé ?
                        Pendant 9 mois, ou peut-être 6, ou 3... Tu as ton rôle à jouer !! Ce qui est sûr, jusqu’au 1er janvier 2022, au plus tard.
                    </Text>
                    <Text style={styles.textSection}>
                        En quoi la version complète sera-t-elle différente de la version en accès anticipé ?
                        La plateforme sera améliorée selon tes demandes, que tu pourras formuler grâce au menu "proposer une amélioration”. Les artistes pourront également toucher une rémunération digne de leur talent :slight_smile: Aussi.... ça sera la fin de la gratuité de Wiin's.  De plus, tu as la possibilité de nous suivre sur les réseaux sociaux pour rester informé.
                    </Text>
                    <Text style={styles.textSection}>
                        Quel sera le prix sur la version complète, après l'accès anticipé ?
                        Le prix n’est pas encore fixé. L’accès anticipé va nous permettre de t’offrir le service au meilleur prix. Tu en sera informé avant de payer, bien sûr.
                    </Text>
                    <Text style={styles.textSection}>
                        Comment comptez-vous impliquer la communauté dans le processus de développement ?
                        Tout simplement en l’utilisant :wink:. Nous serons ravis d’apprendre que tu désir apporter ton soutien! Sens-toi libre de tout nous dire car, après tout, c’est aussi TA plateforme. Avoir des idées et tes retours, c’est génial. Mais tu peux en plus participer au développement de Wiin’s en faisant une donation.
                    </Text>
                </View>
            </LinearGradient>
        )
    }

    _renderRegistration = () => {
        return (
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
        )

    }

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                {this.state.counterDone ? this._renderRegistration() : this._renderTimer()}
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