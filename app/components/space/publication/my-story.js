import React from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity, ActivityIndicator, Text } from 'react-native'
import { connect } from 'react-redux'
import * as MyStoryActions from '../../../redux/MyStory/actions'
import { bindActionCreators } from 'redux'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTimes, faEye, faTrash } from '@fortawesome/pro-light-svg-icons'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import Video from 'react-native-video'
import Modal from 'react-native-modal'
import i18n from '../../../../assets/i18n/i18n'

class MyStory extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      progressTimer: 0,
      indexProgress: 0,
      VideoReady: false,
      videoDuration: 0,
      currentTimeVideo: 0,
      deleteModal: false
    }
  }

  // to get the progression of each story
  _getProgressColor = (index) => {
    if (this.state.indexProgress >= index) return { width: '100%', height: 3 }
    else return { width: 0, height: 1 }
  }

  // to display the header view
  _header = () => {
    return (
      <View style={styles.header_container}>
        <View style={{ paddingHorizontal: 10 }}>
          <FlatList
            numColumns={this.props.MyStory.length}
            style={{ paddingHorizontal: 5 }}
            data={this.props.MyStory}
            keyExtractor={(item) => item._id.toString()}
            key={this.props.MyStory.length}
            renderItem={({ index }) => (
              <View style={styles.bar}>
                <View style={[styles.barColored, this._getProgressColor(index)]}></View>
              </View>
            )}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 25, paddingVertical: 15 }}>
          <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
            <FastImage
              style={{ width: 39, height: 39, borderRadius: 25, borderWidth: 2, borderColor: 'white' }}
              source={{
                uri: this.props.MyProfile.profile.pictureprofile,
                priority: FastImage.priority.normal,
              }} resizeMode={FastImage.resizeMode.cover}
            />
            <View style={{ justifyContent: 'center', paddingLeft: 15 }}>
              <Text style={{ color: 'white', fontSize: 19 }}>{this.props.MyProfile.profile._meta.pseudo}</Text>
              <Text style={{ color: 'white' }}>{this.props.MyStory[this.state.indexProgress].date}</Text>
            </View>
          </View>
          <TouchableOpacity style={{ justifyContent: 'center', textAlign: 'right', paddingVertical: 5, paddingHorizontal: 15 }} onPress={() => this.props.navigation.goBack(null)}>
            <FontAwesomeIcon icon={faTimes} color={'white'} size={25} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  // to show the publication
  _body = () => {

    switch (this.props.MyStory[this.state.indexProgress].publication.type) {
      case 'PostStory': return this._displayPostStory()
      case 'PictureStory': return this._displayPictureStory()
      case 'VideoStory': return this._displayVideoStory()
    }
  }

  // to display the video story
  _displayVideoStory = () => {
    return (
      <View style={{ flex: 1 }}>
        <Video
          onReadyForDisplay={() => this.setState({ VideoReady: true })}
          source={{ uri: this.props.MyStory[this.state.indexProgress].publication.file }}
          minLoadRetryCount={5}
          volume={0.1}
          repeat={true}
          style={styles.backgroundVideo}
          resizeMode={'cover'}
          posterResizeMode={'cover'}
          poster={this.props.MyStory[this.state.indexProgress].publication.poster}
          onEnd={() => this._nextPage()}
        />
        {
          !this.state.VideoReady ?
            <View style={styles.container_loading_video}>
              <ActivityIndicator size='large' color="white" />
            </View>
            : null
        }


      </View>
    )
  }

  // to displau the post story
  _displayPostStory = () => {

    let background
    let orientation

    switch (this.props.MyStory[this.state.indexProgress].publication.background) {
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
      <View style={{ flex: 1 }}>
        <LinearGradient colors={background}
          start={orientation[0]}
          end={orientation[1]}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{
            paddingHorizontal: 15,
            lineHeight: 35,
            fontWeight: '400',
            fontSize: 25,
            textAlign: 'center',
            margin: 10,
            color: '#ffffff',
            backgroundColor: 'transparent'
          }}>
            {this.props.MyStory[this.state.indexProgress].publication.text}
          </Text>
        </LinearGradient>
      </View>
    )
  }

  // to display the picture
  _displayPictureStory = () => {
    return (<View>
      <FastImage
        style={{ width: '100%', height: '100%' }}
        source={{
          uri: this.props.MyStory[this.state.indexProgress].publication.file,
          priority: FastImage.priority.normal,
        }} resizeMode={FastImage.resizeMode.cover}
      />
    </View>)
  }

  // to go to the next story
  _nextPage = () => {
    if (this.state.indexProgress + 1 > this.props.MyStory.length - 1) { this.props.navigation.goBack(null) }
    else { this.setState({ indexProgress: this.state.indexProgress + 1 }) }
  }

  // to go to the previous page
  _previousPage = () => {
    if (this.state.indexProgress == 0) { this.props.navigation.goBack(null) }
    else { this.setState({ indexProgress: this.state.indexProgress - 1 }) }
  }

  // to display the footer view
  _footer = () => {
    return (
      <View style={{ position: 'absolute', bottom: 0, width: '100%', height: '85%', zIndex: 1 }}>
        <View style={{ flexDirection: 'row', flex: 7 }}>
          <TouchableOpacity onPress={() => this._previousPage()} style={{ flex: 1 }} />
          <TouchableOpacity onPress={() => this._nextPage()} style={{ flex: 2 }} />
        </View>
        <View style={{ flex: 1, backgroundColor: '#5f5f5f61', flexDirection: 'row' }}>
          <View style={{ flex: 2, alignItems: 'center', paddingTop: 15 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesomeIcon icon={faEye} color={'white'} size={25} style={{ marginHorizontal: 10 }} />
              <Text style={{ fontSize: 20, color: 'white' }}>{this.props.MyStory[this.state.indexProgress].publication.numberViews}</Text>
            </View>
          </View>
          <View style={{ flex: 3 }}>
          </View>
          <View style={{ flex: 2, alignItems: 'center' }}>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', padding: 18 }}
              onPress={() => this.setState({ deleteModal: true })}
            >
              <FontAwesomeIcon icon={faTrash} color={'white'} size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  // to diplay the loading animations
  _loadingContainer = () => {
    return (
      <View style={{ flex: 1, backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color="white" />
      </View>
    )
  }

  // to display the main view
  _trendView = () => {
    return (
      <View style={{ flex: 1 }}>
        {this._header()}
        {this._body()}
        {this._footer()}
      </View>
    )
  }

  // to delete the story
  _deleteStory = () => {
    this.props.actions.deleteStoryByIdActions(this.props.MyStory[this.state.indexProgress].publication._id)
    this.setState({ deleteModal: false })
  }

  // to display the pop up for delete the story
  _askDeletion = () => {
    return (
      <View style={{ flex: 1 }}>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 18, color: '#555555' }}>{i18n.t('VALIDATION.A-y-s-to-delete-t-story')}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{ backgroundColor: '#4fabc8a3', marginHorizontal: 15, alignItems: 'center', paddingVertical: 10, borderRadius: 20 }}
              onPress={() => this._deleteStory()}
            >
              <Text style={{ fontSize: 18, color: 'white' }}>{i18n.t('CORE.Confirm')}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{ backgroundColor: '#cecece', marginHorizontal: 15, alignItems: 'center', paddingVertical: 10, borderRadius: 20 }}
              onPress={() => this.setState({ deleteModal: false })}
            >
              <Text style={{ fontSize: 18, color: 'white' }}>{i18n.t('CORE.Cancel')}</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    )
  }

  // to display the modal pop up
  _modalDelete = () => {
    return (
      <Modal
        isVisible={this.state.deleteModal}
        onBackdropPress={() => this.setState({ deleteModal: false })}
        backdropOpacity={0.3}
      >
        <View style={{ height: '15%', backgroundColor: 'white', borderRadius: 15 }}>
          {this._askDeletion()}
        </View>
      </Modal>
    )
  }

  render = () => {

    if(this.props.MyStory.length == 0 || (this.state.indexProgress > this.props.MyStory.length - 1)) return this.props.navigation.goBack(null)

    return (
      <View style={styles.main_container}>
        {this._trendView()}
        {this._modalDelete()}
      </View>
    )
  }

}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    margin: 0,
  },
  header_container: {
    paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() + 10 : 0,
    width: '100%',
    position: 'absolute',
    top: 0,
    height: 90,
    zIndex: 1
  },
  bar: {
    flex: 1,
    backgroundColor: '#f5f5f547',
    overflow: 'hidden',
    marginHorizontal: 2,
    borderRadius: 10,
    height: 3
  },
  barColored: {
    backgroundColor: 'white',
    width: 0
  },
  backgroundVideo: {
    flex: 1,
    height: '100%'
  },
  container_loading_video: {
    flex: 1,
    backgroundColor: '#b3b3b37a',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
})

const mapStateToProps = state => ({
  MyProfile: state.MyProfile,
  MyStory: state.MyStory.stories,
})

const ActionCreators = Object.assign(
  {},
  MyStoryActions
)

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(MyStory)