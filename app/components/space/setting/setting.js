import React from 'react'
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from './../../../../redux/MyUser/actions'
import { bindActionCreators } from 'redux'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faKey, faUser, faEllipsisH, faWallet, faCertificate, faSignOut } from '@fortawesome/pro-light-svg-icons'
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-community/async-storage'

class Setting extends React.Component {

    constructor(props) {
        super(props)
    }

    // to logout the user
    _logOut = async () => {
        await AsyncStorage.removeItem('userToken')
        this.props.actions.logOut()
    }

    // to display the header of the profile
    _renderHeader = () => {
        return (
            <View style={{ borderBottomRightRadius: 35, backgroundColor: '#0C1A32', height: 200, overflow: 'hidden' }}>

                <View style={{ flex: 1, position: 'relative' }}>

                    {/* Back Btn */}
                    <TouchableOpacity onPress={() => this.props.screenProps.rootNavigation.goBack(null)}
                        style={{ position: 'absolute', left: 25, width: 35, height: 35, top: 55, zIndex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={faArrowLeft} color={'white'} size={30} />
                    </TouchableOpacity>

                    {/* Cover Picture */}

                    <LinearGradient
                        colors={['#f12711', '#f5af19']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{ height: 200 }} />

                    {/* Profile picture and name */}
                    <View style={{ position: 'absolute', top: 130, width: '100%', flexDirection: 'row', paddingHorizontal: 5 }}>
                        <View style={{ flex: 1, paddingHorizontal: 35, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 28, color: 'white', fontFamily: 'Avenir-Heavy' }}>Setting</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    // icons setting
    _renderBody = () => {
        return (
            <View style={{ flex: 1, padding: 15 }}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => this.props.screenProps.rootNavigation.navigate('SettingProfile')}
                        style={{ flex: 1, padding: 15, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.onCard}>
                            <FontAwesomeIcon icon={faUser} color={'#808080a3'} size={30} />
                        </View>
                        <View style={{ paddingTop: 8 }}>
                            <Text style={{ color: '#000000', fontSize: 16, fontWeight: '600', fontFamily: 'Avenir-Heavy' }}>Profile</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.screenProps.rootNavigation.navigate('SettingPassword')} style={{ flex: 1, padding: 15, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.onCard}>
                            <FontAwesomeIcon icon={faKey} color={'#808080a3'} size={30} />
                        </View>
                        <View style={{ paddingTop: 8 }}>
                            <Text style={{ color: '#000000', fontSize: 16, fontWeight: '600', fontFamily: 'Avenir-Heavy' }}>Password</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.screenProps.rootNavigation.navigate('SettingLedger')} style={{ flex: 1, padding: 15, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.onCard}>
                            <FontAwesomeIcon icon={faWallet} color={'#808080a3'} size={30} />
                        </View>
                        <View style={{ paddingTop: 8 }}>
                            <Text style={{ color: '#000000', fontSize: 16, fontWeight: '600', fontFamily: 'Avenir-Heavy' }}>Ledger</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => this.props.screenProps.rootNavigation.navigate('SettingCertification')} style={{ flex: 1, padding: 15, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.onCard}>
                            <FontAwesomeIcon icon={faCertificate} color={'#808080a3'} size={30} />
                        </View>
                        <View style={{ paddingTop: 8 }}>
                            <Text style={{ color: '#000000', fontSize: 16, fontWeight: '600', fontFamily: 'Avenir-Heavy' }}>Certification</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.screenProps.rootNavigation.navigate('SettingOther')} style={{ flex: 1, padding: 15, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.onCard}>
                            <FontAwesomeIcon icon={faEllipsisH} color={'#808080a3'} size={30} />
                        </View>
                        <View style={{ paddingTop: 8 }}>
                            <Text style={{ color: '#000000', fontSize: 16, fontWeight: '600', fontFamily: 'Avenir-Heavy' }}>Others</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this._logOut()} style={{ flex: 1, padding: 15, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.onCard}>
                            <FontAwesomeIcon icon={faSignOut} color={'#808080a3'} size={30} />
                        </View>
                        <View style={{ paddingTop: 8 }}>
                            <Text style={{ color: '#000000', fontSize: 16, fontWeight: '600', fontFamily: 'Avenir-Heavy' }}>Log Out</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={{ height: '100%' }}>
                    {this._renderHeader()}
                    {this._renderBody()}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    onCard: {
        backgroundColor: 'white',
        borderWidth: 0,
        borderRadius: 9,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    }
})

const mapStateToProps = state => ({
    MyUser: state.MyUser,
    MyProfile: state.MyProfile
});

const ActionCreators = Object.assign(
    {},
    MyUserActions,
);

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Setting)