import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FastImage from 'react-native-fast-image'

class ProfileTube extends React.Component {

    constructor(props) {
        super(props)
    }


    render() {
        return (
            <View style={styles.container}>
                <Text>ProfileTube</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
})

const mapStateToProps = state => ({
    MyProfile: state.MyProfile
})

const ActionCreators = Object.assign({})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTube)