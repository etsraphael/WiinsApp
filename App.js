import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { configureStore } from './app/redux/configureStore'
import { PersistGate } from 'redux-persist/integration/react'
import MainApp from './app/components/core/home/main-app'
import { resetCacheForDev } from './app/services/cache/cache-core-service'
import messaging from '@react-native-firebase/messaging'
import { Platform } from 'react-native'
import { configureNotification } from './app/services/notification/notification-service'
import { initSentry } from './app/services/error/error-service'

// default setting
configureNotification()
const { persistor, store } = configureStore()

class App extends Component {

  constructor(props) {
    super(props)
    this.persistor = persistor
    this.store = store
    this.onBeforeLift = this.onBeforeLift.bind(this)
    this.state = {
      auth: false
    }
  }

  componentDidMount = async () => {

    if (__DEV__) { await resetCacheForDev() }
    else { initSentry()  }

    if(Platform.OS == 'ios'){
      await this.requestUserPermissionForIos()
    }

  }

  requestUserPermissionForIos = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  onBeforeLift() {
    if (this.store.getState().MyUser.user !== null) {
      this.setState({ auth: true })
    }
  }

  render() {
    return (
      <>
        <Provider store={this.store}>
          <PersistGate persistor={this.persistor} onBeforeLift={() => this.onBeforeLift()} loading={null}>
            <MainApp />
          </PersistGate>
        </Provider>
      </>
    )
  }

}

export default App;
