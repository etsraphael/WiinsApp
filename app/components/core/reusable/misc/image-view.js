import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import FastImage from 'react-native-fast-image';
import { AppTheme } from '../utility/theme-util';

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);
export default class ImageView extends React.Component {

    thumbnailAnimated = new Animated.Value(0);
    imageAnimated = new Animated.Value(0);

    handleThumbnailLoad = () => {
        Animated.timing(this.thumbnailAnimated, {
            toValue: 1,
            useNativeDriver: true
        }).start();
    }
    

    onImageLoad = (event) => {
        Animated.timing(this.imageAnimated, {
            toValue: 1,
            useNativeDriver: true
        }).start();
        this.props.onLoad && this.props.onLoad(event);
    }

    render() {
        const {
            source,
            style,
            onLoad,
            ...props
          } = this.props;
        return (
            <View style={[styles.container, style]}>
                <Animated.Image
                    { ...props }
                    style={[styles.thumbnail, style, { opacity: this.thumbnailAnimated }]}
                    onLoad={this.handleThumbnailLoad}
                    blurRadius={1}
                />
                <AnimatedFastImage
                    { ...props }
                    source={source}
                    style={[styles.imageOverlay, { opacity: this.imageAnimated }, style]}
                    onLoad={this.onImageLoad}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    imageOverlay: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
    },
    container: {
      backgroundColor: '#e1e4e8',
    },
    thumbnail: {
        backgroundColor: '#e1e4e8'

    }
  });