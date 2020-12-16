import React from 'react'
import {
    StyleSheet,
    View,
    KeyboardAvoidingView,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux'
import * as MyUserActions from '../../../redux/MyUser/actions'
import { bindActionCreators } from 'redux'
import { Platform } from 'react-native'
import SignIn from './sign-in'
import SignUp from './sign-up'
import LinearGradient from 'react-native-linear-gradient'
import FastImage from 'react-native-fast-image'
import SignNaviation from '../../navigation/sign-naviation';


class Sign extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            view: null, // can be 'login' or 'register'
        }
    }

    render() {
        return (
            <View style={styles.main_container}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} style={{ flex: 1 }}>
                    <SignNaviation />
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
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

export default connect(mapStateToProps, mapDispatchToProps)(Sign)