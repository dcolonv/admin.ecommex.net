import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Notification from 'react-s-alert'

import { DropZone } from '../../components/DropZone'
import ProgressBar from '../../components/ProgressBar'

import { showProgressBar } from '../../../store/progressBar/actions'
import { getActiveProviders } from '../../../store/providers/selectors'
import { getActiveCountries } from '../../../store/countries/selectors'

import { uploadProductImage } from '../../../utils/products/serviceHelper'

export class ProductPicturesUpload extends Component {
  constructor (props) {
    super(props)
    this.state = {
      filenames: '',
      pictures: [],
      provider: '',
      country: '',
      picturesReadyToProcess: false,
      error: ''
    }
    this.onDrop = this.onDrop.bind(this)
    this.onProcess = this.onProcess.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onProviderChange = this.onProviderChange.bind(this)
    this.onCountryChange = this.onCountryChange.bind(this)
    this.renderProviderOptions = this.renderProviderOptions.bind(this)
  }

  onDrop (files) {
    const filenames = files.map((file) => (file.name)).join(',')
    this.setState({
      error: '',
      picturesReadyToProcess: true,
      pictures: files,
      filenames
    })
    this.props.showProgressBar(false)
  }

  onProcess () {
    if (this.state.country && this.state.provider) {
      if (this.state.picturesReadyToProcess) {
        this.props.showProgressBar(true)
        let uploadedPictures = 0
        let errorPictures = 0
        const finishProcess = (uploadedPictures, errorPictures) => {
          uploadedPictures && Notification.success(`${uploadedPictures} Fotos subidas satisfactóriamente`, {
            position: 'top',
            timeout: 4000
          })
          errorPictures && this.setState({error: 'Una o más fotos no se pudieron incluir'})
          this.props.showProgressBar(false)
        }
        this.state.pictures.forEach((file, index) => {
          const reader = new FileReader()
          reader.onload = (upload) => {
            const image = {
              data_uri: upload.target.result,
              name: file.name,
              type: file.type
            }
            uploadProductImage(this.state.country, this.state.provider, image)
            .then((result) => {
              console.log(result)
              uploadedPictures++
              if ((index + 1) === this.state.pictures.length) {
                finishProcess(uploadedPictures, errorPictures)
              }
            })
            .catch((err) => {
              console.error(err)
              errorPictures++
              if ((index + 1) === this.state.pictures.length) {
                finishProcess(uploadedPictures, errorPictures)
              }
            })
          }
          reader.readAsDataURL(file)
        })
        this.setState({picturesReadyToProcess: false})
      }
    } else {
      Notification.error('Indicar el país y proveedor es requerido', {
        position: 'top',
        timeout: 2000
      })
    }
  }

  onCancel () {
    this.setState({
      filenames: '',
      pictures: [],
      provider: '',
      country: '',
      picturesReadyToProcess: false,
      error: ''
    })
    this.props.showProgressBar(false)
  }

  onProviderChange (event) {
    this.setState({
      provider: event.target.value
    })
  }

  onCountryChange (event) {
    this.setState({
      country: event.target.value
    })
  }

  renderProviderOptions () {
    const filteredProviderList = this.props.providerList && this.props.providerList.filter((provider) => (provider.country === this.state.country))
    if (filteredProviderList && filteredProviderList.length) {
      return filteredProviderList.map((provider, index) => (
        <option key={index} value={provider.id}>{provider.name}</option>
      ))
    }
  }

  render () {
    const btnClassName = `waves-effect waves-light btn cyan darken-1 ${this.state.picturesReadyToProcess ? '' : ' disabled'}`
    const btnCancelClassName = `waves-effect waves-light btn-flat ${this.state.picturesReadyToProcess ? '' : ' hide'}`
    const errorClassName = `row center-align ${this.state.error ? '' : 'hide'}`
    return (
      <div className="row">
        <div className="col s12">
          <div className="page-title">Subir Fotos de Productos</div>
        </div>
        <div className="col s12 m12 l12">
          <div className="card">
            <div className="card-content">
              <div className="row">
                <div className="col s12 m12 l6">
                  <select className="browser-default" required value={this.state.country} onChange={this.onCountryChange} >
                    <option value="">País de productos</option>
                    if (this.props.countryList && this.props.countryList.length) {
                      this.props.countryList.map((country, index) => (
                        <option key={index} value={country.id}>{country.name}</option>
                      ))
                    }
                  </select>
                </div>
                <div className="col s12 m12 l6">
                  <select className="browser-default" required value={this.state.provider} onChange={this.onProviderChange} >
                    <option value="">Proveedor de productos</option>
                    {this.renderProviderOptions()}
                  </select>
                </div>
              </div>
              <DropZone iconName="add_a_photo" onDrop={this.onDrop} text={this.state.filenames} accept="image/*" />
              <ProgressBar />
              <div className={errorClassName}>
                <span className="error_text">{this.state.error}</span>
              </div>
            </div>
            <div className="card-action center-align">
              <a className={btnClassName} onClick={this.onProcess}><i className="material-icons left">playlist_add</i>procesar</a>
              &nbsp; &nbsp;
              <a className={btnCancelClassName} onClick={this.onCancel}>Cancelar</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ProductPicturesUpload.propTypes = {
  providerList: PropTypes.array,
  countryList: PropTypes.array,
  showProgressBar: PropTypes.func
}

const mapStateToProps = (state) => ({
  providerList: getActiveProviders(state),
  countryList: getActiveCountries(state)
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({showProgressBar}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPicturesUpload)
