import React from 'react'
import { StyleSheet, View, ImageBackground, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../../redux/MyUser/actions'
import { bindActionCreators } from 'redux'
import { Platform } from 'react-native'
import SignIn from './sign-in'
import SignUp from './sign-up'


class Sign extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            view: 'login'
        }
    }

    // to navigate between the view
    onChangeView = (view) => {
        this.setState({ view })
    }

    // to select the views selected
    showView = () => {
        if (this.state.view == 'login') return <SignIn view={this.onChangeView} navigation={this.props.navigation} />
        else return <SignUp view={this.onChangeView} navigation={this.props.navigation}/>
    }

    render() {
        return (
            <View style={styles.main_container}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} style={{ flex: 1 }}>
                    <ImageBackground style={styles.backgroundImage} source={require('../../../assets/image/bg-sign.jpg')}>
                        {this.showView()}
                    </ImageBackground>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center'
    },
    brand_container: {
        flex: 3,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    logoBrand: {
        width: 190,
        height: 190,
        paddingRight: 25,
        resizeMode: 'contain',
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

export default connect(mapStateToProps, mapDispatchToProps)(Sign)