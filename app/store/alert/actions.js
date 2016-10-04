export const SET_SHOW_ALERT = 'alert/SET_SHOW_ALERT'
export const setShowAlert = (show, info) => {
  return {
    type: SET_SHOW_ALERT,
    payload: {show, info}
  }
}
