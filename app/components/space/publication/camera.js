import React from "react";
import {
  StyleSheet, View, TouchableOpacity, Text, Image, Animated,
  FlatList, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback,
  DeviceEventEmitter, Keyboard,
} from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../../../redux/MyUser/actions'
import * as SearchActions from '../../../../redux/SearchBar/actions'
import * as PublicationFeedActions from '../../../../redux/FeedPublications/actions'
import * as PendingPubicationsActions from '../../../../redux/PendingPublications/actions'
import * as MyStoryActions from '../../../../redux/MyStory/actions'
import { bindActionCreators } from 'redux'
import { RNCamera } from 'react-native-camera'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
  faSync, faPhotoVideo, faTimes, faBolt, faClone,
  faPaperPlane, faUserPlus, faCheckCircle, faAngleDown
} from '@fortawesome/pro-light-svg-icons'
import { faCircle } from '@fortawesome/pro-duotone-svg-icons'
import { faText } from '@fortawesome/pro-solid-svg-icons'
import Video from 'react-native-video'
import LinearGradient from 'react-native-linear-gradient'
import { listFontPost } from '../../core/data/font-post'
import TagSuggest from '../../core/tag-suggest'
import { createPublication, createStoryPublication } from '../../../services/publication/publication-service'
import Snackbar from 'react-native-snackbar'
import FastImage from 'react-native-fast-image'
import PendingPublication from './pending-publication'
import ImagePicker from 'react-native-image-picker'
import MyStoryMin from './my-story-min'
import I18n from '../../../i18n/i18n'
import CameraView from './camera-view'

