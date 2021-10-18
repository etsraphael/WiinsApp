import React from 'react'
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, Dimensions  } from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../../redux/MyUser/actions'
import { bindActionCreators } from 'redux'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/pro-duotone-svg-icons'
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-community/async-storage'
import I18n from '../../../../assets/i18n/i18n'
import { SettingNavigationMain } from './../../../navigation/setting-navigation'

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
            <View style={{ backgroundColor: '#0C1A32', height: 150, overflow: 'hidden' }}>

                <View style={{ flex: 1, position: 'relative' }}>

                    {/* Back Btn */}
                    <View style={{ flexDirection: 'row', textAlign: 'center', position: 'absolute', width: '100%', zIndex: 1, top: 20, paddingHorizontal: 25, paddingVertical: 20 }}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <FontAwesomeIcon icon={faArrowLeft} color={'white'} size={30} />
                        </TouchableOpacity>
                        <View style={{ paddingLeft: 15, justifyContent: 'center', top: -3 }}>
                            <Text style={{ fontSize: 28, color: 'white', fontFamily: 'Avenir-Heavy' }}>{I18n.t('CORE.Setting')}</Text>
                        </View>
                    </View>

                    {/* Cover Picture */}
                    <LinearGradient
                        colors={['#2CB0D6', '#3087D7', '#6743E0', '#ED6569']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{ height: 150 }} />
                </View>
            </View>
        )
    }

    _renderMenu = () => {
        return (
            <View style={styles.listBtnContainer}>
                <SafeAreaView style={{ height: Dimensions.get('window').height + 350 }}>
                    {/* <View style={{backgroundColor: 'red', height: 150}}/>
                    <View style={{backgroundColor: 'green', height: 150}}/>
                    <View style={{backgroundColor: 'red', height: 150}}/>
                    <View style={{backgroundColor: 'green', height: 150}}/>
                    <View style={{backgroundColor: 'red', height: 150}}/>
                    <View style={{backgroundColor: 'green', height: 150}}/>  */}
                    <SettingNavigationMain/>
                    {/* <View style={{backgroundColor: 'green', height: 150}}/> */}

                </SafeAreaView>
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView
                    style={styles.main_container}
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    <View style={{ height: 40 }}>
                        {this._renderHeader()}
                    </View>
                    <View style={{ flex: 1, top: 100, marginBottom: 150 }}>
                        {this._renderMenu()}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    listBtnContainer: {
        flex: 1,
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 25,
        top: -30,
        justifyContent: 'flex-end'
    },
    navigationBtn: {
        flex: 1,
        justifyContent: 'center',
        borderRadius: 11,
        backgroundColor: '#F6F7FA',
        paddingVertical: 20,
        paddingHorizontal: 19
    },
    textBtnNaviagation: {
        color: '#000000',
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Avenir-Heavy'
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