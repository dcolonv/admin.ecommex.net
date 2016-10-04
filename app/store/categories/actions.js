export const ADD_CATEGORY = 'categories/ADD_CATEGORY'
export const addCategory = (category) => {
  return {
    type: ADD_CATEGORY,
    payload: {category}
  }
}

export const EDIT_CATEGORY = 'categories/EDIT_CATEGORY'
export const editCategory = (category, index) => {
  return {
    type: EDIT_CATEGORY,
    payload: {category, index}
  }
}

export const DEACTIVATE_CATEGORY = 'categories/DEACTIVATE_CATEGORY'
export const deactivateCategory = (index) => {
  return {
    type: DEACTIVATE_CATEGORY,
    payload: {index}
  }
}

export const ACTIVATE_CATEGORY = 'categories/ACTIVATE_CATEGORY'
export const activateCategory = (index) => {
  return {
    type: ACTIVATE_CATEGORY,
    payload: {index}
  }
}

export const SET_CATEGORY_LIST = 'categories/SET_CATEGORY_LIST'
export const setCategoryList = (categoryList) => {
  return {
    type: SET_CATEGORY_LIST,
    payload: {categoryList}
  }
}
