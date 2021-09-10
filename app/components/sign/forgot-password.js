import React from 'react'
import {
    StyleSheet, View, Text, Platform,
    KeyboardAvoidingView, ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../redux/MyUser/actions'
import { bindActionCreators } from 'redux'
import i18n from './../../../assets/i18n/i18n';
import { Theme, WInput, WGradientButton } from '../core/design'
import { Sign } from '.'
import Cadena from '../../../assets/svg/Cadena.svg'
import ErrorPresenter from '../core/reusable/misc/error-presenter'
import { emailIsValid } from '../core/reusable/utility/validation'


class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,

            // error
            error: null
        };
    }
    validationTrue = () => {
        // null value
        if (!this.state.email) {
            this.setState({
                error: i18n.t('ERROR-MESSAGE.Missing-informations')
            });
            return false;
        }

        // email validation
        if (!emailIsValid(this.state.email)) {
            this.setState({ error: i18n.t('ERROR-MESSAGE.Email-invalid') });
            return false;
        }

        return true;
    }

    forgotPassword = () => {
        if (!this.validationTrue())
            return;    
    }

    render() {
        return (
            <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'white' }}>
                <Sign label="Forgot Password" onBackPress={() => this.props.navigation.goBack()}  >
                    <ErrorPresenter
                        error={this.state.error}
                        onHide={() => this.setState({ error: null })}
                        duration={3000}>
                        <View
                            behavior={Platform.OS === "ios" ? "padding" : null}
                            keyboardVerticalOffset={0}
                            style={{ width: '100%', paddingHorizontal: 36, flex: 1 }}
                        >
                            <ScrollView showsVerticalScrollIndicator={false}  style={{ flex: 1 }} bounces>
                                <View style={{ paddingTop: 48, alignItems: 'center' }}>
                                    <Cadena />
                                </View>
                                <Text style={ [styles.text, { marginTop: 36 }] }>Enter your email address for recovery of your password.</Text>
                                <WInput style={{ marginTop: 16 }} placeholder="Enter your email" onChangeText={(val) => this.setState({ email: val })} />
                                <View style={{ marginTop: 43 }}>
                                    <WGradientButton text="Send Mail" onPress={this.forgotPassword} />
                                </View>
                            </ScrollView>
                        </View>
                    </ErrorPresenter>
                </Sign>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    mainLargeText: { color: "#002251", fontSize: 24, lineHeight: 29 },
    text: { color: '#7A869A', fontSize: 16, lineHeight: 19 },
    bottomText: { color: '#7A869A', fontSize: 14, textAlign: 'center', lineHeight: 20, paddingBottom: 36  },
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