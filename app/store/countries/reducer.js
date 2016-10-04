import * as actions from './actions'

const defaultState = []

export default (state = defaultState, {type, payload}) => {
  switch (type) {
    case actions.ADD_COUNTRY:
      return [...state, payload.country]
    case actions.EDIT_COUNTRY:
      const country = { ...state[payload.index], ...payload.country }
      return [...state.slice(0, payload.index), country, ...state.slice(payload.index + 1)]
    case actions.DEACTIVATE_COUNTRY:
      return [
        ...state.slice(0, payload.index),
        { ...state.slice()[payload.index], active: false },
        ...state.slice(payload.index + 1)
      ]
    case actions.ACTIVATE_COUNTRY:
      return [
        ...state.slice(0, payload.index),
        { ...state.slice()[payload.index], active: true },
        ...state.slice(payload.index + 1)
      ]
    case actions.SET_COUNTRY_LIST:
      return payload.countryList
    default:
      return state
  }
}
