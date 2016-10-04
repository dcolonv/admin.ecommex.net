import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import SweetAlert from 'sweetalert-react'
import './sweetalert.css'

export const Alert = ({ showAlert, title, text, showCancelButton, onConfirm, onCancel }) => {
  title = title || ''
  text = text || ''
  return (
    <div>
      <SweetAlert
        show={showAlert}
        title={title}
        text={text}
        showCancelButton={showCancelButton}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </div>
  )
}

Alert.propTypes = {
  showAlert: PropTypes.bool,
  title: PropTypes.string,
  text: PropTypes.string,
  showCancelButton: PropTypes.bool,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func
}

const mapStateToProps = (state) => ({
  showAlert: state.alert.show,
  title: state.alert.title,
  text: state.alert.text,
  showCancelButton: state.alert.showCancelButton,
  onConfirm: state.alert.onConfirm,
  onCancel: state.alert.onCancel
})

export default connect(mapStateToProps)(Alert)
