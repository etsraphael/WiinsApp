import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Keyboard,
    ActivityIndicator,
    StatusBar,
    Platform,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import * as MyUserActions from '../../redux/MyUser/actions';
import { bindActionCreators } from 'redux';
import I18n from '../../../assets/i18n/i18n';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Theme } from '../core/reusable/design';
import { StandardInputPassword, WInput, PrimaryGradientButton } from '../core/reusable/form';
import ErrorPresenter from '../core/reusable/misc/error-presenter';
import Sign from './sign';
import KeyboardShift from '../core/reusable/misc/keyboard-shift';

const PSEUDO_EMAIL = 'pseudo_email'
const PASSWORD = 'password'
class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            [PSEUDO_EMAIL]: null,
            [PASSWORD]: null,

            // error
            error: null,
            flaggedInput: null
        };
    }

    UNSAFE_componentWillReceiveProps = (newProps) => {
        if (!newProps.MyUser.isLoading && newProps.MyUser.error) {
            switch (newProps.MyUser.error) {
                case 'email_or_password_invalid': {
                    this.flagInput(PSEUDO_EMAIL + ' ' + PASSWORD)
                    return this.setState({
                        error: I18n.t('ERROR-MESSAGE.Pseudo-Or-Email-Incorrect')
                    });
                }
                case 'account_deactivated': {
                    return this.setState({
                        error: I18n.t('ERROR-MESSAGE.Account_desactivated')
                    });
                }
            }
        }
    };

    validate = () => {
        if (!this.state[PSEUDO_EMAIL] || this.state[PSEUDO_EMAIL] === '') {
            this.flagInput(PSEUDO_EMAIL)
            return this.setState({
                error: I18n.t('ERROR-MESSAGE.Pseudo-Or-Email-Incorrect')
            });
            return false
        }

        if (!this.state[PASSWORD] || this.state[PASSWORD] === '') {
            this.flagInput(PASSWORD)
            return this.setState({
                error: I18n.t('ERROR-MESSAGE.Pseudo-Or-Email-Incorrect')
            });
            return false
        }

        return true
    }

    // to log the user
    _login = () => {
        Keyboard.dismiss();
        if (!this.validate())
            return
        this.props.actions.login(this.state[PSEUDO_EMAIL], this.state[PASSWORD]);
    };

    // err input
    flagInput = (flaggedInput) => {
        flaggedInput = this.state.flaggedInput != null ? `this.state.flaggedInput ${flaggedInput}` : flaggedInput
        this.setState({ flaggedInput })
    }

    // check if input is flagged
    checkIfFlagged = (flaggedInput) => {
        return !!this.state.flaggedInput && (
                (this.state.flaggedInput === flaggedInput) || (this.state.flaggedInput.includes(flaggedInput))
            )
    }

    // handle input
    handleInput = (val, input) => {
        this.setState({
            flaggedInput: null,
            [input]: val
        })
    }

    // to select the loading animation
    _displayLoading = () => {
        return (
            <View style={styles.loading_container}>
                <ActivityIndicator size='large' color='#2CB0D6' />
            </View>
        );
    };

    forgotPassword = () => this.props.navigation.navigate('ForgotPassword');

    render() {
        return (
            <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'white' }}>
                <Sign label='Login' navigation={this.props.navigation}>
                    <ErrorPresenter
                        error={this.state.error}
                        onHide={() => this.setState({ error: null })}
                        behavior={Platform.OS === 'ios' ? 'padding' : null}
                        keyboardVerticalOffset={0}
                        style={{
                            width: '100%',
                            paddingHorizontal: 36,
                            flex: 1
                        }}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            style={{ flex: 1 }}
                            bounces>
                            <KeyboardShift>
                                {() => (
                                    <>
                                        <Text style={[styles.mainLargeText, { marginTop: 36 }]}>
                                            Welcome Back
                                        </Text>
                                        <Text style={styles.subText}>
                                            Hello Wiinser, sign to continue!
                                        </Text>
                                        <View style={{ marginTop: 48 }}>
                                            <WInput
                                                boxStyle={styles.inputBox}
                                                label={I18n.t('LOGIN-REGISTRER.PseudoOrEmail')}
                                                placeholder='Enter your pseudo'
                                                textContentType='username'
                                                flag={this.checkIfFlagged(PSEUDO_EMAIL)}
                                                returnKeyType='next'
                                                onSubmitEditing={() => this.passwordField.focus()} 
                                                onChangeText={val => this.handleInput(val, PSEUDO_EMAIL) }
                                            />
                                            <StandardInputPassword
                                                inputRef={ref => this.passwordField = ref}
                                                returnKeyType='done'
                                                boxStyle={styles.inputBox}
                                                label={I18n.t('CORE.Password')}
                                                placeholder='Enter your password'
                                                flag={this.checkIfFlagged(PASSWORD)}
                                                onChangeText={val => this.handleInput(val, PASSWORD) }
                                            />
                                            <View
                                                style={{
                                                    alignItems: 'flex-start',
                                                    marginBottom: 26
                                                }}>
                                                <Text
                                                    style={styles.forgotPwdLabel}
                                                    onPress={this.forgotPassword}>
                                                    {I18n.t('LOGIN-REGISTRER.ForgotPassword')}
                                                </Text>
                                            </View>
                                            <PrimaryGradientButton
                                                text='Sign in'
                                                style={styles.createButton}
                                                onPress={() => this._login()}
                                            />
                                        </View>
                                    </>
                                )}
                            </KeyboardShift>
                        </ScrollView>
                    </ErrorPresenter>
                </Sign>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    mainLargeText: { color: '#002251', fontSize: 24 },
    subText: { color: '#7A869A', fontSize: 14 },
    inputBox: { marginBottom: 21 },
    termsBox: { flexDirection: 'row', marginBottom: 26, alignItems: 'center' },
    termsLabel: { color: Theme.wColor, fontSize: 13, flex: 1 },
    forgotPwdLabel: { color: Theme.wColor },
    createButton: {},
    brand_container: {
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    logoBrand: {
        width: 190,
        height: 190,
        paddingRight: 25,
        resizeMode: 'contain'
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
        borderBottomWidth: 0.5
    },
    wiins_logo: {
        width: 70,
        height: 70,
        borderRadius: 70 / 2,
        borderColor: 'grey'
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
        color: '#ABABAB'
    },
    actionBarStyle: {
        flexDirection: 'row',
        paddingTop: StatusBar.currentHeight,
        paddingHorizontal: 31,
        backgroundColor: 'white',
        height: 60 + StatusBar.currentHeight,
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() + 10 : 10
    }
});

const mapStateToProps = (state) => ({
    MyUser: state.MyUser
});

const ActionCreators = Object.assign({}, MyUserActions);

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(ActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
