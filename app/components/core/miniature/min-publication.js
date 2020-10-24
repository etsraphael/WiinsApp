import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, DeviceEventEmitter, Image } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LinearGradient from 'react-native-linear-gradient'

class MinPublication extends React.Component {

    constructor(props) {
        super(props)
    }

    // to get te view of the publication post
    _renderPost(publication) {

        let background
        let orientation

        switch (publication.background) {
            case 'linear-gradient(to left bottom, #8d7ab5, #dc74ac, #ff7d78, #ffa931, #c0e003)': {
                background = ['#8d7ab5', '#dc74ac', '#ff7d78', '#ffa931', '#c0e003']
                orientation = [{ x: 1, y: 0 }, { x: 0, y: 1 }]
                break;
            }
            case 'linear-gradient(to right top, #000000, #000000, #000000, #000000, #000000)': {
                background = ['#000000', '#000000']
                orientation = [{ x: 0, y: 1 }, { x: 1, y: 0 }]
                break;
            }
            case 'linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)': {
                background = ['#051937', '#004d7a', '#008793', '#00bf72', '#a8eb12']
                orientation = [{ x: 0, y: 1 }, { x: 1, y: 0 }]
                break;
            }
            case 'linear-gradient(45deg, #ff0047 0%, #2c34c7 100%)': {
                background = ['#ff0047', '#2c34c7']
                orientation = [{ x: 0, y: 1 }, { x: 1, y: 0 }]
                break;
            }
            case 'linear-gradient(to right top, #282812, #4a3707, #7b3d07, #b43527, #eb125c)': {
                background = ['#282812', '#4a3707', '#7b3d07', '#b43527', '#eb125c']
                orientation = [{ x: 0, y: 1 }, { x: 1, y: 0 }]
                break;
            }
            case 'linear-gradient(to left bottom, #17ea8a, #00c6bb, #009bca, #006dae, #464175)': {
                background = ['#17ea8a', '#00c6bb', '#009bca', '#006dae', '#464175']
                orientation = [{ x: 0, y: 1 }, { x: 1, y: 0 }]
                break;
            }
        }

        return (
            <TouchableOpacity style={styles.container_type}
                onPress={() => DeviceEventEmitter.emit('toggleModal', { publication, navigation: this.props.navigation, space: this.props.space })}
            >
                <LinearGradient
                    colors={background}
                    start={orientation[0]}
                    end={orientation[1]}
                    style={{ flex: 1, borderRadius: 35 }}>
                    <Text style={{
                        paddingTop: 60,
                        paddingBottom: 50,
                        paddingHorizontal: 15,
                        lineHeight: 25,
                        fontWeight: '400',
                        fontSize: 19,
                        fontFamily: 'Gill Sans',
                        textAlign: 'center',
                        margin: 10,
                        color: '#ffffff',
                        backgroundColor: 'transparent'
                    }}>
                        {publication.text}
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    }

    // to get te view of the publication picture
    _renderPicture(publication) {
        return (
            <TouchableOpacity style={styles.container_type}
                onPress={() => DeviceEventEmitter.emit('toggleModal', { publication, navigation: this.props.navigation, space: this.props.space })}
            >
                <Image
                    source={{ uri: publication.file }}
                    style={{ width: '100%', height: 300, flex: 1, borderRadius: 35, resizeMode: 'cover' }}
                />
            </TouchableOpacity>
        )
    }

    // to get te view of the publication video
    _renderVideo(publication) {

        return (
            <TouchableOpacity style={styles.container_type}
                onPress={() => DeviceEventEmitter.emit('toggleModal', { publication, navigation: this.props.navigation, space: this.props.space })}
            >
                <Image
                    style={{ width: '100%', height: 300, flex: 1, borderRadius: 35, resizeMode: 'cover' }}
                    source={{ uri: publication.filePicture }}
                />
            </TouchableOpacity>
        )
    }

    // to select the type of the publication
    _showTypePublication(publication) {
        switch (publication.type) {
            case 'PostPublication':
            case 'PostStory': {
                return this._renderPost(publication)
            }
            case 'PicturePublication':
            case 'PictureStory': {
                return this._renderPicture(publication)
            }
            case 'PublicationVideo':
            case 'VideoStory': {
                return this._renderVideo(publication)
            }
        }
    }

    render() {
        const { publication } = this.props
        return (
            <View style={styles.card}>
                {this._showTypePublication(publication)}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
    },
    container_type: {
        overflow: 'hidden',
        flex: 4
    }
})

const mapStateToProps = state => ({
    PublicationFeed: state.PublicationFeed,
    publicationProfile: state.publicationProfile,
    MyProfile: state.MyProfile
})

const ActionCreators = Object.assign(
    {}
);

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(MinPublication)