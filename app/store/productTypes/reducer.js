import * as actions from './actions'

const defaultState = []

export default (state = defaultState, {type, payload}) => {
  switch (type) {
    case actions.ADD_PRODUCT_TYPE:
      return [...state, payload.productType]
    case actions.EDIT_PRODUCT_TYPE:
      const productType = { ...state[payload.index], ...payload.productType }
      return [...state.slice(0, payload.index), productType, ...state.slice(payload.index + 1)]
    case actions.DEACTIVATE_PRODUCT_TYPE:
      return [
        ...state.slice(0, payload.index),
        { ...state.slice()[payload.index], active: false },
        ...state.slice(payload.index + 1)
      ]
    case actions.ACTIVATE_PRODUCT_TYPE:
      return [
        ...state.slice(0, payload.index),
        { ...state.slice()[payload.index], active: true },
        ...state.slice(payload.index + 1)
      ]
    case actions.SET_PRODUCT_TYPE_LIST:
      return payload.productTypeList
    default:
      return state
  }
}
