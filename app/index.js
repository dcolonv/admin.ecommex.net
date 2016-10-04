import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { syncHistoryWithStore } from 'react-router-redux'

// Own Components
import routes from './routes'
import rootReducer from './store'

import './assets/css/custom'

injectTapEventPlugin()

const store = createStore(rootReducer, initialState)

// Redux Store
const initialState = {}

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
  <Provider store={store}>
    <div>
      <Router history={history} children={routes} />
    </div>
  </Provider>
), document.getElementById('app'))
