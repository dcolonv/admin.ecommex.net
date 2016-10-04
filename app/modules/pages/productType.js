import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import classnames from 'classnames'
import Notification from 'react-s-alert'

import { addProductType, editProductType } from '../../store/productTypes/actions'
import { getActiveCategories } from '../../store/categories/selectors'
import { insertProductType, updateProductType } from '../../utils/productTypes/serviceHelper'
import { generateId } from '../../utils/idGenerator'

import ProductTypeList from '../components/ProductTypeList'

export class ProductType extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      category: '',
      productType: {},
      editing: false,
      index: -1
    }

    this.onAddProductType = this.onAddProductType.bind(this)
    this.onEditProductType = this.onEditProductType.bind(this)
    this.onNameChange = this.onNameChange.bind(this)
    this.onDescriptionChange = this.onDescriptionChange.bind(this)
    this.onCategoryChange = this.onCategoryChange.bind(this)
    this.onCleanForm = this.onCleanForm.bind(this)
    this.editProductType = this.editProductType.bind(this)
  }

  onAddProductType () {
    if (this.state.name && this.state.description && this.state.category) {
      const id = generateId()
      const productType = {
        id,
        name: this.state.name,
        description: this.state.description,
        category: this.state.category,
        active: true
      }
      this.props.addProductType(productType)
      insertProductType(productType)
      .then((result) => {
        if (result.inserted) {
          Notification.success(`Tipo de Producto ${productType.name} agregada satisfactóriamente`, {
            position: 'top',
            timeout: 2000
          })
        } else {
          console.error(result.error)
          Notification.error(`Hubo un error insertando el tipo de producto ${productType.name}`, {
            position: 'top',
            timeout: 2000
          })
        }
      })
      .catch((err) => {
        console.error(err)
        Notification.error(`Hubo un error insertando el tipo de producto ${productType.name}`, {
          position: 'top',
          timeout: 2000
        })
      })
      this.onCleanForm()
    } else {
      Notification.error('Todos los campos son requeridos', {
        position: 'top',
        timeout: 2000
      })
    }
  }

  onEditProductType () {
    if (this.state.name && this.state.description && this.state.category) {
      const productType = {
        ...this.state.productType,
        name: this.state.name,
        description: this.state.description,
        category: this.state.category
      }
      this.props.editProductType(productType, this.state.index)
      updateProductType(productType)
      .then((result) => {
        if (result.updated) {
          Notification.success(`Tipo de Producto ${productType.name} actualizado satisfactóriamente`, {
            position: 'top',
            timeout: 2000
          })
        } else {
          Notification.error(`Hubo un error actualizando el tipo de producto ${productType.name}`, {
            position: 'top',
            timeout: 2000
          })
        }
      })
      .catch((err) => {
        console.error(err)
        Notification.error(`Hubo un error actualizando el tipo de producto ${productType.name}`, {
          position: 'top',
          timeout: 2000
        })
      })
      this.onCleanForm()
    } else {
      Notification.error('Todos los campos son requeridos', {
        position: 'top',
        timeout: 2000
      })
    }
  }

  onCleanForm () {
    this.setState({
      name: '',
      description: '',
      category: '',
      productType: {},
      editing: false,
      index: -1
    })
  }

  editProductType (productType, index) {
    this.setState({
      productType,
      name: productType.name,
      description: productType.description,
      category: productType.category,
      index,
      editing: true
    })
  }

  onNameChange (event) {
    this.setState({
      name: event.target.value
    })
  }

  onDescriptionChange (event) {
    this.setState({
      description: event.target.value
    })
  }

  onCategoryChange (event) {
    this.setState({
      category: event.target.value
    })
  }

  render () {
    const nameClassName = classnames({
      active: this.state.name && this.state.name.trim().length > 0
    })
    const descriptionClassName = classnames({
      active: this.state.description && this.state.description.trim().length > 0
    })

    const btnText = this.state.editing ? 'editar' : 'agregar'
    const functionToExecute = this.state.editing ? this.onEditProductType : this.onAddProductType

    return (
      <div className="row">
        <div className="col s12">
          <div className="page-title">Mantenimiento de Tipo de Productos</div>
        </div>
        <div className="col s12 m12 l12">
          <div className="card">
            <div className="card-content">
              <div className="row">
                <form className="col s12">
                  <div className="row">
                    <div className="input-field col s6">
                      <input id="name" type="text" className="validate" required value={this.state.name} onChange={this.onNameChange} />
                      <label htmlFor="name" className={nameClassName}>Nombre</label>
                    </div>
                    <div className="input-field col s6">
                      <input id="description" type="text" className="validate" required value={this.state.description} onChange={this.onDescriptionChange} />
                      <label htmlFor="description" className={descriptionClassName}>Descripción</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s6">
                      <select className="browser-default" required value={this.state.category} onChange={this.onCategoryChange} >
                        <option value="">Categoría del Tipo de Producto</option>
                        if (this.props.categoryList && this.props.categoryList.length) {
                          this.props.categoryList.map((category, index) => (
                            <option key={index} value={category.id}>{category.name}</option>
                          ))
                        }
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12 center-align">
                      <a className="waves-effect waves-light btn cyan darken-1" onClick={functionToExecute}>
                        <i className="material-icons left">playlist_add</i>{btnText}
                      </a>
                      &nbsp; &nbsp;
                      <a className="waves-effect waves-light btn-flat">limpiar</a>
                    </div>
                  </div>
                </form>
              </div>
              <ProductTypeList onEditProductType={this.editProductType} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ProductType.propTypes = {
  categoryList: PropTypes.array,
  addProductType: PropTypes.func,
  editProductType: PropTypes.func
}

const mapStateToProps = (state) => ({
  categoryList: getActiveCategories(state)
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addProductType, editProductType }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductType)
