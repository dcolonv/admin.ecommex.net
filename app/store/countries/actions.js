export const ADD_COUNTRY = 'countries/ADD_COUNTRY'
export const addCountry = (country) => {
  return {
    type: ADD_COUNTRY,
    payload: {country}
  }
}

export const DEACTIVATE_COUNTRY = 'countries/DEACTIVATE_COUNTRY'
export const deactivateCountry = (index) => {
  return {
    type: DEACTIVATE_COUNTRY,
    payload: {index}
  }
}

export const ACTIVATE_COUNTRY = 'countries/ACTIVATE_COUNTRY'
export const activateCountry = (index) => {
  return {
    type: ACTIVATE_COUNTRY,
    payload: {index}
  }
}

export const EDIT_COUNTRY = 'countries/EDIT_COUNTRY'
export const editCountry = (country, index) => {
  return {
    type: EDIT_COUNTRY,
    payload: {country, index}
  }
}

export const SET_COUNTRY_LIST = 'countries/SET_COUNTRY_LIST'
export const setCountryList = (countryList) => {
  return {
    type: SET_COUNTRY_LIST,
    payload: {countryList}
  }
}
