export const SET_TOKEN = 'SET_TOKEN'
export const setToken = (token) => {
  return {
    type: SET_TOKEN,
    payload: {token}
  }
}
export const SET_IS_AUTHENTICATED = 'SET_IS_AUTHENTICATED'
export const setIsAuthenticated = (isAuthenticated) => {
  return {
    type: SET_IS_AUTHENTICATED,
    payload: {isAuthenticated}
  }
}
export const SET_EMAIL = 'SET_EMAIL'
export const setEmail = (email) => {
  return {
    type: SET_EMAIL,
    payload: {email}
  }
}
export const SET_ROLE = 'SET_ROLE'
export const setRole = (role) => {
  return {
    type: SET_ROLE,
    payload: {role}
  }
}

export const SET_EXPIRATION = 'SET_EXPIRATION'
export const setExpiration = (expiration) => {
  return {
    type: SET_EXPIRATION,
    payload: {expiration}
  }
}
