import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import Video from 'react-native-video';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPause, faPlay } from '@fortawesome/pro-light-svg-icons';


class VideoPlayer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            videoReady: false,
            currentTime: 0,
            duration: 0.1,
            paused: false,
            overlay: false,
            fullscreen: false
        }
    }

    getTime = t => {
        const digit = n => n < 10 ? `0${n}` : `${n}`;
        // const t = Math.round(time);
        const sec = digit(Math.floor(t % 60));
        const min = digit(Math.floor((t / 60) % 60));
        const hr = digit(Math.floor((t / 3600) % 60));
        return hr === digit(0) ? min + ':' + sec : hr + ':' + min + ':' + sec; // this will convert sec to timer string
        // 33 -> 00:00:33
        // this is done here
        // ok now the theme is good to look
    }

    // video actions
    onVideoReadyToPlay = () => {
        this.setState({ videoReady: true, overlay: true })
        // this.scheduleCloseOverlay();
    }
    playPauseVideo = () => {
        if (this.state.videoReady) {
            this.setState((prevState) => ({ paused: !prevState.paused }))
        }
        // this.scheduleCloseOverlay();
    }
    onVideoLoad = ({ duration }) => this.setState({ duration });
    onVideoProgress = ({ currentTime }) => this.setState({ currentTime });
    onVideoEnd = () => {
        this.setState({ paused: true });
        this.video.seek(0);
    }
    onSliderSeek = (slide) => {
        this.player.seek(slide * this.state.duration);
        this.scheduleCloseOverlay();
    }
    onClickOnVideo = () => {
        if (!this.state.videoReady) {
            return null;
        }

        console.log("overlay", this.state.overlay)
        // if (this.state.overlay) {
        //     this.setState({ overlay: false })
        // } else {
        //     this.setState({ overlay: true })
        //     this.scheduleCloseOverlay()
        // }
    }
    scheduleCloseOverlay = () => {
        this.overlayTimer ? clearTimeout(this.overlayTimer) : null
        this.overlayTimer = setTimeout(() => this.setState({ overlay: false }), 3000)
    }

    _renderPoster = () => (
        <View style={styles.fillParent}>
            <FastImage
                style={{ flex: 1 }}
                source={{ uri: this.props.posterSrc, priority: FastImage.priority.normal }}
                resizeMode={FastImage.resizeMode.cover}
            />
            <View style={{ backgroundColor: '#00000045', position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' color="#ffffff" />
            </View>
        </View>
    )

    _renderOverlay = () => {
        const { paused, duration, currentTime, overlay } = this.state;
        return (
            <TouchableWithoutFeedback style={{ ...styles.fillParent, display: overlay ? 'flex' : 'none' }} onPress={this.onClickOnVideo}>
                <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={['transparent', '#000000a0']}
                style={{ ...styles.overlay, justifyContent: 'center', alignItems: 'center' }}
                >

                    {/* The absolute fill view for toggling overlay */}
                    <TouchableWithoutFeedback style={{ ...styles.overlay, zIndex: 0 }} onPress={this.onClickOnVideo} />

                    {/* The Play and Pause centered button */}
                    <TouchableOpacity onPress={this.playPauseVideo} style={{ width: 50, height: 50, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={paused ? faPlay : faPause} color={"#FFFFFF"} size={25} />
                    </TouchableOpacity>

                    {/* The Slider Section */}
                    <View style={{ position: 'absolute', left: 0, bottom: 0, right: 0, flexDirection: 'row', paddingVertical: 15, paddingHorizontal: 10 }}>
                        <Text style={{ color: 'white', maxWidth: 40 }}>{ this.getTime(currentTime) }</Text>
                        <View style={{ flex: 1, marginHorizontal: 10 }}>
                        <Slider
                            minimumTrackTintColor="#307ecc"
                            maximumTrackTintColor="#000000"
                            value={currentTime / duration}
                            onValueChange={this.onSliderSeek} />
                        </View>
                        <Text style={{ color: 'white', maxWidth: 40 }}>{ this.getTime(duration) }</Text>
                    </View>
                </LinearGradient>
            </TouchableWithoutFeedback>
        );
    }

    render() {
        const { src, posterSrc } = this.props;
        const { paused, duration, currentTime, overlay } = this.state;
        return (
            <View style={styles.videoPlayer}>
                <Video
                    ref={(ref) => this.player = ref}
                    onReadyForDisplay={this.onVideoReadyToPlay}
                    style={{ width: '100%', height: '100%' }}
                    source={{ uri: src }}
                    repeat={true}
                    minLoadRetryCount={5}
                    volume={0.1}
                    resizeMode={'cover'}
                    controls={false}
                    paused={paused}
                    onLoad={this.onVideoLoad}
                    onProgress={this.onVideoProgress}
                    onEnd={this.onVideoEnd}
                />
                
                <View style={styles.overlay}>
                    { this.state.videoReady ? this._renderOverlay() : this._renderPoster() }
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    videoPlayer: {
        width: '100%',
        height: '100%',
        flex: 1,
        position: 'relative',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject
    },
    fillParent: {
        width: '100%',
        height: '100%'
    }
});

VideoPlayer.propTypes = {
    src: PropTypes.string.isRequired
}

export default VideoPlayer;