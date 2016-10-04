import * as actions from './actions'

const defaultState = []

export default (state = defaultState, {type, payload}) => {
  switch (type) {
    case actions.ADD_CATEGORY:
      return [...state, payload.category]
    case actions.EDIT_CATEGORY:
      const category = { ...state[payload.index], ...payload.category }
      return [...state.slice(0, payload.index), category, ...state.slice(payload.index + 1)]
    case actions.DEACTIVATE_CATEGORY:
      return [
        ...state.slice(0, payload.index),
        { ...state.slice()[payload.index], active: false },
        ...state.slice(payload.index + 1)
      ]
    case actions.ACTIVATE_CATEGORY:
      return [
        ...state.slice(0, payload.index),
        { ...state.slice()[payload.index], active: true },
        ...state.slice(payload.index + 1)
      ]
    case actions.SET_CATEGORY_LIST:
      return payload.categoryList
    default:
      return state
  }
}
