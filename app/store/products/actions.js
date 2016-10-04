export const ADD_PRODUCT = 'products/ADD_PRODUCT'
export const addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    payload: {product}
  }
}

export const DEACTIVATE_PRODUCT = 'products/DEACTIVATE_PRODUCT'
export const deactivateProduct = (index) => {
  return {
    type: DEACTIVATE_PRODUCT,
    payload: {index}
  }
}

export const ACTIVATE_PRODUCT = 'products/ACTIVATE_PRODUCT'
export const activateProduct = (index) => {
  return {
    type: ACTIVATE_PRODUCT,
    payload: {index}
  }
}

export const SET_PRODUCT_LIST = 'products/SET_PRODUCT_LIST'
export const setProductList = (productList) => {
  return {
    type: SET_PRODUCT_LIST,
    payload: {productList}
  }
}

export const SET_SELECTED_PRODUCT = 'products/SET_SELECTED_PRODUCT'
export const setSelectedProduct = (product) => {
  return {
    type: SET_SELECTED_PRODUCT,
    payload: {product}
  }
}
