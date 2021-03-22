import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../../redux/MyUser/actions'
import { bindActionCreators } from 'redux'
import FastImage from 'react-native-fast-image'
import { getDateTranslated } from '../../../services/translation/translation-service'

class OneRoomMin extends React.Component {

    constructor(props) {
        super(props)
    }

    // to display the last message
    _renderLastMessage = () => {
        return (
            <View>
                <Text numberOfLines={1} style={{ color: 'grey' }}>
                    {this.props.MyUser.user.profile == this.props.room.lastMessage.owner ? <Text>You: </Text> : null}
                    {this.props.room.lastMessage.text}
                </Text>
            </View>
        )
    }

    // to display the badge
    _renderBadgeNotif = (notif) => {
        return (
            <View style={{ backgroundColor: '#4525fd', justifyContent: 'center', alignItems: 'center', paddingVertical: 2, paddingHorizontal: 6, borderRadius: 5 }}>
                <Text style={{ fontFamily: 'Avenir-Heavy', fontSize: 16, color: 'white' }}>{notif}</Text>
            </View>
        )
    }

    // to display the date
    _renderDate = () => {
        return null
    }

    // to color the background on the row
    _activeBackground = (notif) => {
        if (notif > 0) return { backgroundColor: '#f4f7fe' }
    }

    render() {

        const { room } = this.props

        return (
            <TouchableOpacity
                // onPress={() => this.props.goToRoom(room)}

                onPress={() => this.props.navigation.navigate('OneRoom', {room})}




                style={[styles.container_room, this._activeBackground(room.roomOption.participants[0].notification)]}
            >
                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.container_img_profile}>
                        <FastImage style={{ width: '100%', aspectRatio: 1 }} resizeMode={FastImage.resizeMode.cover}
                            source={{ uri: room.participants[0].pictureprofile, priority: FastImage.priority.normal }}
                        />
                    </View>
                </View>
                <View style={{ flex: 8, justifyContent: 'center' }}>
                    <Text style={{ marginBottom: 5, fontWeight: '700', fontSize: 14 }}>{room.participants[0]._meta.pseudo}</Text>
                    {this._renderLastMessage()}
                </View>
                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'Avenir-Heavy', fontSize: 12, fontWeight: '400' }}>{getDateTranslated(this.props.room.updatedAt)}</Text>
                    {room.roomOption.participants[0].notification > 0 ? this._renderBadgeNotif(room.roomOption.participants[0].notification) : this._renderDate()}
                </View>
            </TouchableOpacity>
        )
    }

}


const styles = StyleSheet.create({
    container_img_profile: {
        width: 53,
        height: 53,
        borderRadius: 53,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container_room: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 25,
        marginVertical: 5,
        marginHorizontal: 15
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

export default connect(mapStateToProps, mapDispatchToProps)(OneRoomMin)