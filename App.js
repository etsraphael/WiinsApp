import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { configureStore } from './app/stores/configureStore'
import { PersistGate } from 'redux-persist/integration/react'
import MainApp from './app/components/core/main-app'
import { resetCacheForDev } from './app/services/cache/cache-core-service'

class App extends Component {

  constructor(props) {
    super(props)
    const { persistor, store } = configureStore()
    this.persistor = persistor
    this.store = store
    this.onBeforeLift = this.onBeforeLift.bind(this)
    this.state = {
      auth: false
    }
  }

  componentDidMount = async () => {
    if (__DEV__) {
      // await resetCacheForDev()
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
