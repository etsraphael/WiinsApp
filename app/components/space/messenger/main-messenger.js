import React from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../../../redux/MyUser/actions'
import { bindActionCreators } from 'redux'
import MessengerNavigation from '../../../navigation/messenger-navigation '
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

class MainMessenger extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.main_container}>
                <MessengerNavigation/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() + 10 : 5,
        backgroundColor: '#e3e6ef'
    }
})

const mapStateToProps = state => ({
    MyUser: state.MyUser
});

const ActionCreators = Object.assign(
    {},
    MyUserActions
);

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainMessenger)