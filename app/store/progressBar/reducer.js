import * as actions from './actions'

const defaultState = false

export default (state = defaultState, {type, payload}) => {
  switch (type) {
    case actions.SHOW_PROGRESS_BAR:
      return payload.show
    default:
      return state
  }
}
