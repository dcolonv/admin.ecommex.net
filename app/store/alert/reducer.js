import * as actions from './actions'

const defaultState = {
  showAlert: false
}

export default (state = defaultState, {type, payload}) => {
  switch (type) {
    case actions.SET_SHOW_ALERT:
      return {
        ...payload.info,
        show: payload.show
      }
    default:
      return state
  }
}
