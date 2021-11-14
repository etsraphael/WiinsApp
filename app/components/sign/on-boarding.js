import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native'
import FastImage from 'react-native-fast-image'
import I18n from '../../../assets/i18n/i18n'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as PlayerMusicActions from '../../redux/Player/actions'
import { setTheLanguageOfTheDeviceByDefault } from './../../services/translation/translation-service'
import { Theme, WGradient } from '../core/reusable/design'
import { StandardCustomBtn } from '../core/reusable/form'
import UsdHolding from '../../../assets/svg/hand-holding-usd-solid.svg'
import HelpingHands from '../../../assets/svg/hands-helping-solid.svg'

class OnBoarding extends React.Component {

    componentDidMount() {
        this.props.actions.resetPlayerActions()
             setTheLanguageOfTheDeviceByDefault()
    }

    render() {
        return (
            <>
                <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
                <WGradient style={styles.backgroundImage}>
                    <View style={styles.signContainer}>
                        <View style={styles.onboardingBox}>
                            <Image
                                source={require('../../../assets/image/icon/icon-brand.png')}
                                resizeMode={FastImage.resizeMode.contain}
                                style={styles.logoBrand} />
                            <Text style={{ fontSize: 32, color: '#FFFFFF', paddingTop: 10, fontWeight: 'bold' }}>{I18n.t('CORE.Welcome')}</Text>
                            <Text style={{ paddingTop: 7, color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' }}>{I18n.t('CORE.Towards-an-infinite-space')}</Text>
                        </View>
                        <View style={styles.buttonsBox}>
                            <StandardCustomBtn style={styles.googleButton} onPress={() => this.props.navigation.navigate('SignIn')}>
                                <Text style={{ fontSize: 16, color: Theme.wColor }}>{I18n.t('LOGIN-REGISTRER.Login')}</Text>
                            </StandardCustomBtn>
                            <StandardCustomBtn style={styles.newAccountButton} onPress={() => this.props.navigation.navigate('SignUp')}>
                                <Text style={{ fontSize: 16, color: '#FFFFFF' }}>{I18n.t('LOGIN-REGISTRER.Register')}</Text>
                            </StandardCustomBtn>
                            <View style={styles.vectorBox}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('HelpCommunity')}>
                                    <HelpingHands style={styles.vectorItem} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('HelpCommunity')}>
                                    <UsdHolding style={styles.vectorItem} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </WGradient>
            </>
        )
    }

}

const styles = StyleSheet.create({
    signContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 31,
        paddingBottom: 10
    },
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
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5
    },
    newAccountButton: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#FFFFFF',
        borderWidth: 1.5,
        marginTop: 5
    },
    vectorBox: {
        flexDirection: 'row',
        marginTop: 48,
        justifyContent: 'center'
    },
    vectorItem: {
        marginHorizontal: 10,
        tintColor: 'red'
    }
})


const mapStateToProps = state => ({
    MyUser: state.MyUser
})

const ActionCreators = Object.assign(
    {},
    PlayerMusicActions
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(OnBoarding)