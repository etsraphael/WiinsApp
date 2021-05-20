import { View, StyleSheet } from "react-native"
import React from 'react';
import Svg, { Defs, Stop, Path, LinearGradient } from "react-native-svg";

const { PI, cos, sin } = Math;
const GradientBorderCircle = ({ children, style={}, size=41, padding=5, palette=['#ff5722', '#3f51b5'] }) => {
    const strokeWidth = 2;
    const r = size / 2 - strokeWidth / 2;
    const cx = size / 2, cy = size / 2;
    const x = (a) => cx - r * cos(a);
    const y = (a) => -r * sin(a) + cy;
    const A = PI * 2;
    const sampling = palette.length;
    const step = A / sampling;
    const arcs = new Array(sampling).fill(0).map((_, i) => {
        const a = i * step;
        return `M ${x(a)} ${y(a)} A ${r} ${r} 0 0 1 ${x(a + step)} ${y(a + step)}`
    })


    return (
        <View style={[styles.container, { ...style, height: size, width: size }]}>
            <Svg style={styles.svg} height={size} width={size}>
                <Defs>
                { arcs.map((_, i) => (
                    <LinearGradient key={i} id={`gradient-${i}`}>
                        <Stop stopColor={palette[0]} offset="0%" />
                        <Stop stopColor={palette[1]} offset="100%" />
                    </LinearGradient>)
                ) }
                </Defs>
                { arcs.map((d, i) => <Path key={i} stroke={`url(#gradient-${i})`} fill="transparent" {...{ d, strokeWidth }} />) }
            </Svg>
            <View style={[styles.children, { borderRadius: size / 2, height: size - padding * 2, width: size - padding * 2 }]}>{ children }</View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    svg: {
        position: 'absolute',
        top: 0,
        left: 0
    },
    children: {}
})

export default GradientBorderCircle;