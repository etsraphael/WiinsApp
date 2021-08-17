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
import Snackbar from 'react-native-snackbar';
import I18n from '../../../assets/i18n/i18n';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { WInput, WGradientButton, Theme, WInputPassword } from '../core/design';
import ErrorPresenter from '../core/reusable/misc/error-presenter';
import Sign from './sign';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pseudo_email: null,
            password: null,

            // error
            error: null
        };
    }

    UNSAFE_componentWillReceiveProps = (newProps) => {
        if (!newProps.MyUser.isLoading && newProps.MyUser.error) {
            switch (newProps.MyUser.error) {
                case 'email_or_password_invalid': {
                    // return Snackbar.show({ text: I18n.t('ERROR-MESSAGE.Pseudo-Or-Email-Incorrect'), duration: Snackbar.LENGTH_LONG })
                    return this.setState({
                        error: I18n.t('ERROR-MESSAGE.Pseudo-Or-Email-Incorrect')
                    });
                }
                case 'account_deactivated': {
                    // return Snackbar.show({ text: I18n.t('ERROR-MESSAGE.Account_desactivated'), duration: Snackbar.LENGTH_LONG })
                    return this.setState({
                        error: I18n.t('ERROR-MESSAGE.Account_desactivated')
                    });
                }
            }
        }
    };

    // to log the user
    _login = () => {
        Keyboard.dismiss();
        if (!this.state.pseudo_email || !this.state.password) {
            // return Snackbar.show({ text: I18n.t('ERROR-MESSAGE.Pseudo-Or-Email-Incorrect'), duration: Snackbar.LENGTH_LONG })
            return this.setState({
                error: I18n.t('ERROR-MESSAGE.Pseudo-Or-Email-Incorrect')
            });
        }
        this.props.actions.login(this.state.pseudo_email, this.state.password);
    };

    // to select the loading animation
    _displayLoading = () => {
        return (
            <View style={styles.loading_container}>
                <ActivityIndicator size="large" color="#2CB0D6" />
            </View>
        );
    };

    forgotPassword = () => this.props.navigation.navigate('ForgotPassword');

    render() {
        return (
            <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'white' }}>
                <Sign label="Sign In" navigation={this.props.navigation}>
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
                            <Text
                                style={[
                                    styles.mainLargeText,
                                    { marginTop: 36 }
                                ]}>
                                Welcome Back
                            </Text>
                            <Text style={styles.subText}>
                                Hello Wiinser, sign to continue!
                            </Text>
                            <View style={{ marginTop: 48 }}>
                                <WInput
                                    boxStyle={styles.inputBox}
                                    label={I18n.t(
                                        'LOGIN-REGISTRER.PseudoOrEmail'
                                    )}
                                    textContentType="username"
                                    onChangeText={(val) =>
                                        this.setState({ pseudo_email: val })
                                    }
                                />
                                <WInputPassword
                                    boxStyle={styles.inputBox}
                                    label={I18n.t('CORE.Password')}
                                    onChangeText={(val) =>
                                        this.setState({ password: val })
                                    }
                                />
                                <View
                                    style={{
                                        alignItems: 'flex-start',
                                        marginBottom: 26
                                    }}>
                                    <Text
                                        style={styles.forgotPwdLabel}
                                        onPress={this.forgotPassword}>
                                        {I18n.t(
                                            'LOGIN-REGISTRER.ForgotPassword'
                                        )}
                                    </Text>
                                </View>
                                <WGradientButton
                                    text="Sign in"
                                    style={styles.createButton}
                                    onPress={() => this._login()}
                                />
                            </View>
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
