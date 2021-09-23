import React from 'react'
import {
    StyleSheet, View, Text, Platform,
    KeyboardAvoidingView, ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../redux/MyUser/actions'
import { bindActionCreators } from 'redux'
import { Theme } from '../core/reusable/design'
import { StandardInput, PrimaryGradientButton } from './../core/reusable/form'
import { Sign } from '.'
import Cadena from '../../../assets/svg/Cadena.svg'
import { emailIsValid } from '../core/reusable/utility/validation'
import Snackbar from 'react-native-snackbar'
import I18n from '../../../assets/i18n/i18n';

const EMAIL = 'email'
class ForgotPassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            [EMAIL]: null,

            // error
            error: null,
            flaggedInput: null
        }
    }
    validationTrue = () => {
        // null value
        if (!this.state.email) {
            Snackbar.show({ text: I18n.t('ERROR-MESSAGE.Missing-informations'), duration: Snackbar.LENGTH_LONG })
            this.flagInput(EMAIL)
            return false
        }

        if (!emailIsValid(this.state.email)) {
            Snackbar.show({ text: I18n.t('ERROR-MESSAGE.Email-invalid'), duration: Snackbar.LENGTH_LONG })
            this.flagInput(EMAIL)
            return false
        }
        return true
    }

    // err input
    flagInput = (flaggedInput) => {
        this.setState({ flaggedInput })
    }

    // check if input is flagged
    checkIfFlagged = (flaggedInput) => {
        return !!this.state.flaggedInput && (this.state.flaggedInput === flaggedInput)
    }

    // handle input
    handleInput = (val, input) => {
        this.setState({
            flaggedInput: null,
            [input]: val
        })
    }

    forgotPassword = () => {

        return this.props.actions.forgotPasswordSend(this.state[EMAIL])



        // if (!this.validationTrue())
        //     return this.props.actions.login(this.state[EMAIL])
    }

    render() {
        return (
            <KeyboardAvoidingView
                style={{ flex: 1, backgroundColor: 'white' }}
            >
                <Sign
                    label={I18n.t('LOGIN-REGISTRER.ForgotPassword')}
                    onBackPress={() => this.props.navigation.goBack()}
                >
                    <View style={{ flex: 1, position: 'relative' }}>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : null}
                            keyboardVerticalOffset={0}
                            style={styles.containerKeyBoard}
                        >
                            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }} bounces>
                                <View style={{ paddingTop: 48, alignItems: 'center' }}>
                                    <Cadena />
                                </View>
                                <Text style={[styles.text, { marginTop: 36 }]}>
                                    {I18n.t('LOGIN-REGISTRER.Enter-yr-email-address-for-recovery-of-yr-password')}
                                </Text>
                                <StandardInput
                                    style={{ marginTop: 16 }}
                                    placeholder={I18n.t('CORE.Your-Email..')}
                                    flag={this.checkIfFlagged(EMAIL)}
                                    onChangeText={(val) => this.handleInput(val, EMAIL)}
                                />
                                <View style={{ marginTop: 43 }}>
                                    <PrimaryGradientButton text={I18n.t('LOGIN-REGISTRER.Send-email')} onPress={this.forgotPassword} />
                                </View>
                            </ScrollView>
                        </KeyboardAvoidingView>
                    </View>
                </Sign>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    containerKeyBoard: {
        width: '100%',
        paddingHorizontal: 36,
        flex: 1
    },
    mainLargeText: {
        color: '#002251',
        fontSize: 24,
        lineHeight: 29
    },
    text: {
        color: '#7A869A',
        fontSize: 16,
        lineHeight: 19
    },
    bottomText: {
        color: '#7A869A',
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
        paddingBottom: 36
    },
    inputBox: {
        marginBottom: 21
    },
    termsBox: {
        flexDirection: 'row',
        marginBottom: 26,
        alignItems: 'center'
    },
    termsLabel: {
        color: Theme.wColor,
        fontSize: 13,
        flex: 1
    },
    forgotPwdLabel: {
        color: Theme.wColor
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

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)