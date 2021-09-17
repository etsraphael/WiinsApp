import React from 'react'
import {
    StyleSheet, View, Text, Platform,
    KeyboardAvoidingView, ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../redux/MyUser/actions'
import { bindActionCreators } from 'redux'
import i18n from './../../../assets/i18n/i18n'
import { Theme } from '../core/reusable/design'
import { StandardInput, PrimaryGradientButton } from './../core/reusable/form'
import { Sign } from '.'
import Cadena from '../../../assets/svg/Cadena.svg'
import ErrorPresenter from '../core/reusable/misc/error-presenter'
import { emailIsValid } from '../core/reusable/utility/validation'

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
            this.setState({ error: i18n.t('ERROR-MESSAGE.Missing-informations') })
            this.flagInput(EMAIL)
            return false
        }

        if (!emailIsValid(this.state.email)) {
            this.setState({ error: i18n.t('ERROR-MESSAGE.Email-invalid') })
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
        if (!this.validationTrue())
            return
    }

    render() {
        return (
            <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'white' }}>
                <Sign label='Forgot Password' onBackPress={() => this.props.navigation.goBack()}  >
                    <ErrorPresenter
                        error={this.state.error}
                        onHide={() => this.setState({ error: null })}
                        duration={3000}>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : null}
                            keyboardVerticalOffset={0}
                            style={{ width: '100%', paddingHorizontal: 36, flex: 1 }}
                        >
                            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }} bounces>
                                <View style={{ paddingTop: 48, alignItems: 'center' }}>
                                    <Cadena />
                                </View>
                                <Text style={[styles.text, { marginTop: 36 }]}>Enter your email address for recovery of your password.</Text>
                                <StandardInput style={{ marginTop: 16 }} placeholder='Enter your email' flag={this.checkIfFlagged(EMAIL)} onChangeText={(val) => this.handleInput(val, EMAIL)} />
                                <View style={{ marginTop: 43 }}>
                                    <PrimaryGradientButton text='Send Mail' onPress={this.forgotPassword} />
                                </View>
                            </ScrollView>
                        </KeyboardAvoidingView>
                    </ErrorPresenter>
                </Sign>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    mainLargeText: { color: '#002251', fontSize: 24, lineHeight: 29 },
    text: { color: '#7A869A', fontSize: 16, lineHeight: 19 },
    bottomText: { color: '#7A869A', fontSize: 14, textAlign: 'center', lineHeight: 20, paddingBottom: 36 },
    inputBox: { marginBottom: 21 },
    termsBox: { flexDirection: 'row', marginBottom: 26, alignItems: 'center' },
    termsLabel: { color: Theme.wColor, fontSize: 13, flex: 1 },
    forgotPwdLabel: { color: Theme.wColor }
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