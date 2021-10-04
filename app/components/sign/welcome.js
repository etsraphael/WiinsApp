import React from 'react'
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { Theme } from '../core/reusable/design'
import { Sign } from '.'
import WelcomeSVG from '../../../assets/svg/welcome.svg'
import I18n from '../../../assets/i18n/i18n';
class WelcomePage extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Sign
                    label={I18n.t('CREATION.Create-an-account')}
                    onBackPress={() => this.props.navigation.goBack()}
                >
                    <View style={styles.containerSign}>
                        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }} bounces>
                            <Text style={styles.mainLargeText}>
                                {I18n.t('CORE.Welcome')}
                            </Text>
                            <Text style={styles.subText}>
                                {I18n.t('LOGIN-REGISTRER.Hello-Nice-t-meet-u')}
                            </Text>
                            <View style={{ paddingTop: 48, alignItems: 'center' }}>
                                <WelcomeSVG />
                            </View>
                            <Text style={[styles.text, { marginTop: 48 }]}>
                                {I18n.t('LOGIN-REGISTRER.A-confirmation-email-has-been-sent-to-you-Yr-nickname-is-reserved-for-30-days')}
                            </Text>
                            <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                                <TouchableOpacity style={styles.bottomText}>
                                    <Text style={{ color: Theme.wColor }}>
                                        {I18n.t('CORE.Back')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </Sign>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerSign: {
        width: '100%', paddingHorizontal: 36, flex: 1
    },
    mainLargeText: {
        color: '#002251',
        fontSize: 24,
        lineHeight: 29,
        marginTop: 36
    },
    subText: {
        color: '#7A869A',
        fontSize: 14
    },
    text: {
        color: '#7A869A',
        fontSize: 16,
        lineHeight: 19
    },
    bottomText: {
        marginTop: 64,
        textAlign: 'center'
    }
})

export default WelcomePage