import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../../redux/MyUser/actions'
import { bindActionCreators } from 'redux'
import { Picker } from '@react-native-picker/picker';
import i18n from '../../../../assets/i18n/i18n'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/pro-duotone-svg-icons'
import { languageList } from './../../core/data/language'

class SettingLanguage extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            languageSelected: null
        }
    }

    componentDidMount = () => {
        this.setState({ languageSelected: this.props.MyUser.user.config.language })
    }

    _renderHeader = () => {
        return (
            <View>
                <View style={{ flexDirection: 'row', padding: 15 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                        style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={faArrowLeft} color={'grey'} size={30} />
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 19, fontWeight: '600' }}>{i18n.t('SETTING.lang.lang-of-plateforme')}</Text>
                </View>

            </View>
        )
    }

    _pickerView = () => {
        return <Picker
            selectedValue={this.state.languageSelected}
            onValueChange={(itemValue) => this.setState({ languageSelected: itemValue })}>
            {languageList.map(x => <Picker.Item label={x.language} value={x.code} />)}
        </Picker>
    }

    _confirmBtnView = () => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={styles.container_confirm_btn}>
                    <Text style={styles.text_confirm}>{i18n.t('CORE.Confirm')}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.main_container}>
                {this._renderHeader()}
                {this._pickerView()}
                {this.props.MyUser.user.config.language !== this.state.languageSelected && this._confirmBtnView()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
        marginBottom: 65
    },
    container_confirm_btn: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: 5,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6600ff'
    },
    text_confirm: {
        fontSize: 19,
        fontWeight: '600',
        color: 'white'
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingLanguage)