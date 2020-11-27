import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FastImage from 'react-native-fast-image'
import ProfilePublication from './profile-publication'
import ProfileMusic from './profile-music'
import * as ProfilePublicationActions from '../../../../redux/ProfilePublications/actions'
import * as MusicProjectListActions from '../../../../redux/MusicProjectList/actions'
import * as MyUserActions from '../../../../redux/MyUser/actions'
import * as PublicationFeedActions from '../../../../redux/FeedPublications/actions'
import LinearGradient from 'react-native-linear-gradient'
import ActionSheet from 'react-native-actionsheet'
import AsyncStorage from '@react-native-community/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faNewspaper, faMusic, faVideo } from '@fortawesome/free-solid-svg-icons'

class MyProfile extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            space: 'feed'
        }
    }

    componentWillUnmount() {
        // this.props.actions.getByMode(1, 'FollowerAndFriend')
    }

    componentDidMount() {
        this.props.actions.getByMode(1, 'myfeedpublication')
    }

    // to set the dropdowns actions
    _menuFunctions(index) {
        switch (index) {
            case 0: return this._logOut()
            default: return null
        }
    }

    // to logout the user
    _logOut = async () => {
        await AsyncStorage.removeItem('userToken')
        this.props.actions.logOut()
    }

    // to display the actions sheet
    showActionSheet = () => {
        this.ActionSheet.show()
    }

    // to display the header of the profile
    _renderHeader = () => {

        return (
            <View style={styles.header_container}>

                <View style={{ flex: 1, position: 'relative' }}>

                    {/* Back Btn */}
                    <TouchableOpacity  onPress={() => this.props.screenProps.rootNavigation.goBack(null)}
                        style={{ position: 'absolute', left: 25, width: 35, height: 35, top: 55, backgroundColor: 'red', zIndex: 1}}>
                    </TouchableOpacity>

                    {/* Dropdown Btn */}
                    <TouchableOpacity onPress={this.showActionSheet} 
                    style={{position: 'absolute', right: 25, width: 35, height: 35, top: 55, backgroundColor: 'red', zIndex: 1}}>
                    </TouchableOpacity>

                    {/* Cover Picture */}
                    <FastImage
                        style={{ height: 300 }}
                        resizeMode={FastImage.resizeMode.cover}
                        source={{ uri: this.props.MyProfile.profile.picturecover, priority: FastImage.priority.normal }}
                    />

                    {/* Background Filter */}
                    <View style={{ backgroundColor: '#0000004d', width: '100%', height: 300, position: 'absolute' }} />

                    {/* Profile picture and name */}
                    <View style={{ position: 'absolute', top: 210, width: '100%', flexDirection: 'row', paddingHorizontal: 5 }}>
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

                    {/* Stat */}
                    <View style={{ flexDirection: 'row', padding: 15, paddingRight: 15, borderColor: '#9d9d9d', borderBottomWidth: 0.5 }}>


                        <View style={{ flex: 1, flexDirection: 'row' }}>

                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text style={{ color: '#7C7C7C', fontSize: 17, fontFamily: 'Avenir-Heavy' }}>3121</Text>
                                <Text style={{ color: '#4E586E', fontSize: 15, fontFamily: 'Avenir-Book' }}>Following</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text style={{ color: '#7C7C7C', fontSize: 17, fontFamily: 'Avenir-Heavy' }}>5024</Text>
                                <Text style={{ color: '#4E586E', fontSize: 15, fontFamily: 'Avenir-Book' }}>Followers</Text>
                            </View>

                        </View>


                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>

                            <LinearGradient
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 0 }}
                                colors={['#3C349B', '#8E46DF']}
                                style={{ borderRadius: 25, position: 'relative', bottom: 3 }}
                            >
                                <TouchableOpacity >
                                    <Text style={styles.title_btn_nav}>Setting</Text>
                                </TouchableOpacity>
                            </LinearGradient>

                        </View>

                    </View>

                    {/* Nav */}
                    <View style={{ flexDirection: 'row', padding: 15, paddingRight: 15, borderColor: '#9d9d9d', borderBottomWidth: 0.5 }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={faNewspaper} color={'grey'} size={25} style={{ opacity: 0.8 }} />
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={faVideo} color={'grey'} size={25} style={{ opacity: 0.8 }} />
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={faMusic} color={'grey'} size={25} style={{ opacity: 0.8 }} />
                        </View>
                    </View>

                </View>
           
           
           
            </View>
        )
    }

    // to display the principal view
    _renderBody = () => {
        return (
            <View style={styles.body_container}>
                {/* ActifSpace */}
                {this._listContent()}
            </View>
        )
    }

    // to display the content of the profile
    _listContent = () => {
        switch (this.state.space) {
            case 'feed': return (<ProfilePublication />)
            case 'music': {
                this.props.actions.getMymusicProjectList(1)
                return (<ProfileMusic />)
            }
        }
    }

    render() {

        return (
            <View style={styles.container}>
                <ScrollView>
                    {this._renderHeader()}
                    {this._renderBody()}
                </ScrollView>
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    options={['Deconnexion', 'Cancel']}
                    cancelButtonIndex={2}
                    destructiveButtonIndex={1}
                    onPress={(index) => { this._menuFunctions(index) }}
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header_container: {
        position: 'relative',
    },
    title_btn_nav: {
        textAlign: 'center',
        paddingVertical: 12,
        paddingHorizontal: 15,
        fontWeight: '700',
        color: 'white'
    },
    body_container: {
        paddingTop: 10
    }
})

const mapStateToProps = state => ({
    MyProfile: state.MyProfile
})

const ActionCreators = Object.assign(
    {},
    // PublicationFeedActions,
    ProfilePublicationActions,
    MusicProjectListActions,
    MyUserActions
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile)