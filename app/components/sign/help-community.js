import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Platform,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import * as MyUserActions from '../../redux/MyUser/actions';
import { bindActionCreators } from 'redux';
import { Theme } from '../core/reusable/design';
import { PrimaryGradientButton } from './../core/reusable/form'
import { Sign } from '.';

class HelpCommunity extends React.Component {
    render() {
        return (
            <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'white' }}>
                <Sign
                    label="Help Community"
                    onBackPress={() => this.props.navigation.goBack()}>
                    <View
                        behavior={Platform.OS === 'ios' ? 'padding' : null}
                        keyboardVerticalOffset={0}
                        style={{
                            width: '100%',
                            paddingHorizontal: 36,
                            flex: 1
                        }}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            style={{ flex: 1 }}
                            bounces>
                            <Text style={styles.mainLargeText}>
                                Welcome
                            </Text>
                            <Text style={[styles.text, { marginTop: 10 }]}>
                                « They did not know it was impossible so they did it » Mark Twain or Winston Churchill or Marcel Pagnol. We don't know but it's a good quote!
                            </Text>
                            <Text style={[styles.text, { marginTop: 10 }]}>
                                We need programmers, designers, artist, editor ...
                            </Text>
                            <View style={{ marginBottom: 87, marginTop: 87 }}>
                                <PrimaryGradientButton text="Join us in this adventure" />
                            </View>
                        </ScrollView>
                    </View>
                </Sign>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    mainLargeText: {
        color: "#002251",
        fontSize: 24,
        lineHeight: 29,
        marginTop: 36
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
});

const mapStateToProps = (state) => ({
    MyUser: state.MyUser
});

const ActionCreators = Object.assign({}, MyUserActions);

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(ActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(HelpCommunity);
