import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

export const ProgressBar = ({ show }) => {
  if (show) {
    return (
      <div className="row progress">
        <div className="indeterminate"></div>
      </div>
    )
  }
  return null
}

ProgressBar.propTypes = {
  show: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  show: state.progressBar
})

export default connect(mapStateToProps)(ProgressBar)
