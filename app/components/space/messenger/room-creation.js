import React from 'react'
import {
    StyleSheet, View, Text, TextInput,
    TouchableOpacity, KeyboardAvoidingView
} from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../../redux/MyUser/actions'

import * as RoomActions from '../../../redux/OneRoom/actions'
import { bindActionCreators } from 'redux'
import { faPaperPlane, faUser } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

class RoomCreation extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            textInput: '',
            page: 0
        }
    }

    // to display one message
    _renderOnemMessage = (message, index) => {
        if (this.props.MyUser.user.profile == message.owner) return this._rightSideMessage(message)
        else return this._leftSideMessage(message, index)
    }

    // to display the message received
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

    // to set the bubble background
    _myBackgroundBubble = (responseServer) => {
        if (responseServer == undefined || responseServer == true) {
            return { backgroundColor: '#0498ff' }
        } else {
            return { backgroundColor: '#46befe9e' }
        }
    }

    // to listgen the scrolling  move
    _scrollOldMessage() {
        this.setState({ page: ++this.state.page })
        if (
            (this.state.page >= 1) &&
            (this.props.Room.room.nbMessage > this.props.Room.room.message.length) &&
            !this.props.Room.isLoading
        ) {
            this.props.actions.getMessageByPage(
                this.props.navigation.state.params.roomId, ++this.state.page,
                this.props.Room.room.nbMessage
            )
        }
    }

    // to send a messsage
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
        this.props.actions.sendMessage(message, this.props.navigation.state.params.roomId)
        this.setState({ textInput: '' })
    }

    // to update the input of the message
    inputChange = (event) => {
        this.setState({ textInput: event })
    }

    render() {

        return (
            <View style={styles.container}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 110 : 0}
                    style={{ flex: 1 }}
                >

                    <View style={{ paddingHorizontal: 15, paddingVertical: 10, justifyContent: 'center', alignItems: 'center', width: '100%', height: 85 }}>
                        <View style={[styles.input_container, { paddingLeft: 0 }]}>
                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', flex: 2 }}>
                                <View style={{ width: 45, height: 45, borderRadius: 45, backgroundColor: '#f73758', justifyContent: 'center', alignItems: 'center' }}>
                                    <FontAwesomeIcon icon={faUser} color={'white'} size={20} style={{ marginRight: 2 }} />
                                </View>
                            </TouchableOpacity>
                            <TextInput
                                style={styles.textInput}
                                placeholder='Choose a friend'
                                placeholderTextColor='#8c8c8c'
                                value={this.state.textInput}
                                onChangeText={this.inputChange}
                            >
                            </TextInput>
                        </View>
                    </View>

                    <View style={{ flex: 1, backgroundColor: '#4623fd' }}>





                        <View style={{ flex: 1, backgroundColor: 'white' }}>
                            <View style={{ marginBottom: 45, paddingTop: 15 }}>
                                {/* <FlatList
                                        contentContainerStyle={{ paddingHorizontal: 9 }}
                                        data={this.props.Room.room.message.sort((a, b) => b.createdAt.localeCompare(a.createdAt))}
                                        keyExtractor={(item) => item._id.toString()}
                                        renderItem={({ item, index }) => this._renderOnemMessage(item, index)}
                                        inverted={true}
                                        onEndReachedThreshold={0.2}
                                        onEndReached={() => this._scrollOldMessage()}
                                    />
                                     */}
                            </View>

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
    header_container: {

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

export default connect(mapStateToProps, mapDispatchToProps)(RoomCreation)