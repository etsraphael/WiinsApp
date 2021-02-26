import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../../../redux/MyUser/actions'
import { bindActionCreators } from 'redux'
import I18n from '../../../i18n/i18n'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faKey, faUser, faEllipsisH, faWallet, faCertificate, faSignOut, faUserShield } from '@fortawesome/pro-duotone-svg-icons'
import { faAngleRight } from '@fortawesome/pro-light-svg-icons'

class SettingPrivacy extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        const listSetting = [
            { title: 'Our platform', code: 'SettingProfile' },
            { title: 'EULA', code: 'SettingPassword' },
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
                            <TouchableOpacity style={{ flexDirection: 'row', paddingVertical: 15 }}>
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
        flex: 1
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