import * as actions from './actions'

const defaultState = {
  productList: [],
  selectedProduct: {}
}

export default (state = defaultState, {type, payload}) => {
  switch (type) {
    case actions.ADD_PRODUCT:
      return {...state, productList: [...state.productList, payload.product]}
    case actions.DEACTIVATE_PRODUCT:
      return {...state, productList: [
        ...state.productList.slice(0, payload.index),
        { ...state.productList.slice()[payload.index], active: false },
        ...state.productList.slice(payload.index + 1)
      ]}
    case actions.ACTIVATE_PRODUCT:
      return {...state, productList: [
        ...state.productList.slice(0, payload.index),
        { ...state.productList.slice()[payload.index], active: false },
        ...state.productList.slice(payload.index + 1)
      ]}
    case actions.SET_PRODUCT_LIST:
      return {...state, productList: payload.productList}
    case actions.SET_SELECTED_PRODUCT:
      return {...state, selectedProduct: payload.product}
    default:
      return state
  }
}
