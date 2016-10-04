import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import classnames from 'classnames'
import Notification from 'react-s-alert'

import { addCategory, editCategory } from '../../store/categories/actions'
import { getActiveMarkets } from '../../store/markets/selectors'
import { insertCategory, updateCategory } from '../../utils/categories/serviceHelper'
import { generateId } from '../../utils/idGenerator'

import CategoryList from '../components/CategoryList'

export class Category extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      market: '',
      category: {},
      editing: false,
      index: -1
    }

    this.onAddCategory = this.onAddCategory.bind(this)
    this.onEditCategory = this.onEditCategory.bind(this)
    this.onNameChange = this.onNameChange.bind(this)
    this.onDescriptionChange = this.onDescriptionChange.bind(this)
    this.onMarketChange = this.onMarketChange.bind(this)
    this.onCleanForm = this.onCleanForm.bind(this)
    this.editCategory = this.editCategory.bind(this)
  }

  onAddCategory () {
    if (this.state.name && this.state.description && this.state.market) {
      const id = generateId()
      const category = {
        id,
        name: this.state.name,
        description: this.state.description,
        market: this.state.market,
        active: true
      }
      this.props.addCategory(category)
      insertCategory(category)
      .then((result) => {
        if (result.inserted) {
          Notification.success(`Categoría ${category.name} agregada satisfactóriamente`, {
            position: 'top',
            timeout: 2000
          })
        } else {
          console.error(result.error)
          Notification.error(`Hubo un error insertando la categoría ${category.name}`, {
            position: 'top',
            timeout: 2000
          })
        }
      })
      .catch((err) => {
        console.error(err)
        Notification.error(`Hubo un error insertando la categoría ${category.name}`, {
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

  onEditCategory () {
    if (this.state.name && this.state.description && this.state.market) {
      const category = {
        ...this.state.category,
        name: this.state.name,
        description: this.state.description,
        market: this.state.market
      }
      this.props.editCategory(category, this.state.index)
      updateCategory(category)
      .then((result) => {
        if (result.updated) {
          Notification.success(`Categoría ${category.name} actualizado satisfactóriamente`, {
            position: 'top',
            timeout: 2000
          })
        } else {
          Notification.error(`Hubo un error actualizando la categoría ${category.name}`, {
            position: 'top',
            timeout: 2000
          })
        }
      })
      .catch((err) => {
        console.error(err)
        Notification.error(`Hubo un error actualizando la categoría ${category.name}`, {
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
      market: '',
      category: {},
      editing: false,
      index: -1
    })
  }

  editCategory (category, index) {
    this.setState({
      category,
      name: category.name,
      description: category.description,
      market: category.market,
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

  onMarketChange (event) {
    this.setState({
      market: event.target.value
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
    const functionToExecute = this.state.editing ? this.onEditCategory : this.onAddCategory

    return (
      <div className="row">
        <div className="col s12">
          <div className="page-title">Mantenimiento de Categorías</div>
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
                      <select className="browser-default" required value={this.state.market} onChange={this.onMarketChange} >
                        <option value="">Mercado de la categoría</option>
                        if (this.props.marketList && this.props.marketList.length) {
                          this.props.marketList.map((market, index) => (
                            <option key={index} value={market.id}>{market.name}</option>
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
              <CategoryList onEditCategory={this.editCategory} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Category.propTypes = {
  marketList: PropTypes.array,
  addCategory: PropTypes.func,
  editCategory: PropTypes.func
}

const mapStateToProps = (state) => ({
  marketList: getActiveMarkets(state)
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addCategory, editCategory }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)
