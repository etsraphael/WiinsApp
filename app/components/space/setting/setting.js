import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from './../../../../redux/MyUser/actions'
import { bindActionCreators } from 'redux'

class Setting extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Settings!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
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

export default connect(mapStateToProps, mapDispatchToProps)(Setting)