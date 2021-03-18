import React from 'react'
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../../redux/MyUser/actions'
import { bindActionCreators } from 'redux'
import SettingNavigation from './../../../navigationn/setting-navigation'

class SettingMain extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (<SettingNavigation />)
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingMain)