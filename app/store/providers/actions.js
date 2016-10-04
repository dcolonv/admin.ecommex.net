export const ADD_PROVIDER = 'providers/ADD_PROVIDER'
export const addProvider = (provider) => {
  return {
    type: ADD_PROVIDER,
    payload: {provider}
  }
}

export const EDIT_PROVIDER = 'providers/EDIT_PROVIDER'
export const editProvider = (provider, index) => {
  return {
    type: EDIT_PROVIDER,
    payload: {provider, index}
  }
}

export const DEACTIVATE_PROVIDER = 'providers/DEACTIVATE_PROVIDER'
export const deactivateProvider = (index) => {
  return {
    type: DEACTIVATE_PROVIDER,
    payload: {index}
  }
}

export const ACTIVATE_PROVIDER = 'providers/ACTIVATE_PROVIDER'
export const activateProvider = (index) => {
  return {
    type: ACTIVATE_PROVIDER,
    payload: {index}
  }
}

export const SET_PROVIDER_LIST = 'providers/SET_PROVIDER_LIST'
export const setProviderList = (providerList) => {
  return {
    type: SET_PROVIDER_LIST,
    payload: {providerList}
  }
}
