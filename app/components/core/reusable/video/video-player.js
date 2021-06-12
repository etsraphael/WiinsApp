import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ActivityIndicator, Text, TouchableOpacity, TouchableWithoutFeedback, Animated } from 'react-native';
import Video from 'react-native-video';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPause, faPlay, faRedoAlt } from '@fortawesome/pro-light-svg-icons';
import i18n from '../../../../../assets/i18n/i18n'

class VideoPlayer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            videoReady: false,
            videoError: false,
            currentTime: 0,
            duration: 0.1,
            paused: false,
            overlay: false,
            opacity: new Animated.Value(0),
            fullscreen: false,
        }
    }

    componentDidUpdate(_, prevState) {
        const { overlay, videoError } = this.state;
        if (prevState.overlay !== overlay) {
            Animated.timing(this.state.opacity, {
                toValue: overlay ? 1 : 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
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
        this.setState({ videoReady: true, overlay: true, videoError: false })
        // this.scheduleCloseOverlay();
    }
    playPauseVideo = (e) => {
        e.stopPropagation();
        if (this.state.videoReady) {
            this.setState((prevState) => ({ paused: !prevState.paused }))
        }
        this.scheduleCloseOverlay();
    }
    onVideoLoad = ({ duration }) => this.setState({ duration });
    onVideoProgress = ({ currentTime }) => this.setState({ currentTime });
    onVideoEnd = () => {
        this.setState({ paused: true });
        // this.video.seek(0);
    }
    onVideoError = () => this.setState({ videoError: true });
    onSliderStart = () => this.setState({ paused: true })
    onSliderComplete = () => this.setState({ paused: false })
    onSliderSeek = (slide) => {
        this.player.seek(slide * this.state.duration);
        this.scheduleCloseOverlay();
    }
    onClickOnVideo = () => {
        if (!this.state.videoReady) {
            return null;
        }

        if (this.state.overlay) {
            this.setState({ overlay: false })
            this.overlayTimer ? clearTimeout(this.overlayTimer) : null
        } else {
            this.setState({ overlay: true })
            this.scheduleCloseOverlay()
        }
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
            <TouchableWithoutFeedback style={{ ...styles.fillParent }} onPress={this.onClickOnVideo}>
                <Animated.View style={{ ...styles.overlay, opacity: this.state.opacity }}>
                <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={['transparent', '#000000a0']}
                style={{ ...styles.overlay, justifyContent: 'center', alignItems: 'center' }}
                >

                { overlay ? (<>
                    {/* The Play and Pause centered button */}
                    <TouchableOpacity onPress={(e) => this.playPauseVideo(e)} style={{ width: 50, height: 50, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={paused ? faPlay : faPause} color={"#FFFFFF"} size={25} />
                    </TouchableOpacity>

                    {/* The Slider Section */}
                    <View style={{ position: 'absolute', left: 0, bottom: 0, right: 0, flexDirection: 'row', paddingVertical: 15, paddingHorizontal: 10, alignItems: 'center' }}>
                        <Text style={{ color: 'white', maxWidth: 40 }}>{ this.getTime(currentTime) }</Text>
                        <View style={{ flex: 1, marginHorizontal: 10 }}>
                            <Slider
                                minimumTrackTintColor="#307ecc"
                                maximumTrackTintColor="#898989"
                                value={currentTime / duration}
                                thumbTintColor="#f9f9f9"
                                onValueChange={this.onSliderSeek}
                                onSlidingStart={this.onSliderStart}
                                onSlidingComplete={this.onSliderComplete}
                                tapToSeek={true}
                            />
                        </View>
                        <Text style={{ color: 'white', maxWidth: 40 }}>{ this.getTime(duration) }</Text>
                    </View>
                    </>) : <></>
                }
                </LinearGradient>
                </Animated.View>
            </TouchableWithoutFeedback>
        );
    }

    _renderError = () => {
        return (
            <View style={{ ...styles.overlay, justifyContent: 'center', alignItems: 'center' }}>
                <Animated.View>
                    <FontAwesomeIcon icon={faRedoAlt} color={"#FFFFFF"} size={30} />
                </Animated.View>
                <Text style={{ color: '#FFFFFF', marginTop: 5, fontSize: 17 }}>
                    {i18n.t('ERROR-MESSAGE.Could-not-play-video')}
                </Text>
            </View>
        )
    }

    render() {
        const { src } = this.props;
        const { paused } = this.state;
        return (
            <View style={styles.videoPlayer}>
                <Video
                    ref={(ref) => this.player = ref}
                    onReadyForDisplay={this.onVideoReadyToPlay}
                    style={{ width: '100%', height: '100%' }}
                    source={{ uri: src }}
                    repeat={true}
                    minLoadRetryCount={5}
                    volume={1.0}
                    resizeMode={'cover'}
                    controls={false}
                    paused={paused}
                    onLoad={this.onVideoLoad}
                    onProgress={this.onVideoProgress}
                    onEnd={this.onVideoEnd}
                    onError={this.onVideoError}
                    
                />
                
                <View style={styles.overlay}  onPress={this.onClickOnVideo}>
                    {/* The absolute fill view for toggling overlay */}
                    { this.state.videoError ? this._renderError() : this.state.videoReady ? this._renderOverlay() : this._renderPoster() }
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