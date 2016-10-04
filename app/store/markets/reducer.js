import * as actions from './actions'

const defaultState = []

export default (state = defaultState, {type, payload}) => {
  switch (type) {
    case actions.ADD_MARKET:
      return [...state, payload.market]
    case actions.EDIT_MARKET:
      const market = { ...state[payload.index], ...payload.market }
      return [...state.slice(0, payload.index), market, ...state.slice(payload.index + 1)]
    case actions.DEACTIVATE_MARKET:
      return [
        ...state.slice(0, payload.index),
        { ...state.slice()[payload.index], active: false },
        ...state.slice(payload.index + 1)
      ]
    case actions.ACTIVATE_MARKET:
      return [
        ...state.slice(0, payload.index),
        { ...state.slice()[payload.index], active: true },
        ...state.slice(payload.index + 1)
      ]
    case actions.SET_MARKET_LIST:
      return payload.marketList
    default:
      return state
  }
}
