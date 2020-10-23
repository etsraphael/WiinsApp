import React from "react";
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import * as PendingPubicationsActions from '../../../../redux/PendingPublications/actions'
import { bindActionCreators } from 'redux'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'

class MyStoryMin extends React.Component {

  constructor(props) {
    super(props)
  }

  // to display the last story
  _lastStoryView = () => {

    const lastStory = this.props.MyStory[0].publication

    switch (lastStory.type) {
      case 'PostStory': return this._viewPost(lastStory)
      case 'PictureStory': return this._viewPicture(lastStory)
      case 'VideoStory': return this._viewPoster(lastStory)
      default: return null
    }

  }

  // to display the post publication
  _viewPost = (publication) => {

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
      <View style={{flex: 1}}>
        <LinearGradient
          colors={background}
          start={orientation[0]}
          end={orientation[1]}
          style={{ flex: 1, borderRadius: 35, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{
            fontWeight: '400',
            fontSize: 8,
            fontFamily: 'Gill Sans',
            textAlign: 'center',
            color: '#ffffff',
          }}>
            {publication.text}
          </Text>
        </LinearGradient>
      </View>
    )
  }

  // to display the poster publication
  _viewPoster = (publication) => {
    return (
      <View style={{ flex: 1 }}>
        <FastImage
          style={{ width: 45, height: 45, aspectRatio: 1 }}
          source={{
            uri: publication.poster,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    )
  }

  // to display the picture publication
  _viewPicture = (publication) => {
    return (
    <View style={{flex: 1}}>
      <FastImage
          style={{ width: 45, height: 45, aspectRatio: 1 }}
          source={{
            uri: publication.file,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
    </View>
    )
  }

  render = () => {
    return (
      <View style={{ flex: 1 }}>
        {/* previous of last story */}
        {this._lastStoryView()}
      </View>
    )
  }

}

const styles = StyleSheet.create({

})

const mapStateToProps = state => ({
  Publication: state.PendingPublications.publication,
  MyStory: state.MyStory.stories,
})

const ActionCreators = Object.assign(
  {},
  PendingPubicationsActions
)

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(MyStoryMin)