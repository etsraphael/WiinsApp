import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Animated, StyleSheet, View, ScrollView, Platform } from "react-native";
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

const HEADER_MAX_HEIGHT = 60;

export default class ScrollableHeader extends Component {

    constructor(props) {
        super(props);

        this.state = {
            scrollY: new Animated.Value(0),
            scrollDistance: HEADER_MAX_HEIGHT
        };
    }

    static propTypes = {
        title: PropTypes.string,
        refreshControl: PropTypes.node,
        subHeaderNode: PropTypes.node,
        headerNode: PropTypes.node
    }

    _renderScrollViewContent() {
        return (
          <View style={styles.scrollViewContent}>
            { this.props.children }
          </View>
        );
    }

    render() {
        const headerTranslate = this.state.scrollY.interpolate({
            inputRange: [0, this.state.scrollDistance],
            outputRange: [0, -this.state.scrollDistance],
            extrapolate: 'clamp'
        });
        return (
            <View style={[styles.fill, styles.main]}>
                <ScrollView
                    style={styles.fill}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={this.props.showsVerticalScrollIndicator || true}
                    onScroll={
                        Animated.event(
                            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                            { useNativeDriver: false }
                        )
                    }
                    refreshControl={this.props.refreshControl}
                >
                {this._renderScrollViewContent()}
                </ScrollView>
                <Animated.View  style={[styles.header, (this.props.headerStyle || {}), { transform: [{ translateY: headerTranslate }] }]}>
                    <View onLayout={(event) => {
                        const { layout: { height } } = event.nativeEvent;
                        this.setState({ scrollDistance: height })
                    }}>
                        { this.props.headerNode }
                    </View>
                    <View>
                        { this.props.subHeaderNode }
                    </View>
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0
    },
    fill: {
      flex: 1
    },
    row: {
      height: 40,
      margin: 16,
      backgroundColor: '#D3D3D3',
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
        left: 0,
        right: 0
      },
      bar: {
        height: HEADER_MAX_HEIGHT,
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 24
      },
      title: {
        backgroundColor: 'transparent',
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold'
      },
      scrollViewContent: {
        marginTop: HEADER_MAX_HEIGHT + 70
      },
  });