class Camera extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      cameraType: RNCamera.Constants.Type.back,
      flashMode: RNCamera.Constants.FlashMode.off,
      ifStories: true,
      screenMode: 'default',
      secondNumber: 0,
      zoomInAnim: new Animated.Value(65),
      pictureData: null,
      videoData: null,
      isRecording: false,
      backgroundColorPost: listFontPost[0],
      searchIndex: null,
      currentPosition: null,
      searching: false,
      searchContent: '',
      textInput: '',
      profileTagged: [],
      profileAuth: [],
      textInputHastag: '',
      hastags: [],
      searchProfile: '',
      searchingPlace: '',
      posted: null
    }

    this.interval = null
    this.addOneSec = this.addOneSec.bind(this)
    this.stopInterval = this.stopInterval.bind(this)
    this.handlerGoBack = this.handlerGoBack.bind(this)
  }

  componentDidMount = () => {
    this.eventListener = DeviceEventEmitter.addListener('friendTagged', this.addFriend);
    this.props.actions.getMyStoryActions()
  }

  componentWillUnmount() {
    this.eventListener.remove()
  }

  UNSAFE_componentWillReceiveProps = (newProps) => {

    if (!!newProps.Publication) {
      switch (newProps.Publication) {
        case 'posted': {
          this.setState({ screenMode: 'default' })
          setTimeout(() => {
            this.props.actions.resetPublicationActions()
            this.props.actions.getByMode(1, 'FollowerAndFriend')
          }, 1000)
        }
      }
    }

  }

  handlerGoBack() {
    this.setState({ screenMode: 'default' })
  }

  // to send the publication
  async sendPublication() {

    Keyboard.dismiss()

    if (this.state.screenMode == 'PostPublication' && this.state.textInput.replace(/\s/g, '') == '') {
      return Snackbar.show({ text: 'ERROR-MESSAGE.Your-wiins-is-empty', duration: Snackbar.LENGTH_LONG })
    }

    if (this.state.textInputHastag !== '') {
      return Snackbar.show({ text: 'ERROR-MESSAGE.Please-complete-your-hastag-or-delete-it', duration: Snackbar.LENGTH_LONG })
    }

    let publicationCreated

    // create story or publication
    if (this.state.ifStories) { publicationCreated = await createStoryPublication(this.state) }
    else { publicationCreated = await createPublication(this.state) }

    if (!publicationCreated) return null

    // send story or publication
    if (this.state.ifStories) { this.props.actions.addPublicationStoryInPendingList(publicationCreated) }
    else { this.props.actions.addPublicationInPendingList(publicationCreated) }

    this.handlerGoBack()

  }

  // to add a friend in the publication
  addFriend = (profile) => {

    if (this.state.searchingPlace == 'tagComment') {
      this.setState({
        textInput: this.state.textInput.replace('@' + this.state.searchContent, '@' + profile._meta.pseudo + ' '),
        profileTagged: this.state.profileTagged.concat(profile),
        searchContent: '',
        searching: false
      })
      this.textInput.focus()
    }

    if (this.state.searchingPlace == 'tagInput') {

      if (!profile) return null

      if (this.state.profileAuth.length > 2) {
        return Snackbar.show({ text: 'ERROR-MESSAGE.Not-more-3-friend', duration: Snackbar.LENGTH_LONG })
      }

      if (this.state.profileAuth.map(x => x._id).includes(profile._id)) {
        return Snackbar.show({ text: 'ERROR-MESSAGE.This-profile-is-already-added', duration: Snackbar.LENGTH_LONG })
      }

      this.setState({
        profileAuth: this.state.profileAuth.concat(profile),
        searchProfile: ''
      })

    }

    this.forceUpdate()

  }

  // to enable/disable the flash
  _toggleFlah = () => {
    if (this.state.flashMode == RNCamera.Constants.FlashMode.on) return this.setState({ flashMode: RNCamera.Constants.FlashMode.off })
    else return this.setState({ flashMode: RNCamera.Constants.FlashMode.on })
  }

  // to switch the camera
  _switchCamera = () => {
    if (this.state.cameraType == RNCamera.Constants.Type.back) return this.setState({ cameraType: RNCamera.Constants.Type.front })
    else return this.setState({ cameraType: RNCamera.Constants.Type.back })
  }

  // to choose between a story and a publication
  _choiceDurationStyle = (number) => {
    switch (number) {
      case 1:
        if (this.state.ifStories) return styles.selected_duration
        else return null
      case 2:
        if (!this.state.ifStories) return styles.selected_duration
        else return null
    }
  }

  // to set the duration of the publication
  _setDuration = () => {
    return this.setState({ ifStories: !this.state.ifStories })
  }

  // to take a picture
  _takePicture = async () => {
    if (this.camera) {
      let options

      if (this.state.cameraType == RNCamera.Constants.Type.back) {
        options = { quality: 0.5, base64: true }
      } else {
        options = { quality: 0.5, base64: true, mirrorImage: true, forceUpOrientation: true }
      }
      const data = await this.camera.takePictureAsync(options)

      this.setState({ pictureData: data.uri, screenMode: 'PicturePublication' })
    }
  }

  // to take a video
  _startRecording = async () => {
    this.setState({ isRecording: true })
    let options = { maxDuration: 180 }
    const dataV = await this.camera.recordAsync(options)
    const dataP = await this.camera.takePictureAsync(options)
    this.setState({ videoData: dataV.uri, pictureData: dataP.uri })
  }

  // show the publication taken
  _screen = () => {
    switch (this.state.screenMode) {
      case 'PicturePublication': return this._pictureTakenScreen()
      case 'PublicationVideo': return this._videoTakenScreen()
      case 'PostPublication': return this._postScreen()
      case 'PendingPublications': return this._listPendingPublicationsView()
      default: return this._defaultScreen()
    }
  }

  // to display the pending notifications
  _listPendingPublicationsView = () => {
    return (<PendingPublication goBack={this.handlerGoBack} />)
  }

  // to add an hastag in the publication
  _addHastags = (event) => {

    if (event == '') return null

    if (this.state.hastags.length >= 5) {
      return Snackbar.show({ text: 'ERROR-MESSAGE.not-more-5-hastags', duration: Snackbar.LENGTH_LONG })
    }

    if (this.state.hastags.includes(event)) {
      return Snackbar.show({ text: 'ERROR-MESSAGE.T-hashtag-is-already-there', duration: Snackbar.LENGTH_LONG })
    }

    this.setState({ hastags: this.state.hastags.concat(event), textInputHastag: '' })
  }

  // to display the hastag list
  _listHastags = () => {
    return (
      <View style={{ flexDirection: 'row', height: 45, justifyContent: 'center', alignItems: 'center' }}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ flexDirection: 'row', flexWrap: 'wrap' }}
          data={this.state.hastags}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ marginHorizontal: 8, paddingHorizontal: 13, borderRadius: 25, borderColor: 'white', borderWidth: 0.5, overflow: 'hidden', alignItems: 'center', backgroundColor: '#c6c6c66b', flexDirection: 'row' }}
              onPress={() => this.setState({ hastags: this.state.hastags.filter(x => x !== item) })}
            >
              <Text style={{ color: 'white', fontSize: 19, marginVertical: 5, alignItems: 'center' }}>{item}</Text>
              <FontAwesomeIcon icon={faTimes} color={'white'} size={15} style={{ marginLeft: 5, bottom: -1 }} />
            </TouchableOpacity>
          )}
        />
      </View>
    )
  }

  // to display the frined tagged list
  _friendListView = () => {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 2 }}>
          <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.handlerGoBack()}>
            <FontAwesomeIcon icon={faTimes} color={'white'} size={25} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 10 }}>
          {this.state.profileAuth.length > 0 ?
            <FlatList horizontal={true}
              style={{ flexDirection: 'row-reverse' }} data={this.state.profileAuth}
              keyExtractor={(item) => item._id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{ justifyContent: 'center', marginHorizontal: 3 }}
                  onPress={() => this.setState({ profileAuth: this.state.profileAuth.filter(x => x !== item) })}
                >
                  <FastImage
                    style={{ width: 50, aspectRatio: 1, borderRadius: 50, borderWidth: 2, borderColor: 'white' }}
                    source={{
                      uri: item.pictureprofile,
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                </TouchableOpacity>
              )}
            /> : null}
        </View>
      </View>
    )
  }

  // to display the post view of the publication
  _postScreen = () => {
    return (
      <View style={{ flex: 1 }}>
        <LinearGradient colors={this.state.backgroundColorPost.colors} start={this.state.backgroundColorPost.start}
          end={this.state.backgroundColorPost.end} style={{ flex: 1, padding: 15 }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} style={{ flex: 1 }}
            keyboardShouldPersistTaps={true}
          >
            <View style={{ flex: 2 }}>
              {this._friendListView()}
            </View>
            <View style={{ zIndex: 1 }}>{this._listSuggestView()}</View>
            <View style={{ flex: 10 }}>
              <View style={{ flex: 1 }}>

                <View style={{ flex: 8, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 25 }}>
                  <TextInput
                    blurOnSubmit={true}
                    style={{ fontSize: 25, color: 'white', fontWeight: '600', lineHeight: 35, textAlign: 'center' }}
                    multiline={true}
                    numberOfLines={4}
                    placeholder={I18n.t('FEED-PUBLICATION.Write-a-comment')}
                    placeholderTextColor={'white'}
                    onChangeText={(event) => this.setState({ textInput: event })}
                    onKeyPress={(event) => this._writeComment(event.nativeEvent.key)}
                    onSelectionChange={(event) => this._setCursorPosition(event.nativeEvent.selection)}
                    ref={input => { this.textInput = input }}
                    value={this.state.textInput}
                  />
                </View>
                {this.state.hastags.length > 0 ? this._listHastags() : null}
                <View style={{ flex: 2, alignItems: 'center' }}>
                  <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{ flexDirection: 'row', flexWrap: 'wrap', paddingLeft: 15, marginVertical: 7 }}
                    data={listFontPost}
                    keyExtractor={(item) => item.colors.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity style={{ marginHorizontal: 8, borderRadius: 15, borderColor: 'white', borderWidth: 2, width: 30, height: 30, overflow: 'hidden' }}
                        onPress={() => this.setState({ backgroundColorPost: item })}>
                        <LinearGradient colors={item.colors} start={item.start} end={item.end} style={{ flex: 1 }}></LinearGradient>
                      </TouchableOpacity>
                    )}
                  />
                </View>
                <View style={{ height: 65, flexDirection: 'row', textAlign: 'center', justifyContent: 'center' }}>
                  <View style={styles.footer_btn}>
                    <FontAwesomeIcon icon={faUserPlus} color={'white'} size={17} />
                    <TextInput
                      blurOnSubmit={true}
                      style={{ fontSize: 16, paddingLeft: 10, color: 'white', alignItems: 'center' }}
                      placeholder={'CORE.With'}
                      placeholderTextColor={'white'}
                      onChangeText={(event) => this._searchProfile(event)}
                      value={this.state.searchProfile}
                    />
                  </View>
                  <View style={styles.footer_btn}>
                    <Text style={{ fontSize: 19, color: 'white', justifyContent: 'center', alignItems: 'center' }}>#</Text>
                    <TextInput
                      blurOnSubmit={true}
                      style={{ fontSize: 16, color: 'white', paddingLeft: 10, alignItems: 'center' }}
                      maxLength={10}
                      onChangeText={(event) => this.setState({ textInputHastag: event.replace(/\s/g, '') })}
                      value={this.state.textInputHastag}
                      placeholder={I18n.t('PLACEHOLDER.Hastags')}
                      placeholderTextColor={'white'}
                      onSubmitEditing={(event) => this._addHastags(event.nativeEvent.text)}
                    />
                  </View>
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGradient
                      style={{ width: 55, height: 55, borderRadius: 45, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}
                      colors={['#fab720', '#ff6000']}
                      start={{ x: 1, y: 0 }}
                      end={{ x: 0, y: 1 }}>
                      <TouchableOpacity onPress={() => this.sendPublication()}>
                        <FontAwesomeIcon icon={faPaperPlane} color={'white'} size={25} />
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ flex: 1 }}></View>
          </KeyboardAvoidingView>
        </LinearGradient>
      </View>
    )
  }

  // to display the video view of the publication
  _videoTakenScreen = () => {
    return (
      <View style={{ flex: 1 }}>
        <Video source={{ uri: this.state.videoData }} repeat={true} minLoadRetryCount={5} resizeMode={'cover'}
          volume={0.1} style={{ position: 'absolute', bottom: 0, top: 0, left: 0, right: 0 }}
        />
        {this._optionPictureVideo()}
      </View>
    )
  }

  // to display the picture view of the publication
  _pictureTakenScreen = () => {
    return (
      <View style={{ flex: 1 }}>
        <Image source={{ uri: this.state.pictureData }} style={{ position: 'absolute', bottom: 0, top: 0, left: 0, right: 0 }} />
        {this._optionPictureVideo()}
      </View>
    )
  }

  // to display the profile list container
  _listSuggestView = () => {
    if (this.props.SearchList.list.length > 0) {
      return (
        <View style={{ top: '13%', position: 'absolute', width: '100%', backgroundColor: 'white', borderRadius: 15, overflow: 'hidden' }}>
          <FlatList
            style={styles.list}
            data={this.props.SearchList.list}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => (<TagSuggest suggest={item} />)}
          />
        </View>
      )
    }
  }

  // to set the profile search
  _searchProfile = (event) => {
    this.setState({ searchProfile: event.replace(/\s/g, ''), searchingPlace: 'tagInput' })
    if (event.length > 2) { this.props.actions.search(event) }
  }

  // to display the video/picture options in the footer
  _optionPictureVideo = () => {
    return (<View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} style={{ flex: 1 }}
        keyboardShouldPersistTaps={true}
      >
        <View style={{ flex: 3, paddingHorizontal: 25 }}>
          {this._friendListView()}
        </View>
        <TouchableOpacity onPress={() => Keyboard.dismiss()} style={{ flex: 8 }}></TouchableOpacity>
        {this._listSuggestView()}
        <LinearGradient
          colors={['#32323296', '#32323261', '#32323230', 'rgba(0,0,0,0)']}
          start={{ x: 1, y: 1 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={{ minHeight: 50, justifyContent: 'center', paddingHorizontal: 15 }}>
            <TextInput
              multiline={true}
              maxLength={100}
              numberOfLines={4}
              blurOnSubmit={true}
              style={{ fontSize: 16, paddingLeft: 10, paddingTop: 15, color: 'white', lineHeight: 22 }}
              placeholder={I18n.t('FEED-PUBLICATION.Write-a-comment')}
              placeholderTextColor={'white'}
              onChangeText={(event) => this.setState({ textInput: event })}
              onKeyPress={(event) => this._writeComment(event.nativeEvent.key)}
              onSelectionChange={(event) => this._setCursorPosition(event.nativeEvent.selection)}
              ref={input => { this.textInput = input }}
              value={this.state.textInput}
            />
          </View>
          {this.state.hastags.length > 0 ? this._listHastags() : null}
        </LinearGradient>
        <View style={{ height: 65, flexDirection: 'row', textAlign: 'center', justifyContent: 'center', backgroundColor: '#32323296' }}>
          <View style={styles.footer_btn}>
            <FontAwesomeIcon icon={faUserPlus} color={'white'} size={17} />
            <TextInput
              blurOnSubmit={true}
              style={{ fontSize: 16, paddingLeft: 10, color: 'white', alignItems: 'center' }}
              placeholder={'CORE.With'}
              placeholderTextColor={'white'}
              onChangeText={(event) => this._searchProfile(event)}
              value={this.state.searchProfile}
            />
          </View>
          <View style={styles.footer_btn}>
            <Text style={{ fontSize: 19, color: 'white', justifyContent: 'center', alignItems: 'center' }}>#</Text>
            <TextInput
              blurOnSubmit={true}
              style={{ fontSize: 16, color: 'white', paddingLeft: 10, alignItems: 'center' }}
              maxLength={10}
              onChangeText={(event) => this.setState({ textInputHastag: event.replace(/\s/g, '') })}
              value={this.state.textInputHastag}
              placeholder={I18n.t('PLACEHOLDER.Hastags')}
              placeholderTextColor={'white'}
              onSubmitEditing={(event) => this._addHastags(event.nativeEvent.text)}
            />
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <LinearGradient
              style={{ width: 55, height: 55, borderRadius: 45, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}
              colors={['#fab720', '#ff6000']}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}>
              <TouchableOpacity onPress={() => this.sendPublication()}>
                <FontAwesomeIcon icon={faPaperPlane} color={'white'} size={25} />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>

    )
  }

  // to set the zoomIn effect
  zoomIn = () => {
    Animated.timing(this.state.zoomInAnim, {
      toValue: 85,
      duration: 500
    }).start()
  }

  // to set the zoomOut effect
  zoomOut = () => {
    Animated.timing(this.state.zoomInAnim, {
      toValue: 65,
      duration: 200
    }).start()
  }

  // to add one more sec of the recording
  addOneSec = () => {
    this.zoomIn()
    this.interval = setInterval(() => {
      this.setState({ secondNumber: this.state.secondNumber + 0.5 })
      if (this.state.secondNumber == 1) { this._startRecording() }
    }, 500)
  }

  // to stop the recording
  stopInterval = () => {

    // video or picture
    if (this.state.secondNumber < 1) {
      this._takePicture()
    } else {
      this.camera.stopRecording()
      this.setState({ screenMode: 'PublicationVideo', isRecording: false })
    }

    // reset the param
    this.setState({ secondNumber: 0 })
    clearInterval(this.interval)
    this.zoomOut()
  }

  // to go to my stories
  _storyView = () => {
    if (this.props.MyStory.stories.length == 0) return null
    else return (
      <TouchableOpacity
        style={styles.container_story}
        onPress={() => this.props.navigation.navigate('MyStory')}
      >
        <MyStoryMin />
      </TouchableOpacity>
    )
  }

  // to display the header view
  _showDefaultBtnHeader = () => {
    if (!this.state.isRecording) {
      return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 3 }}>
            {this._storyView()}
          </View>
          <View style={{ flex: 5 }}></View>
          <View style={{ flex: 2, alignItems: 'center', paddingTop: 5 }}>
            <TouchableOpacity onPress={() => this._switchCamera()} style={{ paddingVertical: 18, paddingHorizontal: 15 }}>
              <FontAwesomeIcon icon={faSync} color={'white'} size={24} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this._toggleFlah()} style={{ paddingVertical: 18, paddingHorizontal: 15 }}>
              <FontAwesomeIcon icon={faBolt} color={'white'} size={24} />
              {
                (this.state.flashMode == RNCamera.Constants.FlashMode.off) ?
                  <FontAwesomeIcon icon={faTimes} color={'white'} size={14} style={{ position: 'absolute', bottom: 5, right: 9 }} />
                  : null
              }
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ screenMode: 'PostPublication' })} style={{ paddingVertical: 18, paddingHorizontal: 15 }}>
              <FontAwesomeIcon icon={faText} color={'white'} size={24} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('PendingPublication')}
              style={{ paddingVertical: 18, paddingHorizontal: 15 }}
            >
              <FontAwesomeIcon icon={faClone} color={'white'} size={24} />
            </TouchableOpacity>
          </View>
        </View>
      )
    } else {
      return null
    }
  }

  // to display the footer view
  _showDefaultBtnFooter = () => {
    if (!this.state.isRecording) {
      return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => this._pickPicture()}>
              <FontAwesomeIcon icon={faPhotoVideo} color={'white'} size={39} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => this._setDuration()}
              style={{ flexDirection: 'row', borderRadius: 25, borderWidth: 1, borderColor: 'white', overflow: 'hidden' }}>
              <Text style={[styles.text_toggle, this._choiceDurationStyle(1)]}>{I18n.t('CORE.Story')}</Text>
              <Text style={[styles.text_toggle, this._choiceDurationStyle(2)]}>{I18n.t('CORE.Publication')}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => this.props.screenProps.getBack()}>
              <FontAwesomeIcon icon={faAngleDown} color={'white'} size={39} />
            </TouchableOpacity>
          </View>
        </View>
      )
    } else return null
  }

  // to take the picture
  _pickPicture = () => {

    const options = { storageOptions: { skipBackup: true, path: 'images' } }

    ImagePicker.launchImageLibrary(options, (response) => {
      if (!response.uri) return null
      this.setState({ pictureData: response.uri, screenMode: 'PicturePublication' })
    })

  }

  // to display the default screen
  _defaultScreen = () => {
    return (
      <View style={{ flex: 1, margin: 15 }}>
        <View style={{ flex: 4, flexDirection: 'row' }}>{this._showDefaultBtnHeader()}</View>
        <View style={{ flex: 3 }}></View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableWithoutFeedback onPressIn={this.addOneSec} onPressOut={this.stopInterval}>
            <View 
            style={{height: 65, aspectRatio: 1, justifyContent: 'center', alignItems: 'center'}}>
              <FontAwesomeIcon icon={faCircle} color={'white'} size={75} />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{ flex: 2 }}>{this._showDefaultBtnFooter()}</View>
      </View>
    )
  }

  // to confirm the sending publication
  _alertMessageView = () => {
    if (this.props.Publication == 'posted') {
      return (
        <View style={{ position: 'absolute', bottom: 0, top: 0, left: 0, right: 0 }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faCheckCircle} color={'white'} size={65} style={{}} />
            <Text style={{ color: 'white', fontSize: 28, paddingTop: 15 }}>Posted</Text>
          </View>
        </View>
      )
    }
  }

  // to update the comment
  _writeComment(val) {

    if (val == '@') {
      this.setState({ searching: true, searchIndex: this.state.currentPosition || 1 })
    }

    if ((this.state.searching) && (this.state.currentPosition < this.state.searchIndex) && val == ' ') {
      this.setState({ searching: false, searchContent: '' })
    }

    if (
      (this.state.searchIndex !== null) &&
      (this.state.currentPosition >= this.state.searchIndex) &&
      (this.state.searching == true)
    ) {
      this._completeResearch(val)
    }

  }

  // to add profile after the research
  _completeResearch(val) {
    let username

    if (val !== 'Backspace') {
      username = this.state.searchContent.concat(val)
    } else {
      username = this.state.searchContent.substring(0, this.state.searchContent.length - 1)
    }

    if (username.length > 2) { this.props.actions.search(username) }
    this.setState({ searchContent: username, searchingPlace: 'tagComment' })
  }

  // to set the cursor position in the input
  _setCursorPosition(position) { 
    if (position.end == position.start) this.setState({ currentPosition: position.end })
    if (position.end == 0) {
      this.setState({ searching: false, searchContent: '' })
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CameraView cameraType={this.state.cameraType} flashMode={this.state.flashMode}/>
        {/* Body */}
        {this._screen()}
        {this._alertMessageView()}
      </View>
    )
  }

}

const styles = StyleSheet.create({
  selected_duration: {
    backgroundColor: 'white',
    color: 'grey',
    borderRadius: 13,
    overflow: 'hidden'
  },
  text_toggle: {
    color: 'white',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  container_modal: {
    flex: 1,
    margin: 0,
    marginTop: '50%',
    overflow: 'hidden',
    backgroundColor: '#00000038',
    borderRadius: 25,
  },
  footer_btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    borderRadius: 35,
    borderColor: 'white',
    borderWidth: 1,
    alignItems: 'center',
    paddingHorizontal: 15,
    marginHorizontal: 3
  },
  container_story: {
    width: 45,
    height: 45,
    borderRadius: 45,
    borderColor: 'white',
    borderWidth: 2,
    marginTop: 20,
    marginLeft: 15,
    overflow: 'hidden'
  }
})

const mapStateToProps = state => ({
  MyUser: state.MyUser,
  SearchList: state.Search,
  Publication: state.FeedPublications.posted,
  MyStory: state.MyStory,
})

const ActionCreators = Object.assign(
  {},
  MyUserActions,
  SearchActions,
  PublicationFeedActions,
  PendingPubicationsActions,
  MyStoryActions
)

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Camera)