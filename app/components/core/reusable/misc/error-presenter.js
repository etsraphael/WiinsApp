import React from 'react'
import { StyleSheet, View, Text, Animated, Easing} from 'react-native'
import { PureComponent } from 'react'

class ErrorPresenter  extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            opacity: new Animated.Value(0),
        }
        this.timeout = null
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.error !== prevProps.error) {
            if (this.props.error)
                this.show()
            else
                this.hide()
        }
    }
    show() {
        this.clearTimer()
        Animated.timing(this.state.opacity, { 
            toValue: 1, 
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: true
        }).start()
        this.startTimer()
    }
    hide() {
        Animated.timing(this.state.opacity, { 
            toValue: 0, 
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: true
        }).start(this.props.onHide)
    }
    startTimer() {
        this.timeout = setTimeout(() => {
            this.hide()
            this.clearTimer()
        }, this.props.duration || 3000)
    }
    clearTimer() {
        this.timeout ? clearTimeout(this.timeout) : null
        this.timeout = null
    }
    render() {
        const { opacity } = this.state
        const { style, ...rest } = this.props;
        return (
            <View style={[style, { flex: 1, position: 'relative' }]} { ...rest }>
                { this.props.children }
                <Animated.View style={[styles.errorBox, { opacity }]}>
                    <Text style={styles.errorText}>{ this.props.error || '' }</Text>
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    errorBox: { position: 'absolute', bottom: 14, left: 6, right: 6, paddingVertical: 15, paddingHorizontal: 19, backgroundColor: '#ED6569', borderRadius: 8 },
    errorText: { color: '#4E4E56', fontSize: 16, letterSpacing: 0.5, lineHeight: 24, textAlign: 'left' },
})

export default ErrorPresenter