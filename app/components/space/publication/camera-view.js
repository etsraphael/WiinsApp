import React from 'react'
import { StyleSheet } from 'react-native'
import { RNCamera } from 'react-native-camera'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class CameraView extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <RNCamera
        ref={ref => { this.props.refCamera(ref) }}
        style={styles.preview}
        type={this.props.cameraType}
        flashMode={this.props.flashMode}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      />
    )
  }

}

const styles = StyleSheet.create({
  preview: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
  },
})

const mapStateToProps = state => ({
  MyUser: state.MyUser,
})

const ActionCreators = Object.assign(
  {}
)

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(CameraView)