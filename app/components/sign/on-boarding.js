import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import I18n from '../../../assets/i18n/i18n'

class OnBoarding extends React.Component {

    render() {
        return (
            <>
                <LinearGradient
                    colors={['#35D1FE', '#0041C4', '#960CF8']}
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
                            <Text style={{ fontSize: 32, color: '#FFFFFF', paddingTop: 10, fontWeight: 'bold' }}>{I18n.t('CORE.Welcome')}</Text>
                            <Text style={{ paddingTop: 7, color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' }}>{I18n.t('CORE.Towards-an-infinite-space')}</Text>
                        </View>
                        <View style={styles.buttonsBox}>
                            <TouchableOpacity style={styles.googleButton} onPress={() => this.props.navigation.navigate('SignIn')}>
                                <Text style={{ fontSize: 16, color: '#0041C4' }}>{I18n.t('LOGIN-REGISTRER.Login')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.newAccountButton} onPress={() => this.props.navigation.navigate('Register')}>
                                <Text style={{ fontSize: 16, color: '#FFFFFF' }}>{I18n.t('LOGIN-REGISTRER.Register')}</Text>
                            </TouchableOpacity>
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