import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native'
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

class OnBoarding extends React.Component {

    render() {
        return (
            <>
            <StatusBar barStyle="default" hidden = {false} backgroundColor = "transparent" translucent = {true}/>
            <LinearGradient 
            colors={[ '#35D1FE', '#0041C4', '#960CF8' ]} 
            style={styles.backgroundImage} 
            locations={[0, 0.5596885789406173, 1]}
            start={{ x: 0.1, y: 0.09 }}
            end={{ x: 0.94, y: 0.95 }} >

                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', padding: 31, paddingBottom: 10 }}>
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
                        <TouchableOpacity style={styles.googleButton} onPress={() => this.props.navigation.navigate('SignIn')}>
                            <Text style={{ fontSize: 16, color: '#0041C4' }}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.newAccountButton} onPress={() => this.props.navigation.navigate('Register')}>
                            <Text style={{ fontSize: 16, color: '#FFFFFF' }}>Register</Text>
                        </TouchableOpacity>
                        {/* <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'center' }}>
                            <Text style={{ color: '#35D1FE', fontSize: 14 }}>Already have an account? </Text>
                            <Text onPress={() => this.props.navigation.navigate('SignIn')} style={{ color: '#FFFFFF', fontSize: 14 }}>Sign in</Text>
                        </View> */}
                    </View>
                </View>

            </LinearGradient>
            </>
        )
    }

}


const styles = StyleSheet.create({
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
        height: 60,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
        borderRadius: 10
    },
    newAccountButton: {
        height: 60,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: '#FFFFFF',
        borderWidth: 1.5,
        marginTop: 5
    }
})

export default OnBoarding