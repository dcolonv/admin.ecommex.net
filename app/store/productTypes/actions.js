export const ADD_PRODUCT_TYPE = 'categories/ADD_PRODUCT_TYPE'
export const addProductType = (productType) => {
  return {
    type: ADD_PRODUCT_TYPE,
    payload: {productType}
  }
}

export const EDIT_PRODUCT_TYPE = 'categories/EDIT_PRODUCT_TYPE'
export const editProductType = (productType, index) => {
  return {
    type: EDIT_PRODUCT_TYPE,
    payload: {productType, index}
  }
}

export const DEACTIVATE_PRODUCT_TYPE = 'categories/DEACTIVATE_PRODUCT_TYPE'
export const deactivateProductType = (index) => {
  return {
    type: DEACTIVATE_PRODUCT_TYPE,
    payload: {index}
  }
}

export const ACTIVATE_PRODUCT_TYPE = 'categories/ACTIVATE_PRODUCT_TYPE'
export const activateProductType = (index) => {
  return {
    type: ACTIVATE_PRODUCT_TYPE,
    payload: {index}
  }
}

export const SET_PRODUCT_TYPE_LIST = 'categories/SET_PRODUCT_TYPE_LIST'
export const setProductTypeList = (productTypeList) => {
  return {
    type: SET_PRODUCT_TYPE_LIST,
    payload: {productTypeList}
  }
}
