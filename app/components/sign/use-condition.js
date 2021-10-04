import React from 'react'
import {
    StyleSheet, View, Text, Platform, ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../redux/MyUser/actions'
import { bindActionCreators } from 'redux'
import { Theme } from '../core/reusable/design'
import { Sign } from '.'
import I18n from '../../../assets/i18n/i18n';

const ConditionsOfUse = {
    [I18n.t('TERMS-OF-USE.TITLE.Definition-of-the-Tou')]: [
        I18n.t('TERMS-OF-USE.About-definition-of-the-Tou')
    ],
    [I18n.t('TERMS-OF-USE.TITLE.Agreement-to-the-Tou')]: [
        I18n.t('TERMS-OF-USE.About-agreement-to-the-Tou')
    ],
    [I18n.t('TERMS-OF-USE.TITLE.Modification-of-the-Tou')]: [
        I18n.t('TERMS-OF-USE.About-modification-of-the-Tou')
    ],
    [I18n.t('TERMS-OF-USE.TITLE.Legal-information')]: [
        I18n.t('TERMS-OF-USE.About-legal-information-adress')
    ],
    [I18n.t('TERMS-OF-USE.TITLE.Definitions')]: [
        I18n.t('TERMS-OF-USE.About-definitions')
    ],
    [I18n.t('TERMS-OF-USE.TITLE.Access-to-the-site')]: [
        I18n.t('TERMS-OF-USE.About-access-to-the-site')
    ],
    [I18n.t('TERMS-OF-USE.TITLE.Payment-confirmation-unsubscribe')]: [
        I18n.t('TERMS-OF-USE.About-payment-confirmation-unsubscribe')
    ],
    [I18n.t('TERMS-OF-USE.TITLE.Price')]: [
        I18n.t('TERMS-OF-USE.About-price-early-access')
    ],
    [I18n.t('TERMS-OF-USE.TITLE.Unsubscribe')]: [
        I18n.t('TERMS-OF-USE.About-unsubscribe')
    ],
    [I18n.t('TERMS-OF-USE.TITLE.General-restriction-of-use')]: [
        I18n.t('TERMS-OF-USE.About-general-restriction-of-use')
    ],
    [I18n.t('TERMS-OF-USE.TITLE.Personal-information')]: [
        I18n.t('TERMS-OF-USE.About-personal-information')
    ],
    [I18n.t('TERMS-OF-USE.TITLE.Intellectual-property-rights')]: [
        I18n.t('TERMS-OF-USE.About-intellectual-property-rights')
    ],
    [I18n.t('TERMS-OF-USE.TITLE.Responsibility')]: [
        I18n.t('TERMS-OF-USE.About-responsibility')
    ],
    [I18n.t('TERMS-OF-USE.TITLE.Hypertext-links')]: [
        I18n.t('TERMS-OF-USE.About-hypertext-links')
    ],
    [I18n.t('TERMS-OF-USE.TITLE.Publication-by-user')]: [
        I18n.t('TERMS-OF-USE.About-publication-by-user')
    ],
    [I18n.t('TERMS-OF-USE.TITLE.Applicable-law-and-jurisdiction')]: [
        I18n.t('TERMS-OF-USE.About-applicable-law-and-jurisdiction')
    ],

}

class UseCondition extends React.Component {
    goBack = () => {
        this.props.route.params.acceptCondition()
        this.props.navigation.pop()
    }
    render() {
        return (
            <Sign label={I18n.t('CORE.General-Conditions-Of-Use')} onBackPress={this.goBack} style={{ flex: 1, backgroundColor: 'white' }}>
                <View
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    keyboardVerticalOffset={0}
                    style={{ width: '100%', paddingHorizontal: 36, flex: 1 }}
                >
                    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }} bounces>
                        <Text style={[styles.text, { marginTop: 36 }]}>
                            {I18n.t('TERMS-OF-USE.Maybe-w-give-u-a-tip')}
                        </Text>
                        <View style={{ marginTop: 17, marginHorizontal: 22, marginBottom: 87 }}>
                            {
                                Object.keys(ConditionsOfUse).map((k, i) => {
                                    return (
                                        <React.Fragment key={`cond-of-use-${i}`}>
                                            <Text style={styles.mainLargeText}>{k}</Text>
                                            {ConditionsOfUse[k].map((t, i) => <Text key={`condtion-of-use-${i}`} style={[styles.text, { marginTop: 5 }]}>{t}</Text>)}
                                        </React.Fragment>
                                    )
                                })
                            }
                        </View>
                        {/* <Text style={styles.bottomText}>Date of last revision : 09/03/2021</Text> */}
                    </ScrollView>
                </View>
            </Sign>
        )
    }
}

const styles = StyleSheet.create({
    mainLargeText: {
        color: "#002251",
        fontSize: 24,
        lineHeight: 29,
        marginBottom: 13,
        marginTop: 17
    },
    text: {
        color: '#7A869A',
        fontSize: 14,
        lineHeight: 20
    },
    bottomText: {
        color: '#7A869A',
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
        paddingBottom: 36
    },
    inputBox: {
        marginBottom: 21
    },
    termsBox: {
        flexDirection: 'row',
        marginBottom: 26,
        alignItems: 'center'
    },
    termsLabel: {
        color: Theme.wColor,
        fontSize: 13,
        flex: 1
    },
    forgotPwdLabel: {
        color: Theme.wColor
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

export default connect(mapStateToProps, mapDispatchToProps)(UseCondition)