import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import auth from './auth/reducer'
import alert from './alert/reducer'
import markets from './markets/reducer'
import countries from './countries/reducer'
import providers from './providers/reducer'
import categories from './categories/reducer'
import productTypes from './productTypes/reducer'
import products from './products/reducer'
import progressBar from './progressBar/reducer'

const rootReducer = combineReducers({
  routing: routerReducer,
  alert,
  markets,
  countries,
  providers,
  categories,
  productTypes,
  products,
  progressBar,
  auth
})

export default rootReducer
