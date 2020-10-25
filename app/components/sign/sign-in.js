import React from 'react'
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Keyboard, ActivityIndicator, Image } from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../../redux/MyUser/actions'
import { bindActionCreators } from 'redux'
import Snackbar from 'react-native-snackbar';


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
                    return Snackbar.show({ text: 'email_or_password_invalid', duration: Snackbar.LENGTH_LONG })
                }
                case 'account_deactivated': {
                    return Snackbar.show({ text: 'account_deactivated', duration: Snackbar.LENGTH_LONG })
                }
            }
        }
    }

    // to log the user
    _login = () => {
        Keyboard.dismiss()
        if (!this.state.pseudo_email || !this.state.password) {
            return Snackbar.show({ text: 'Information Incorrect', duration: Snackbar.LENGTH_LONG })
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

    // to select the form view
    _displayInput = () => {
        return (
            <View>
                <TextInput
                    placeholder={'LOGIN-REGISTRER.PseudoOrEmail'}
                    style={styles.input_container}
                    placeholderTextColor="white"
                    onChangeText={(val) => this.setState({ pseudo_email: val })}
                />
                <TextInput
                    placeholder={'CORE.Password'}
                    style={styles.input_container}
                    secureTextEntry={true}
                    placeholderTextColor="white"
                    onChangeText={(val) => { this.setState({ password: val }) }}
                />
                <TouchableOpacity style={styles.btn_log} onPress={() => this._login()} underlayColor='#fff'>
                    <Text style={styles.loginText}>{'LOGIN-REGISTRER.Login'}</Text>
                </TouchableOpacity>
                {this._orSeparator()}
                <TouchableOpacity onPress={() => this.props.view('register')}
                    style={styles.btn_back}>
                    <Text style={styles.btn_Text}>
                        {'LOGIN-REGISTRER.Register'}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, width: '100%' }}>
                <View style={styles.brand_container}>
                    <Image style={styles.logoBrand} source={require('../../../assets/image/icon-wiins-name.png')} />
                </View>
                <View style={styles.card_container}>
                    {this.props.MyUser.isLoading ? this._displayLoading() : this._displayInput()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    brand_container: {
        flex: 3,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    logoBrand: {
        width: 190,
        height: 190,
        paddingRight: 25,
        resizeMode: 'contain',
    },
    card_container: {
        flex: 4,
        paddingHorizontal: 60,
        width: '100%'
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