export const SHOW_PROGRESS_BAR = 'progressBar/SHOW_PROGRESS_BAR'
export const showProgressBar = (show) => {
  return {
    type: SHOW_PROGRESS_BAR,
    payload: {show}
  }
}
