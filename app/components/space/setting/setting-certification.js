import React from 'react'
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../../redux/MyUser/actions'
import { bindActionCreators } from 'redux'
import { faArrowLeft } from '@fortawesome/pro-duotone-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

class SettingCertification extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            pageSelected: 'v'
        }
    }

    _backgroundBtnHeaderActif = () => {
        return { backgroundColor: '#6600ff' }
    }

    _colorTextBtnHeaderActif = () => {
        return { color: 'white' }
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


                <View style={{ flexDirection: 'row', paddingHorizontal: 35 }}>

                    <View style={{ flex: 1 }}>
                        <TouchableOpacity 
                            style={[styles.container_btn_header, this.state.pageSelected == 'v' && this._backgroundBtnHeaderActif()]}
                            onPress={() => this.setState({ pageSelected: 'v' })}
                        >
                            <Text style={[styles.header_text_btn, this.state.pageSelected == 'v' && this._colorTextBtnHeaderActif()]}>Verification</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                    <TouchableOpacity 
                        style={[styles.container_btn_header, this.state.pageSelected == 'c' && this._backgroundBtnHeaderActif()]}
                        onPress={() => this.setState({ pageSelected: 'c' })}
                    >
                            <Text style={[styles.header_text_btn, this.state.pageSelected == 'c' && this._colorTextBtnHeaderActif()]}>Certification</Text>
                        </TouchableOpacity>
                    </View>

                </View>


            </View>
        )
    }

    render() {
        return (
            <ScrollView style={styles.main_container}>
                {this._renderHeader()}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0
    },
    container_btn_header: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginHorizontal: 5,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d9d9d9'
    },
    header_text_btn: {
        fontSize: 19,
        fontWeight: '600'
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingCertification)