import React from 'react'
import {
    StyleSheet, View, Text, FlatList, ActivityIndicator, TextInput,
    TouchableOpacity, KeyboardAvoidingView
} from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../../redux/MyUser/actions'
import * as RoomActions from '../../../redux/OneRoom/actions'
import { bindActionCreators } from 'redux'
import FastImage from 'react-native-fast-image'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { faAngleLeft, faEllipsisH, faPaperPlane } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

class OneRoom extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            textInput: '',
            page: 0
        }
    }

    componentDidMount = () => {
        this.props.actions.getRoomById(this.props.route.params.room._id, 1, null)
        this.props.navigation.dangerouslyGetParent().setOptions({ tabBarVisible: false })
    }

    componentWillUnmount = () => {
        this.props.navigation.dangerouslyGetParent().setOptions({ tabBarVisible: true })
        this.props.actions.leaveRoom()
    }

    // to display a message
    _renderOnemMessage = (message, index) => {
        if (this.props.MyUser.user.profile == message.owner) return this._rightSideMessage(message)
        else return this._leftSideMessage(message, index)
    }

    // to display a message reveived
    _leftSideMessage = (message, index) => {
        return (
            <View style={{ flexDirection: 'row', marginVertical: 2 }}>
                <View style={{ flex: 7, flexDirection: 'row' }}>
                    <View style={{ justifyContent: 'flex-end', bottom: -5 }}>
                        {this.showAvatarOwner(message, index)}
                    </View>
                    <View style={{
                        backgroundColor: '#f1f0f0', borderRadius: 15, borderBottomStartRadius: 0,
                        paddingVertical: 9, paddingHorizontal: 13, marginLeft: 5
                    }}>
                        <Text style={{ textAlign: 'left', fontSize: 15 }}>{message.text}</Text>
                    </View>
                </View>
                <View style={{ flex: 3 }}/>
            </View>
        )
    }

    // to display a message sent
    _rightSideMessage = (message) => {
        return (
            <View style={{ flexDirection: 'row', paddingVertical: 5, marginVertical: 1 }}>
                <View style={{ flex: 3 }}></View>
                <View style={{ flex: 7, flexDirection: 'row-reverse' }}>
                    <View style={{ borderRadius: 15 }}>
                        <Text style={[styles.my_bubble_text, this._myBackgroundBubble(message.response_server)]}>
                            {message.text}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    // to se the background color of the bubble
    _myBackgroundBubble = (responseServer) => {
        if (responseServer == undefined || responseServer == true) {
            return { backgroundColor: '#0498ff' }
        } else {
            return { backgroundColor: '#46befe9e' }
        }
    }

    // to display the avatar of the owner
    showAvatarOwner = (message, index) => {

        if (
            (this.props.Room.room.message[index - 1] !== undefined) &&
            (this.props.Room.room.message[index - 1].owner == message.owner)
        ) { return (<View style={{ width: 25, height: 25, borderRadius: 25 }} />) }

        return (
            <FastImage style={{ width: 25, height: 25, borderRadius: 25 }} resizeMode={FastImage.resizeMode.cover}
                source={{
                    uri: this.props.Room.room.participants[0].pictureprofile,
                    priority: FastImage.priority.normal,
                }}
            />
        )
    }

    // to listen the scroll move
    _scrollOldMessage() {
        this.setState({ page: ++this.state.page })
        if (
            (this.state.page >= 1) &&
            (this.props.Room.room.nbMessage > this.props.Room.room.message.length) &&
            !this.props.Room.isLoading
        ) {
            this.props.actions.getMessageByPage(
                this.props.route.params.room._id, ++this.state.page,
                this.props.Room.room.nbMessage
            )
        }
    }

    // to display the loading animation
    _displayLoading = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' color="grey" />
            </View>
        )
    }

    // to send the message
    _send() {

        if (this.state.textInput.replace(/\s/g, '') == '') return this.setState({ textInput: '' })
        if (this.state.textInput == '') return null
        const message = {
            _id: (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1),
            createdAt: new Date().toString(),
            owner: this.props.MyUser.user.profile,
            text: String(this.state.textInput),
            response_server: false,
            type: 'text'
        }
        this.props.actions.sendMessage(message, this.props.route.params.room._id)
        this.setState({ textInput: '' })
    }

    // to set the input
    inputChange = (event) => {
        this.setState({ textInput: event })
    }

    _renderHeader = () => {
        return (<View style={{ height: 50, flexDirection: 'row', paddingHorizontal: 25 }}>
            <View style={{ flex: 2, justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <FontAwesomeIcon icon={faAngleLeft} color={'white'} size={25} />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 6, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <Text style={{ fontSize: 23, color: 'white', fontFamily: 'Avenir-Heavy' }}>{this.props.route.params.room.participants[0]._meta.pseudo}</Text>
            </View>
            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity>
                    <FontAwesomeIcon icon={faEllipsisH} color={'white'} size={25} />
                </TouchableOpacity>
            </View>
        </View>)
    }

    _bodyRender = () => {
        return (
            <View style={{ flex: 1, backgroundColor: 'white', borderTopLeftRadius: 45, borderTopRightRadius: 45 }}>
                {(this.props.Room.isLoading) && (this.state.page == 0) ? this._displayLoading() : null}
                {this.props.Room.room ?
                    <View style={{ paddingBottom: 100, paddingTop: 15 }}>
                        <FlatList
                            contentContainerStyle={{ paddingHorizontal: 9 }}
                            data={this.props.Room.room.message.sort((a, b) => b.createdAt.localeCompare(a.createdAt))}
                            keyExtractor={(item) => item._id.toString()}
                            renderItem={({ item, index }) => this._renderOnemMessage(item, index)}
                            inverted={true}
                            onEndReachedThreshold={0.2}
                            onEndReached={() => this._scrollOldMessage()}
                        />
                    </View> : null}
                <View style={styles.footer_container}>
                    <View style={styles.input_container}>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Write a text..'
                            placeholderTextColor='#8c8c8c'
                            value={this.state.textInput}
                            onChangeText={this.inputChange}
                        >
                        </TextInput>
                        <TouchableOpacity onPress={() => this._send()} style={{ justifyContent: 'center', alignItems: 'center', flex: 2 }}>
                            <View style={{ width: 45, height: 45, borderRadius: 45, backgroundColor: '#4726ff', justifyContent: 'center', alignItems: 'center' }}>
                                <FontAwesomeIcon icon={faPaperPlane} color={'white'} size={20} style={{ marginRight: 2 }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        )
    }

    render() {

        return (
            <View style={styles.container}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
                    style={{ flex: 1 }}
                >
                    <View style={styles.container_room}>
                        {this._renderHeader()}
                        {this._bodyRender()}
                    </View>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    container_room: {
        flex: 1,
        backgroundColor: '#4623fd',
        paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0
    },
    footer_container: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 85,
        position: 'absolute',
        bottom: 15
    },
    input_container: {
        width: '100%',
        height: '100%',
        paddingLeft: 25,
        borderRadius: 45,
        justifyContent: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#f2f2f2',
        backgroundColor: '#f2f3f7'
    },
    textInput: {
        flex: 9,
        fontSize: 15,
        fontWeight: '600',
        fontFamily: 'Avenir-Heavy'
    },
    my_bubble_text: {
        color: 'white',
        fontSize: 15,
        textAlign: 'right',
        borderRadius: 15,
        overflow: 'hidden',
        flexWrap: 'wrap',
        paddingVertical: 9,
        paddingHorizontal: 13
    }
})

const mapStateToProps = state => ({
    MyUser: state.MyUser,
    Room: state.Room
})

const ActionCreators = Object.assign(
    {},
    MyUserActions,
    RoomActions
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(OneRoom)