import React, { Component, PropTypes } from 'react'
import ReactDropZone from 'react-dropzone'

import style from './style'

export class DropZone extends Component {
  render () {
    const content = this.props.text ? <h5>{this.props.text}</h5> : <h5><i className="material-icons" style={style.cloud_icon}>{this.props.iconName}</i></h5>

    return (
      <div className="row">
        <ReactDropZone onDrop={this.props.onDrop} accept={this.props.accept} style={style.surround_box} className="center-align">
          {content}
        </ReactDropZone>
      </div>
    )
  }
}

DropZone.propTypes = {
  iconName: PropTypes.string.isRequired,
  text: PropTypes.string,
  accept: PropTypes.string,
  onDrop: PropTypes.func.isRequired
}

export default DropZone
