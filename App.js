import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { configureStore } from './app/redux/configureStore'
import { PersistGate } from 'redux-persist/integration/react'
import MainApp from './app/components/core/home/main-app'
import { resetCacheForDev } from './app/services/cache/cache-core-service'
import { configureNotification } from './app/services/notification/notification-service'
import { initSentry } from './app/services/error/error-service'
import SplashScreen from './app/components/core/reusable/misc/splash-screen'

// default setting
const { persistor, store } = configureStore()
configureNotification(store)

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
    else { initSentry() }
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
          <PersistGate persistor={this.persistor} onBeforeLift={() => this.onBeforeLift()} loading={<SplashScreen />}>
            <MainApp />
          </PersistGate>
        </Provider>
      </>
    )
  }

}

export default App;
