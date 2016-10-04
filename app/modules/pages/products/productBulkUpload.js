import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import XLSX from 'xlsx'
import Notification from 'react-s-alert'

import DropZone from '../../components/DropZone'
import ProgressBar from '../../components/ProgressBar'

import { showProgressBar } from '../../../store/progressBar/actions'
import { getActiveProviders } from '../../../store/providers/selectors'
import { getActiveCountries } from '../../../store/countries/selectors'

import { insertProductList } from '../../../utils/products/serviceHelper'

export class ProductBulkUpload extends Component {
  constructor (props) {
    super(props)
    this.state = {
      filename: '',
      productList: [],
      provider: '',
      country: '',
      listReadyToProcess: false,
      error: ''
    }
    this.onDrop = this.onDrop.bind(this)
    this.onProcess = this.onProcess.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onProviderChange = this.onProviderChange.bind(this)
    this.onCountryChange = this.onCountryChange.bind(this)
    this.validateProducts = this.validateProducts.bind(this)
    this.getProductTypeId = this.getProductTypeId.bind(this)
    this.renderProviderOptions = this.renderProviderOptions.bind(this)
  }

  onDrop (files) {
    const file = files[0]
    this.setState({
      filename: file.name,
      error: '',
      listReadyToProcess: false
    })
    this.props.showProgressBar(false)
    // var result = {}
    var reader = new FileReader()
    reader.onerror = (err) => {
      console.error(`Read file error: ${err}`)
    }
    reader.onload = (event) => {
      const data = event.target.result
      const workbook = XLSX.read(data, { type: 'binary' })
      const sheetName = workbook.SheetNames[0]
      const xlRowList = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName])
      if (this.validateProducts(xlRowList)) {
        this.setState({
          productList: xlRowList,
          listReadyToProcess: true
        })
      }
    }
    reader.readAsBinaryString(file)
  }

  onProcess () {
    if (this.state.country && this.state.provider) {
      if (this.state.listReadyToProcess) {
        this.props.showProgressBar(true)
        let insertedProducts = 0
        let errorProducts = 0
        const productList = this.state.productList.map((product) => {
          return {
            id: `${product['CODIGO']}|${this.state.provider}`,
            country: this.state.country,
            provider: this.state.provider,
            name: product['NOMBRE'],
            description: product['DESCRIPCION'],
            brand: product['MARCA'],
            productType: this.getProductTypeId(product['TIPO DE PRODUCTO']),
            cost: Number.parseFloat(product['COSTO'].replace(',', '')),
            tax: Number.parseFloat(product['IMPUESTO'].replace(',', '')),
            profit: Number.parseFloat(product['GANANCIA'].replace(',', '')),
            active: Number.parseFloat(product['EXISTENCIA'].replace(',', '')) > 25
          }
        })
        insertProductList(productList)
        .then((results) => {
          results.forEach((result) => {
            if (!result.inserted) {
              console.error(result.error)
              errorProducts++
            } else {
              insertedProducts++
            }
          })
          if (insertedProducts) {
            Notification.success(`${insertedProducts} Productos agregados satisfactóriamente`, {
              position: 'top',
              timeout: 4000
            })
          }
          if (errorProducts) {
            this.setState({error: 'Uno o más productos no se pudieron incluir'})
          }
          this.props.showProgressBar(false)
        })
        .catch((err) => {
          console.error(err)
          this.setState({error: 'Error procesando el archivo, intentelo nuevamente'})
        })
        this.setState({listReadyToProcess: false})
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
      filename: '',
      productList: [],
      provider: '',
      country: '',
      listReadyToProcess: false,
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

  getProductTypeId (productTypeName) {
    const productType = this.props.productTypeList.find((productType) => (productType.name.toLowerCase() === productTypeName.toLowerCase()))
    return productType.id
  }

  validateProducts (productList) {
    let isValid = true
    let errors
    productList.forEach((product) => {
      if (!('CODIGO' in product)) {
        errors = 'El CODIGO es obligatorio en todos los productos'
      }
      if (!('NOMBRE' in product)) {
        errors = 'El NOMBRE es obligatorio en todos los productos'
      }
      if (!('MARCA' in product)) {
        errors = 'La MARCA es obligatoria en todos los productos'
      }
      if (!('TIPO DE PRODUCTO' in product)) {
        errors = 'El TIPO DE PRODUCTO es obligatorio en todos los productos'
      } else {
        const productType = this.props.productTypeList.find((productType) => (productType.name.toLowerCase() === product['TIPO DE PRODUCTO'].toLowerCase()))
        if (!productType) {
          errors = `El tipo de producto ${product['TIPO DE PRODUCTO']} no existe`
        }
      }
      if (!('COSTO' in product) || !~Number.parseFloat(product['COSTO'])) {
        errors = 'El COSTO es obligatorio en todos los productos'
      }
      if (!('IMPUESTO' in product) || !~Number.parseFloat(product['IMPUESTO'])) {
        errors = 'El IMPUESTO es obligatorio en todos los productos'
      }
      if (!('GANANCIA' in product) || !~Number.parseFloat(product['GANANCIA'])) {
        errors = 'La GANANCIA es obligatoria en todos los productos'
      }
      if (!('EXISTENCIA' in product || !~Number.parseFloat(product['EXISTENCIA']))) {
        errors = 'La EXISTENCIA es obligatoria en todos los productos'
      }
    })
    if (errors) {
      isValid = false
      this.setState({
        error: errors,
        listReadyToProcess: false
      })
    }
    return isValid
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
    const btnClassName = `waves-effect waves-light btn cyan darken-1 ${this.state.listReadyToProcess ? '' : ' disabled'}`
    const btnCancelClassName = `waves-effect waves-light btn-flat ${this.state.listReadyToProcess ? '' : ' hide'}`
    const errorClassName = `row center-align ${this.state.error ? '' : 'hide'}`
    return (
      <div className="row">
        <div className="col s12">
          <div className="page-title">Subir Archivo de Productos</div>
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
              <DropZone iconName="insert_drive_file" onDrop={this.onDrop} text={this.state.filename} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
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

ProductBulkUpload.propTypes = {
  productTypeList: PropTypes.array,
  providerList: PropTypes.array,
  countryList: PropTypes.array,
  showProgressBar: PropTypes.func
}

const mapStateToProps = (state) => ({
  productTypeList: state.productTypes,
  providerList: getActiveProviders(state),
  countryList: getActiveCountries(state)
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({showProgressBar}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductBulkUpload)
