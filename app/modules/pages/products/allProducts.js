import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Notification from 'react-s-alert'

import { setShowAlert } from '../../../store/alert/actions'
import { setProductList, activateProduct, deactivateProduct, setSelectedProduct } from '../../../store/products/actions'
import { getAllProducts, updateProduct } from '../../../utils/products/serviceHelper'

export class AllProducts extends Component {
  constructor (props) {
    super(props)
    this.renderProducts = this.renderProducts.bind(this)
    this.getProviderName = this.getProviderName.bind(this)
    this.onActivateProduct = this.onActivateProduct.bind(this)
    this.onDeactivateProduct = this.onDeactivateProduct.bind(this)
    this.onEditProduct = this.onEditProduct.bind(this)
  }

  componentDidMount () {
    getAllProducts()
    .then((items) => {
      this.props.setProductList(items)
    })
    .catch((err) => {
      console.error(err)
    })
  }

  onDeactivateProduct (product, index) {
    this.props.setShowAlert(true, {
      title: 'Esta seguro?',
      text: 'Está seguro de desactivar el producto? \n Desaparecera de todas las páginas!',
      showCancelButton: true,
      onConfirm: () => {
        this.props.deactivateProduct(index)
        this.props.setShowAlert(false)
        updateProduct({...product, active: false})
        .then((result) => {
          if (result.updated) {
            Notification.success(`Producto ${product.name} desactivado satisfactóriamente`, {
              position: 'top',
              timeout: 2000
            })
          } else {
            Notification.error(`Hubo un error desactivando el producto ${product.name}`, {
              position: 'top',
              timeout: 2000
            })
          }
        })
        .catch((err) => {
          console.error(err)
          Notification.error(`Hubo un error desactivando el producto ${product.name}`, {
            position: 'top',
            timeout: 2000
          })
        })
      },
      onCancel: () => { this.props.setShowAlert(false) }
    })
  }

  onActivateProduct (product, index) {
    this.props.activateProduct(index)
    updateProduct({...product, active: true})
    .then((result) => {
      if (result.updated) {
        Notification.success(`Producto ${product.name} activado satisfactóriamente`, {
          position: 'top',
          timeout: 2000
        })
      } else {
        Notification.error(`Hubo un error activando el producto ${product.name}`, {
          position: 'top',
          timeout: 2000
        })
      }
    })
    .catch((err) => {
      console.error(err)
      Notification.error(`Hubo un error activando el producto ${product.name}`, {
        position: 'top',
        timeout: 2000
      })
    })
  }

  onEditProduct (product) {
    this.props.setSelectedProduct(product)
    browserHistory.push('/products/product')
  }

  getProviderName (providerId) {
    const provider = this.props.providerList.find((provider) => provider.id === providerId)
    return provider ? provider.name : ''
  }

  renderProducts () {
    return this.props.productList.map((product, index) => {
      const flag = `flag-icon flag-icon-${product.country.toLowerCase()}`
      const description = product.description && product.description.length > 30 ? `${product.description.substring(0, 27)}...` : product.description
      const tooltip = product.description && product.description.length > 30 ? (<span className="tooltiptext">{product.description}</span>) : ''
      let actionClassName = 'material-icons '
      actionClassName += product.active ? 'active-icon' : 'delete-icon'
      const action = product.active ? () => { this.onDeactivateProduct(product, index) } : () => { this.onActivateProduct(product, index) }

      return (
        <tr key={index}>
          <td><span className={flag}></span></td>
          <td>{this.getProviderName(product.provider)}</td>
          <td>{product.id.split('|')[0]}</td>
          <td>{product.name}</td>
          <td>{product.brand}</td>
          <td className="tooltip">{description}{tooltip}</td>
          <td>{product.cost}</td>
          <td>{`${product.tax}%`}</td>
          <td>{`${product.profit}%`}</td>
          <td className="center-align">
            <i className="material-icons edit-icon" onClick={() => { this.onEditProduct(product) }}>mode_edit</i>
            &nbsp; &nbsp; &nbsp;
            <i className={actionClassName} onClick={action}>{product.active ? 'done' : 'close'}</i>
          </td>
        </tr>
      )
    })
  }

  render () {
    return (
      <div className="row">
        <div className="col s12">
          <div className="page-title">Consulta de Productos</div>
        </div>
        <div className="col s12 m12 l12">
          <div className="card">
            <div className="card-content">
              <div className="card-options">
                <input id="search-customer" type="text" className="expand-search" placeholder="Buscar" autoComplete="off" />
              </div>
              <span className="card-title">Productos</span><br />
              <div className="row">
                <div className="col s12">
                  <table className="responsive-table bordered highlight">
                    <thead>
                      <tr>
                        <th data-field="country">País</th>
                        <th data-field="provider">Proveedor</th>
                        <th data-field="code">Código</th>
                        <th data-field="name">Nombre</th>
                        <th data-field="brand">Marca</th>
                        <th data-field="description">Descripción</th>
                        <th data-field="cost">Costo</th>
                        <th data-field="tax">% Impuestos</th>
                        <th data-field="profit">% Ganancias</th>
                        <th data-field="edit" className="center-align">Edición</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.renderProducts()}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AllProducts.propTypes = {
  productList: PropTypes.array,
  providerList: PropTypes.array,
  setShowAlert: PropTypes.func,
  setProductList: PropTypes.func,
  activateProduct: PropTypes.func,
  deactivateProduct: PropTypes.func,
  setSelectedProduct: PropTypes.func
}

const mapStateToProps = (state) => ({
  productList: state.products.productList,
  providerList: state.providers
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setShowAlert, setProductList, activateProduct, deactivateProduct, setSelectedProduct }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
