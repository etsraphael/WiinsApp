import React from 'react'
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from './../../../../redux/MyUser/actions'
import { bindActionCreators } from 'redux'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faNewspaper, faMusic, faVideo, faArrowLeft, faUserCog } from '@fortawesome/pro-light-svg-icons'
import FastImage from 'react-native-fast-image'

class Setting extends React.Component {

    constructor(props) {
        super(props)
    }

    // to display the header of the profile
    _renderHeader = () => {

        return (
            <View style={styles.header_container}>

                <View style={{ flex: 1, position: 'relative' }}>

                    {/* Back Btn */}
                    <TouchableOpacity onPress={() => this.props.screenProps.rootNavigation.goBack(null)}
                        style={{ position: 'absolute', left: 25, width: 35, height: 35, top: 55, zIndex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={faArrowLeft} color={'white'} size={30} />
                    </TouchableOpacity>

                    {/* Cover Picture */}
                    <FastImage
                        style={{ height: 200 }}
                        resizeMode={FastImage.resizeMode.cover}
                        source={{ uri: this.props.MyProfile.profile.picturecover, priority: FastImage.priority.normal }}
                    />

                    {/* Background Filter */}
                    <View style={{ backgroundColor: '#0000004d', width: '100%', height: 200, position: 'absolute' }} />

                    {/* Profile picture and name */}
                    <View style={{ position: 'absolute', top: 110, width: '100%', flexDirection: 'row', paddingHorizontal: 5 }}>
                        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                            <FastImage
                                style={{ height: 66, width: 66, borderRadius: 66 }}
                                source={{
                                    uri: this.props.MyProfile.profile.pictureprofile,
                                    priority: FastImage.priority.normal,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                        </View>
                        <View style={{ flex: 7, paddingLeft: 5, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 22, color: 'white', fontFamily: 'Avenir-Heavy' }}>@{this.props.MyProfile.profile._meta.pseudo}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    render() {

        return (
            <View style={styles.container}>
                <ScrollView>
                    {this._renderHeader()}
                    {/* {this._renderBody()} */}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    }
})

const mapStateToProps = state => ({
    MyUser: state.MyUser,
    MyProfile: state.MyProfile
});

const ActionCreators = Object.assign(
    {},
    MyUserActions
);

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Setting)