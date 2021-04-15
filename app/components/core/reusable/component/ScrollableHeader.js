import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Animated, StyleSheet, View, Text, ScrollView } from "react-native";

const HEADER_MAX_HEIGHT = 60,
HEADER_MIN_HEIGHT = 0,
HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default class ScrollableHeader extends Component {

    constructor(props) {
        super(props);

        this.state = {
            scrollY: new Animated.Value(0)
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
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -HEADER_SCROLL_DISTANCE],
            extrapolate: 'clamp'
        });
        return (
            <View style={styles.fill}>
                <ScrollView
                    style={styles.fill}
                    scrollEventThrottle={16}
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
                <Animated.View  style={[styles.header, { transform: [{ translateY: headerTranslate }] }]}>
                    <View onLayout={(event) => {
                        const { layout: { height, width } } = event.nativeEvent;
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
    fill: {
      flex: 1,
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
        top: 0,
        left: 0,
        right: 0,
        // backgroundColor: '#03A9F4',
        overflow: 'hidden'
      },
      bar: {
        height: HEADER_MAX_HEIGHT,
        flex: 1,
        // alignItems: 'center',
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
        marginTop: HEADER_MAX_HEIGHT + 70,
      },
  });