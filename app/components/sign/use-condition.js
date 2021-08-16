import React from 'react'
import {
    StyleSheet, View, Text, StatusBar, Platform, ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../redux/MyUser/actions'
import { bindActionCreators } from 'redux'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { Theme } from '../core/design'
import { Sign } from '.'

const ConditionsOfUse = {
    '1. Definition of the role of the GTU': [
        `1.1. The purpose of the present general conditions of use (known as "GTU") is to provide a legal framework for the terms and conditions of availability of the site and services of Espace-Piin's Inc. via Wiin's and to define the conditions of access and use of the services by the "user".`,
        `1.2. Use of the Wiin's website and Wiin's applications (iOS and Android) and all products, Wiin's Music, Wiin's Tube, Wiin's Story, including the audio and video player that may be incorporated therein, are subject to these terms and conditions of use.`,
        `1.3. This legally binding agreement between you and Shopping Spaces Inc. includes (a) the terms and conditions set forth in this document, (b) the Wiin's Community`,
        `15.2.Any content put online by the user is his sole responsibility. The user undertakes not to put online any content that may harm the interests of third parties. Any legal action taken by an injured third party against the site will be borne by the user. The user's content may be removed or modified by the site at any time without notice.`
    ],
    '16. Applicable law and jurisdiction': [
        `Canadian law applies to this Agreement. In the event of failure to reach an amicable resolution of a dispute arising between the parties, the Canadian courts shall have sole jurisdiction to determine the outcome. If you have any questions regarding the application of these GTU, you can contact the publisher at the contact information listed in ARTICLE 1. `
    ]
}

class UseCondition extends React.Component {
    goBack = () => {
        this.props.route.params.acceptCondition()
        this.props.navigation.pop()
    }
    render() {
        return (
            <Sign label="General Conditions Of Use" onBackPress={this.goBack} style={{ flex: 1, backgroundColor: 'white' }}>
                <View
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    keyboardVerticalOffset={0}
                    style={{ width: '100%', paddingHorizontal: 36, flex: 1 }}
                >
                    <ScrollView showsVerticalScrollIndicator={false}  style={{ flex: 1 }} bounces>
                        <Text style={ [styles.text, { marginTop: 36 }] }>Maybe we give you a tip on how to make millions of dollars in our « GTU », so take the time to read it.</Text>
                        <View style={{ marginTop: 17, marginHorizontal: 22, marginBottom: 87 }}>
                            {
                                Object.keys(ConditionsOfUse).map((k, i) => {
                                    return (
                                        <React.Fragment key={`cond-of-use-${i}`}>
                                            <Text style={[styles.mainLargeText, { marginBottom: 13, marginTop: 17 }]}>{ k }</Text>
                                            { ConditionsOfUse[k].map((t, i) => <Text key={`condtion-of-use-${i}`} style={[styles.text , { marginTop: 5 }]}>{ t }</Text>) }
                                        </React.Fragment>
                                    )
                                })
                            }
                        </View>
                        <Text style={styles.bottomText}>Date of last revision : 09/03/2021</Text>
                    </ScrollView>
                </View>
            </Sign>
        )
    }
}

const styles = StyleSheet.create({
    mainLargeText: { color: "#002251", fontSize: 24, lineHeight: 29 },
    text: { color: '#7A869A', fontSize: 14, lineHeight: 20 },
    bottomText: { color: '#7A869A', fontSize: 14, textAlign: 'center', lineHeight: 20, paddingBottom: 36  },
    inputBox: { marginBottom: 21 },
    termsBox: { flexDirection: 'row', marginBottom: 26, alignItems: 'center' },
    termsLabel: { color: Theme.wColor, fontSize: 13, flex: 1 },
    forgotPwdLabel: { color: Theme.wColor },
    createButton: {
    },
    brand_container: {
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    logoBrand: {
        width: 190,
        height: 190,
        paddingRight: 25,
        resizeMode: 'contain',
    },
    card_container: {
        width: '100%',
        marginTop: 56
    },
    input_container: {
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 10,
        marginBottom: 10,
        color: 'black',
        height: 39,
        borderBottomColor: '#ABABAB',
        borderBottomWidth: .5,
    },
    wiins_logo: {
        width: 70,
        height: 70,
        borderRadius: 70 / 2,
        borderColor: 'grey',
    },
    btn_log: {
        marginTop: 10,
        height: 60,
        overflow: 'hidden',
        borderWidth: 0,
        borderRadius: 10
    },
    loginText: {
        paddingTop: 5,
        paddingBottom: 5,
        textAlign: 'center',
        color: 'white',
        fontSize: 16
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
        color: 'black',
        fontSize: 16
    },
    inputLabel: {
        color: '#ABABAB',
    },
    actionBarStyle: {
        flexDirection: 'row',
        paddingTop: StatusBar.currentHeight,
        paddingHorizontal: 31,
        backgroundColor: "white",
        height: 60 + StatusBar.currentHeight,
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() + 10 : 10
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