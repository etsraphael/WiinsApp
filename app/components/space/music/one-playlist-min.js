import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../../../redux/MyUser/actions'
import { bindActionCreators } from 'redux'
import FastImage from 'react-native-fast-image'

class OnePlaylistMin extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        const { playlist } = this.props
        const { type } = this.props

        switch (type) {
            case 'wiinser':
                return (
                    <View style={styles.container}>
                        <FastImage
                            style={{ width: 140, height: 140, borderRadius: 7 }}
                            source={{ uri: playlist.picture, priority: FastImage.priority.normal }}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                    </View>
                )
            case 'favorite':
                return (
                    <View style={styles.container}>
                        <FastImage
                            style={{ width: 140, height: 140, borderRadius: 7 }}
                            source={{ uri: playlist.picture}}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                    </View>
                )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginVertical: 15,
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 7,
        elevation: 5,
    }
})

const mapStateToProps = state => ({
    MyUser: state.MyUser
})

const ActionCreators = Object.assign(
    {},
    MyUserActions
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(OnePlaylistMin)