import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    ScrollView
} from 'react-native'
import { connect } from 'react-redux';
import * as MyUserActions from '../../redux/MyUser/actions';
import { bindActionCreators } from 'redux';
import CheckBox from '@react-native-community/checkbox';
import { getCurrentLanguageOfTheDevice } from './../../services/translation/translation-service';
import { Theme } from '../core/reusable/design';
import { PrimaryGradientButton, StandardInput, StandardInputPassword } from '../core/reusable/form';
import Snackbar from 'react-native-snackbar'
import Sign from './sign';
import { emailIsValid, passwordIsValid } from '../core/reusable/utility/validation';
import KeyboardShift from '../core/reusable/form/keyboard-shift';
import I18n from '../../../assets/i18n/i18n';

const PSEUDO = 'pseudo'
const EMAIL = 'email'
const PASSWORD = 'password'
const CONFIRM_PASSWORD = 'password2'

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            [EMAIL]: null,
            [PSEUDO]: null,
            [PASSWORD]: null,
            [CONFIRM_PASSWORD]: null,
            registration_success: false,
            conditionAccepted: false,

            // error
            error: null,
            flaggedInput: null
        };
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        if (!newProps.MyUser.isLoading) {
            if (!!newProps.MyUser.message) {
                switch (newProps.MyUser.message) {
                    case 'success':
                        return this.setState({ registration_success: true });
                    case 'pseudo_already_exist': {
                        return Snackbar.show({ text: I18n.t('ERROR-MESSAGE.Pseudo-already-exist'), duration: Snackbar.LENGTH_LONG })
                    }
                    case 'email_already_exist': {
                        return Snackbar.show({ text: I18n.t('ERROR-MESSAGE.Email_already_exist'), duration: Snackbar.LENGTH_LONG })
                    }
                }
            }
        }
    }

    // to send the registration
    _register = () => {
        if (!this._verificationTrue()) return null;
        if (!this.state.conditionAccepted) {
            return Snackbar.show({ text: I18n.t('ERROR-MESSAGE.y-h-to-accept-the-tou'), duration: Snackbar.LENGTH_LONG })
        } else {
            const user = {
                pseudo: this.state[PSEUDO],
                email: this.state[EMAIL],
                password: this.state[PASSWORD]
            };
            const userDetail = { language: getCurrentLanguageOfTheDevice() };
            return this.props.actions.register(user, userDetail);
        }
    };

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

    // to check all the verifications
    _verificationTrue = () => {
        if (!this.state[EMAIL] || !this.state[PSEUDO] || !this.state[PASSWORD] || !this.state[CONFIRM_PASSWORD]) {
            Snackbar.show({ text: I18n.t('ERROR-MESSAGE.Missing-informations'), duration: Snackbar.LENGTH_LONG })
            const concernedInput = !this.state[PSEUDO] ? PSEUDO : !this.state[EMAIL] ? EMAIL : !this.state[PASSWORD] ? PASSWORD : CONFIRM_PASSWORD
            this.flagInput(concernedInput)
            return false;
        }

        if (this.state[PSEUDO].length < 4) {
            Snackbar.show({ text: I18n.t('ERROR-MESSAGE.Your-username-must-have-at-least-4-char'), duration: Snackbar.LENGTH_LONG })
            this.flagInput(PSEUDO)
            return false;
        }

        if (!emailIsValid(this.state[EMAIL])) {
            Snackbar.show({ text: I18n.t('ERROR-MESSAGE.Email-invalid'), duration: Snackbar.LENGTH_LONG })
            this.flagInput(EMAIL)
            return false;
        }

        const isPasswordValid = passwordIsValid(this.state[PASSWORD])
        if (!isPasswordValid[0]) {
            Snackbar.show({ text: isPasswordValid[1] , duration: Snackbar.LENGTH_LONG })
            this.flagInput(PASSWORD)
            return false;
        }

        if (this.state[PASSWORD] !== this.state[CONFIRM_PASSWORD]) {
            Snackbar.show({ text: I18n.t('PLACEHOLDER.Password-not-matching'), duration: Snackbar.LENGTH_LONG })
            this.flagInput(CONFIRM_PASSWORD)
            return false;
        }

        return true;
    };

    // to select the loading animation
    _displayLoading() {
        return (
            <View style={styles.loading_container}>
                <ActivityIndicator size='large' color='#2CB0D6' />
            </View>
        );
    }

    // to make sure the user is more than 18 years old
    _getMaxDate = () => {
        let date = new Date();
        date.setFullYear(date.getFullYear() - 18);
        return Number(date.getTime());
    };

    // handle condition acceptance
    acceptCondition() {
        this.setState({ conditionAccepted: true });
    }

    // redirect user to the USE OF CONDITION screen
    goToUseOfCondition = () => {
        this.props.navigation.push('UseCondition', {
            acceptCondition: this.acceptCondition.bind(this)
        });
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Sign
                    label='Create an account'
                    navigation={this.props.navigation}>
                    <View
                        style={{
                            width: '100%',
                            paddingHorizontal: 36,
                            flex: 1,
                            position: 'relative'
                        }}>
                        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} bounces>
                            <KeyboardShift>
                                {() => (
                                    <>
                                        <Text
                                            style={[
                                                styles.mainLargeText,
                                                { marginTop: 36 }
                                            ]}>
                                            Welcome
                                        </Text>
                                        <Text style={styles.subText}>
                                            Hello! Nice to meet you new Wiinser
                                        </Text>
                                        <View style={{ marginTop: 48 }}>
                                            <StandardInput
                                                boxStyle={styles.inputBox}
                                                label='Pseudo'
                                                placeholder='Enter your pseudo'
                                                flag={this.checkIfFlagged(PSEUDO)}
                                                returnKeyType='next'
                                                onSubmitEditing={() => this.emailField.focus()}
                                                onChangeText={val => this.handleInput(val.replace(/\s/g, ''), PSEUDO)}
                                                textContentType='username'
                                            />
                                            <StandardInput
                                                inputRef={ref => this.emailField = ref}
                                                boxStyle={styles.inputBox}
                                                label='Email'
                                                placeholder='Enter your email'
                                                flag={this.checkIfFlagged(EMAIL)}
                                                returnKeyType='next'
                                                onSubmitEditing={() => this.pwdOneField.focus()}
                                                onChangeText={val => this.handleInput(val.replace(/\s/g, ''), EMAIL)}
                                                textContentType='emailAddress'
                                            />
                                            <StandardInputPassword
                                                inputRef={ref => this.pwdOneField = ref}
                                                boxStyle={styles.inputBox}
                                                label='Password'
                                                placeholder='Enter your password'
                                                flag={this.checkIfFlagged(PASSWORD)}
                                                returnKeyType='next'
                                                onSubmitEditing={() => this.pwdTwoField.focus()}
                                                onChangeText={val => this.handleInput(val, PASSWORD)}
                                            />
                                            <StandardInputPassword
                                                inputRef={ref => this.pwdTwoField = ref}
                                                boxStyle={styles.inputBox}
                                                label='Confirm your password'
                                                placeholder='Enter your password'
                                                flag={this.checkIfFlagged(CONFIRM_PASSWORD)}
                                                returnKeyType='done'
                                                onChangeText={val => this.handleInput(val, CONFIRM_PASSWORD)}
                                            />
                                            <View style={styles.termsBox}>
                                                <View style={{ paddingRight: 30 }}>
                                                    {/* <WCheckBox /> */}
                                                    <CheckBox
                                                        style={{ width: 20, height: 20 }}
                                                        boxType='circle'
                                                        value={this.state.conditionAccepted}
                                                        onValueChange={newValue =>
                                                            this.setState({
                                                                conditionAccepted: newValue
                                                            })
                                                        }
                                                    />
                                                </View>
                                                <Text
                                                    onPress={this.goToUseOfCondition}
                                                    style={styles.termsLabel}>
                                                    I certify that I am 16 years or older
                                                    and I accept the user agreement and the
                                                    privacy policy
                                                </Text>
                                            </View>
                                            <View style={{ marginBottom: 165 }}>
                                                <PrimaryGradientButton
                                                    text='Create an account'
                                                    style={styles.createButton}
                                                    onPress={() => this._register()}
                                                />
                                            </View>
                                        </View>
                                    </>
                                )}
                            </KeyboardShift>
                        </ScrollView>
                    </View>
                </Sign>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainLargeText: { 
        color: '#002251',
        fontSize: 24
    },
    subText: { 
        color: '#7A869A',
        fontSize: 14
    },
    inputBox: { 
        marginBottom: 21
    },
    termsBox: {
        flexDirection: 'row',
        marginBottom: 38,
        alignItems: 'center'
    },
    termsLabel: { 
        color: Theme.wColor,
        fontSize: 13,
        flex: 1
    },
    forgotPwdLabel: { 
        color: Theme.wColor
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        backgroundColor: 'rgba(1, 1, 1, 0.5)'
    }
});

const mapStateToProps = state => ({
    MyUser: state.MyUser
});

const ActionCreators = Object.assign({}, MyUserActions);

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
