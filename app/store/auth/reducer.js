import * as actions from './actions'

const defaultState = {
  isAuthenticated: false,
  token: null
}

export default (state = defaultState, {type, payload}) => {
  switch (type) {
    case actions.SET_IS_AUTHENTICATED:
      return {...state, isAuthenticated: payload.isAuthenticated}
    case actions.SET_TOKEN:
      return {...state, token: payload.token}
    case actions.SET_EMAIL:
      return {...state, email: payload.email}
    case actions.SET_ROLE:
      return {...state, role: payload.role}
    case actions.SET_EXPIRATION:
      return {...state, expiration: payload.expiration}
    default:
      return state
  }
}
