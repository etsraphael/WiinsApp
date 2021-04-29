import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FastImage from 'react-native-fast-image'
import ProfilePublication from './profile-publication'
import ProfileMusic from './profile-music'
import * as ProfilePublicationActions from '../../../redux/ProfilePublications/actions'
import * as MusicProjectListActions from '../../../redux/MusicProjectList/actions'
import * as MyUserActions from '../../../redux/MyUser/actions'
import * as PublicationInModalActions from '../../../redux/PublicationInModal/actions'
import ActionSheet from 'react-native-actionsheet'
import AsyncStorage from '@react-native-community/async-storage';
import { faArrowLeft, faUserCog } from '@fortawesome/pro-light-svg-icons'
import { faCircle } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import PublicationModalContainer from './../../core/modal/publication-modal-container'
import OptionPublicationModal from './../../core/modal/option-publication-modal'
import I18n from '../../../../assets/i18n/i18n'

class MyProfile extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            space: 'feed',
            modal: false,
            reportModal: false,
            reportModalExist: false,
            reportPublicationId: null,
            ownerReportPublication: null,
            spaceAvalaible: ['feed']
        }
    }

    componentDidMount() {
        this.props.actions.getByModeProfile(1, 'myfeedpublication')
        this._initializeNavBar()
    }

    _initializeNavBar = () => {
        switch (this.props.MyProfile.profile.actifSpace) {
            case 1: return this.setState({spaceAvalaible: ['feed']})
            case 2: return this.setState({spaceAvalaible: ['feed', 'music']})
            case 3: return this.setState({spaceAvalaible: ['feed', 'tube']})
            case 4: return this.setState({spaceAvalaible: ['feed', 'music', 'tube']})
        }
    }

    _toggleModal = (event) => {
        if (!!event) { this.props.actions.putPublicationInModalActions(event.publication) }
        else { this.props.actions.resetPublicationInModalActions() }
        this.setState({ modal: !this.state.modal, PublicationModal: event })
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

    _spaceSelected = (space) => {
        if (this.state.space == space) {
            return 'black'
        } else {
            return 'grey'
        }
    }

    _changeSpace = (space) => {
        switch (space) {
            case 'music':
                this.props.actions.getMymusicProjectList(1)
                return this.setState({ space: 'music' }) 
            case 'feed': {
                return this.setState({ space: 'feed' }) 
            }
            case 'tube' :{
                return this.setState({ space: 'tube' }) 
            }     
            default: return null
        }
    }

    // to display the header of the profile
    _renderHeader = () => {

        return (
            <View style={styles.header_container}>

                <View style={{ flex: 1, position: 'relative' }}>

                    {/* Title and btn */}
                    <View style={{ position: 'absolute', top: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', zIndex: 1, width: '100%' }}>
                        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                                style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <FontAwesomeIcon icon={faArrowLeft} color={'white'} size={30} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, color: 'white', fontWeight: '800' }}>Profile</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity onPress={this.showActionSheet}
                                style={{ justifyContent: 'flex-end' }}>
                                <FontAwesomeIcon icon={faUserCog} color={'white'} size={30} />
                            </TouchableOpacity>
                        </View>
                    </View>


                    {/* Cover Picture */}
                    <FastImage
                        style={{ height: 230, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}
                        resizeMode={FastImage.resizeMode.cover}
                        source={{ uri: this.props.MyProfile.profile.picturecover, priority: FastImage.priority.normal }}
                    />

                    {/* Background Filter */}
                    <View style={{ backgroundColor: '#0000004d', width: '100%', height: 230, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, position: 'absolute' }} />

                    {/* Profile picture and name */}
                    <View style={{ bottom: -50, width: '100%', flexDirection: 'row', paddingHorizontal: 5, position: 'absolute', paddingHorizontal: 35 }}>
                        <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <FastImage
                                style={{ width: '100%', aspectRatio: 1, borderRadius: 15, borderColor: '#6600ff', borderWidth: 2 }}
                                source={{
                                    uri: this.props.MyProfile.profile.pictureprofile,
                                    priority: FastImage.priority.normal,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                        </View>
                        <View style={{ flex: 7, paddingLeft: 15, justifyContent: 'space-evenly' }}>

                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={{ flex: 2 }} onPress={this.showActionSheet}>
                                    <View style={{ backgroundColor: '#6600ff', borderRadius: 5, justifyContent: 'center', alignItems: 'center', paddingVertical: 5 }}>
                                        <Text style={{ fontSize: 19, fontWeight: '600', color: 'white' }}>{I18n.t('CORE.Setting')}</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={{ flex: 1 }} />
                            </View>

                            <View style={{ position: 'relative', bottom: -15 }}>
                                <Text style={{ fontSize: 22, color: '#333333', fontFamily: 'Avenir-Heavy' }}>@{this.props.MyProfile.profile._meta.pseudo}</Text>
                                <Text style={{ color: '#77838F', fontSize: 15, fontFamily: 'Avenir-Book' }}>Community : {this.props.MyProfile.profile.communityTotal}</Text>
                            </View>
                        </View>
                    </View>

                </View>

                <View style={{ height: 75 }} />

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
            case 'feed': return (
                <ProfilePublication
                    toggleModal={(event) => this._toggleModal(event)}
                    toggleReportModal={(id, ownerId) => this._toggleReportModal(id, ownerId)}
                />
            )
            case 'music': return (<ProfileMusic />)
            case 'tube': return (<View/>)
        }
    }

    _toggleReportModal = (id, ownerId) => {
        this.setState({ reportModal: !this.state.reportModal, reportPublicationId: id, ownerReportPublication: ownerId })
        setTimeout(() => this.setState({ reportModalExist: !this.state.reportModalExist }), 100)
    }

    _goToProfile = () => {
        this.setState({ modal: false, PublicationModal: null })
    }

    _actifTextNavbar = (item) => {
        if(this.state.space == item) return {color: '#6600ff'}
    }

    _navbarRender = () => {
        return (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <FlatList
                data={this.state.spaceAvalaible}
                horizontal={true}
                keyExtractor={(item) => item.toString()}
                renderItem={({ item }) =>
                    <TouchableOpacity style={{paddingVertical: 5, paddingHorizontal: 7, flexDirection: 'row', alignItems: 'center'}} onPress={() => this._changeSpace(item)}>
                        {this.state.space == item && <FontAwesomeIcon style={{margin: 5}} icon={faCircle} color={'#6600ff'} size={10} />}
                        <Text style={[styles.text_navbar, this._actifTextNavbar(item)]}>{item}</Text>
                    </TouchableOpacity>
                }
            />
            </View>
        )
    }

    render() {

        return (
            <View style={styles.container}>
                <ScrollView>
                    {this._renderHeader()}
                    {this._navbarRender()}
                    {this._renderBody()}
                </ScrollView>
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    options={['Deconnexion', 'Cancel']}
                    cancelButtonIndex={2}
                    destructiveButtonIndex={1}
                    onPress={(index) => { this._menuFunctions(index) }}
                />

                {this.state.modal &&
                    <PublicationModalContainer
                        publicationModal={this.state.PublicationModal}
                        toggleModal={(event) => this._toggleModal(event)}
                        goToProfile={(payload) => this._goToProfile(payload)}
                        pageName={'Profile'}
                    />
                }

                {this.state.reportModal &&
                    <OptionPublicationModal
                        toggleReportModal={(event) => this._toggleReportModal(event)}
                        isVisible={this.state.reportModal}
                        publicationId={this.state.reportPublicationId}
                        myProfileId={this.props.MyProfile.profile._id}
                        ownerId={this.state.ownerReportPublication}
                    />
                }
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header_container: {
        position: 'relative'
    },
    title_btn_nav: {
        textAlign: 'center',
        paddingVertical: 12,
        paddingHorizontal: 15,
        fontWeight: '700',
        color: 'white'
    },
    body_container: {
        paddingTop: 5
    },
    text_navbar: {
        color: '#77838F',
        fontSize: 19,
        fontWeight: '600'
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
    MyUserActions,
    PublicationInModalActions
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile)