import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FastImage from 'react-native-fast-image'

class StantardSuggest extends React.Component {

    constructor(props) {
        super(props)
    }

    // to nagiate to a profile
    _goToProfile = (profile) => {
        if(profile._id !== this.props.MyProfile._id )this.props.navigation.navigate('Profile', { profileId: profile._id})
        else this.props.navigation.navigate('MyProfile')
    }

    render() {
        const { suggest } = this.props

        return (
            <TouchableOpacity style={styles.main_container} onPress={() => this._goToProfile(suggest)}>
                <View style={styles.image_container}>
                <FastImage
                    style={styles.suggest_image}
                    source={{
                        uri: suggest.pictureprofile,
                        priority: FastImage.priority.normal,
                    }} resizeMode={FastImage.resizeMode.cover}
                />
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16 }}>{suggest._meta.pseudo}</Text>
                    <Text style={{ fontSize: 12, color: '#808080' }}>{suggest.mutalFriends} communs friends </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        flexDirection: 'row',
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#e6e6e6'
    },
    image_container: {
        width: 40,
        height: 40,
        borderColor: 'white',
        borderWidth: 3,
        borderRadius: 25,
        backgroundColor: 'white',
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    suggest_image: {
        width: 36,
        height: 36,
        borderRadius: 25,
    }
})

const mapStateToProps = state => ({
    MyProfile: state.MyProfile.profile
})

const ActionCreators = Object.assign({})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(StantardSuggest)