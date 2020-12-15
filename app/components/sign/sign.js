import React from 'react'
import { StyleSheet, View, ImageBackground, KeyboardAvoidingView, Text, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../../redux/MyUser/actions'
import { bindActionCreators } from 'redux'
import { Platform } from 'react-native'
import SignIn from './sign-in'
import SignUp from './sign-up'
import LinearGradient from 'react-native-linear-gradient'
import FastImage from 'react-native-fast-image'


class Sign extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            view: 'null' // can be 'login' or 'register'
        }
    }

    // to navigate between the view
    onChangeView = (view) => {
        console.log(view)
        this.setState({ view })
    }

    // to select the views selected
    showView = () => {
        console.log(this.state.view, 'view')
        if (this.state.view === 'login') 
            return <SignIn view={this.onChangeView} navigation={this.props.navigation} />
        else if (this.state.view === 'register') 
            return <SignUp view={this.onChangeView} navigation={this.props.navigation}/>
        else 
            return this.renderOnboardingView()
    }

    // to return onboarding view
    renderOnboardingView = () => (
        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', padding: 31, paddingBottom: 56 }}>
            <View style={styles.onboardingBox}>
                <Image
                source={require('../../../assets/image/icon/icon-single.png')}
                resizeMode={FastImage.resizeMode.contain}
                style={styles.logoBrand} />
                <Text style={{ fontSize: 32, color: '#FFFFFF', paddingTop: 10, fontWeight: 'bold' }}>Welcome</Text>
                <Text style={{ paddingTop: 29, color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>to an infinite space</Text>
                <Text style={{ paddingTop: 7, color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' }}>with no ads at all!</Text>
            </View>
            <View style={styles.buttonsBox}>
                <TouchableOpacity style={styles.googleButton} onPress={() => this.onChangeView('login')}>
                    <Text style={{ fontSize: 16, color: '#0041C4' }}>Sign in with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.newAccountButton} onPress={() => this.onChangeView('register')}>
                    <Text style={{ fontSize: 16, color: '#FFFFFF' }}>Create New Account</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'center' }}>
                    <Text style={{ color: '#35D1FE', fontSize: 14 }}>Already have an account? </Text>
                    <Text onPress={() => this.onChangeView('login')} style={{ color: '#FFFFFF', fontSize: 14 }}>Sign in</Text>
                </View>
            </View>

        </View>
    )

    render() {
        return (
            <View style={styles.main_container}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} style={{ flex: 1 }}>
                    {/* <ImageBackground style={styles.backgroundImage} source={require('../../../assets/image/bg-sign.jpg')}>
                        {this.showView()}
                    </ImageBackground> */}
                    <LinearGradient 
                    colors={[ '#35D1FE', '#0041C4', '#960CF8' ]} 
                    style={styles.backgroundImage} 
                    locations={[0, 0.5596885789406173, 1]}
                    start={{ x: 0.1, y: 0.09 }}
                    end={{ x: 0.94, y: 0.95 }} >
                        { this.showView() }
                    </LinearGradient>
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
    },
    brand_container: {
        flex: 3,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    logoBrand: {
        width: 125,
        height: 131,
        marginRight: 25,
        resizeMode: 'contain',
    },
    onboardingBox: {
        alignSelf: 'stretch',
    },
    buttonsBox: {
        alignSelf: 'stretch',
        marginVertical: 49
    },
    googleButton: {
        height: 44,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
        borderRadius: 10
    },
    newAccountButton: {
        height: 44,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: '#FFFFFF',
        borderWidth: 1.5,
        marginTop: 5
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