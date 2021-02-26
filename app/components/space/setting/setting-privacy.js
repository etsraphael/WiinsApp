import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Linking } from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../../../redux/MyUser/actions'
import { bindActionCreators } from 'redux'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleRight } from '@fortawesome/pro-light-svg-icons'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

class SettingPrivacy extends React.Component {

    constructor(props) {
        super(props)
    }

    _actionSelected = (code) => {
        switch (code) {
            case 'Our-Plateform': return Linking.openURL('https://www.wiins.io/term-of-use')
            case 'EULA': return Linking.openURL('https://www.apple.com/legal/internet-services/itunes/dev/stdeula/')
        }
    }

    render() {

        const listSetting = [
            { title: 'Our platform', code: 'Our-Plateform' },
            { title: 'EULA', code: 'EULA' },
        ]

        return (
            <View style={styles.main_container}>
                <View style={{ flex: 1, padding: 15 }}>
                    <FlatList
                        style={{ flex: 1, paddingBottom: 45 }}
                        data={listSetting}
                        keyExtractor={(item) => item.code.toString()}
                        ItemSeparatorComponent={() => <View style={{ height: 0.5, backgroundColor: '#c0c0c0' }} />}
                        renderItem={({ item }) =>
                            <TouchableOpacity style={{ flexDirection: 'row', paddingVertical: 15 }} onPress={() => this._actionSelected(item.code)}>
                                <View style={{ flex: 6, justifyContent: 'center' }}>
                                    <Text style={{ color: '#000000', fontSize: 16, fontWeight: '600', fontFamily: 'Avenir-Heavy' }}>{item.title}</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <FontAwesomeIcon icon={faAngleRight} color={'#808080a3'} size={30} />
                                </View>
                            </TouchableOpacity>
                        }
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() + 10 : 10 
    }
})

const mapStateToProps = state => ({
    MyUser: state.MyUser,
    MyProfile: state.MyProfile
})

const ActionCreators = Object.assign(
    {},
    MyUserActions,
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingPrivacy)