import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native'
import { connect } from 'react-redux';
import * as MyUserActions from '../../redux/MyUser/actions';
import { bindActionCreators } from 'redux';
import { Platform } from 'react-native';
import Snackbar from 'react-native-snackbar';
import CheckBox from '@react-native-community/checkbox';
import i18n from './../../../assets/i18n/i18n';
import { getCurrentLanguageOfTheDevice } from './../../services/translation/translation-service';
import { Theme, WGradientButton, WInput, WInputPassword } from '../core/design';
import ErrorPresenter from '../core/reusable/misc/error-presenter';
import Sign from './sign';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            pseudo: null,
            password: null,
            password2: null,
            registration_success: false,
            conditionAccepted: false,

            // error
            error: null
        };
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        if (!newProps.MyUser.isLoading) {
            if (!!newProps.MyUser.message) {
                switch (newProps.MyUser.message) {
                    case 'success':
                        return this.setState({ registration_success: true });
                    case 'pseudo_already_exist': {
                        return Snackbar.show({
                            text: i18n.t('ERROR-MESSAGE.Pseudo-already-exist'),
                            duration: Snackbar.LENGTH_LONG
                        });
                    }
                    case 'email_already_exist': {
                        return Snackbar.show({
                            text: i18n.t('ERROR-MESSAGE.Email_already_exist'),
                            duration: Snackbar.LENGTH_LONG
                        });
                    }
                }
            }
        }
    }

    // to send the registration
    _register = () => {
        if (!this._verificationTrue()) return null;
        if (!this.state.conditionAccepted) {
            return Snackbar.show({
                text: i18n.t('ERROR-MESSAGE.y-h-to-accept-the-tou'),
                duration: Snackbar.LENGTH_LONG
            });
        } else {
            const user = {
                pseudo: this.state.pseudo,
                email: this.state.email,
                password: this.state.password
            };
            const userDetail = { language: getCurrentLanguageOfTheDevice() };
            return this.props.actions.register(user, userDetail);
        }
    };

    // to check all the verifications
    _verificationTrue = () => {
        // null value
        if (!this.state.email || !this.state.pseudo || !this.state.password) {
            // Snackbar.show({ text: i18n.t('ERROR-MESSAGE.Missing-informations'), duration: Snackbar.LENGTH_LONG })
            this.setState({
                error: i18n.t('ERROR-MESSAGE.Missing-informations')
            });
            return false;
        }

        // email validation
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(this.state.email) === false) {
            // Snackbar.show({ text: i18n.t('ERROR-MESSAGE.Email-invalid'), duration: Snackbar.LENGTH_LONG })
            this.setState({ error: i18n.t('ERROR-MESSAGE.Email-invalid') });
            return false;
        }

        // password validation
        if (this.state.password.length <= 4) {
            // Snackbar.show({ text: i18n.t('SETTING.password.Error-min-5-char'), duration: Snackbar.LENGTH_LONG })
            this.setState({
                error: i18n.t('SETTING.password.Error-min-5-char')
            });
            return false;
        }

        if (this.state.password !== this.state.password2) {
            // Snackbar.show({ text: i18n.t('PLACEHOLDER.Password-not-matching'), duration: Snackbar.LENGTH_LONG })
            this.setState({
                error: i18n.t('PLACEHOLDER.Password-not-matching')
            });
            return false;
        }

        // pseudo validation
        if (this.state.pseudo.length <= 4) {
            Snackbar.show({
                text: i18n.t(
                    'ERROR-MESSAGE.Your-username-must-have-at-least-4-char'
                ),
                duration: Snackbar.LENGTH_LONG
            });
            this.setState({
                error: i18n.t(
                    'ERROR-MESSAGE.Your-username-must-have-at-least-4-char'
                )
            });
            return false;
        }

        return true;
    };

    // to select the loading animation
    _displayLoading() {
        return (
            <View style={styles.loading_container}>
                <ActivityIndicator size="large" color="#2CB0D6" />
            </View>
        );
    }

    // to make sure the user is more than 18 years old
    _getMaxDate = () => {
        let date = new Date();
        date.setFullYear(date.getFullYear() - 18);
        return Number(date.getTime());
    };

    acceptCondition() {
        this.setState({ conditionAccepted: true });
    }

    goToUseOfCondition = () => {
        this.props.navigation.push('UseCondition', {
            acceptCondition: this.acceptCondition.bind(this)
        });
    };

    render() {
        return (
            <KeyboardAvoidingView
                style={{
                    flex: 1,
                    backgroundColor: 'white',
                    position: 'relative'
                }}>
                <Sign
                    label="Create an account"
                    navigation={this.props.navigation}>
                    <ErrorPresenter
                        error={this.state.error}
                        onHide={() => this.setState({ error: null })}
                        duration={3000}
                        behavior={Platform.OS === 'ios' ? 'padding' : null}
                        keyboardVerticalOffset={0}
                        style={{
                            width: '100%',
                            paddingHorizontal: 36,
                            flex: 1,
                            position: 'relative'
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
                                Welcome
                            </Text>
                            <Text style={styles.subText}>
                                Hello! Nice to meet you new Wiinser
                            </Text>
                            <View style={{ marginTop: 48 }}>
                                <WInput
                                    boxStyle={styles.inputBox}
                                    label="Pseudo"
                                    onChangeText={val =>
                                        this.setState({
                                            pseudo: val.replace(/\s/g, '')
                                        })
                                    }
                                    textContentType="username"
                                />
                                <WInput
                                    boxStyle={styles.inputBox}
                                    label="Email"
                                    onChangeText={val =>
                                        this.setState({
                                            email: val.replace(/\s/g, '')
                                        })
                                    }
                                    textContentType="emailAddress"
                                />
                                <WInputPassword
                                    boxStyle={styles.inputBox}
                                    label="Password"
                                    onChangeText={val =>
                                        this.setState({ password: val })
                                    }
                                />
                                <WInputPassword
                                    boxStyle={styles.inputBox}
                                    label="Confirm your password"
                                    onChangeText={val =>
                                        this.setState({ password2: val })
                                    }
                                />
                                <View style={styles.termsBox}>
                                    <View style={{ paddingRight: 30 }}>
                                        {/* <WCheckBox /> */}
                                        <CheckBox
                                            style={{ width: 20, height: 20 }}
                                            boxType="circle"
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
                                <View style={{ marginBottom: 130 }}>
                                    <WGradientButton
                                        text="Create an account"
                                        style={styles.createButton}
                                        onPress={() => this._register()}
                                    />
                                </View>
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
    termsBox: {
        flexDirection: 'row',
        /* marginBottom: 130, */ marginBottom: 38,
        alignItems: 'center'
    },
    termsLabel: { color: Theme.wColor, fontSize: 13, flex: 1 },
    forgotPwdLabel: { color: Theme.wColor },
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
