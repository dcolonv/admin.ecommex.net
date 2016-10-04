import * as actions from './actions'

const defaultState = []

export default (state = defaultState, {type, payload}) => {
  switch (type) {
    case actions.ADD_PROVIDER:
      return [...state, payload.provider]
    case actions.EDIT_PROVIDER:
      const provider = { ...state[payload.index], ...payload.provider }
      return [...state.slice(0, payload.index), provider, ...state.slice(payload.index + 1)]
    case actions.DEACTIVATE_PROVIDER:
      return [
        ...state.slice(0, payload.index),
        { ...state.slice()[payload.index], active: false },
        ...state.slice(payload.index + 1)
      ]
    case actions.ACTIVATE_PROVIDER:
      return [
        ...state.slice(0, payload.index),
        { ...state.slice()[payload.index], active: true },
        ...state.slice(payload.index + 1)
      ]
    case actions.SET_PROVIDER_LIST:
      return payload.providerList
    default:
      return state
  }
}
