import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import classnames from 'classnames'
import Notification from 'react-s-alert'

import { addMarket, editMarket } from '../../store/markets/actions'
import { insertMarket, updateMarket } from '../../utils/markets/serviceHelper'
import { generateId } from '../../utils/idGenerator'

import MarketList from '../components/MarketList'

class Market extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      market: {},
      editing: false,
      index: -1
    }

    this.onAddMarket = this.onAddMarket.bind(this)
    this.onEditMarket = this.onEditMarket.bind(this)
    this.onNameChange = this.onNameChange.bind(this)
    this.onDescriptionChange = this.onDescriptionChange.bind(this)
    this.onCleanForm = this.onCleanForm.bind(this)
    this.editMarket = this.editMarket.bind(this)
  }

  onAddMarket () {
    if (this.state.name && this.state.description) {
      const id = generateId()
      const market = {
        id,
        name: this.state.name,
        description: this.state.description,
        active: true
      }
      this.props.addMarket(market)
      insertMarket(market)
      .then((result) => {
        if (result.inserted) {
          Notification.success(`Mercado ${market.name} agregado satisfactóriamente`, {
            position: 'top',
            timeout: 2000
          })
        } else {
          console.error(result.error)
          Notification.error(`Hubo un error insertando el mercado ${market.name}`, {
            position: 'top',
            timeout: 2000
          })
        }
      })
      .catch((err) => {
        console.error(err)
        Notification.error(`Hubo un error insertando el mercado ${market.name}`, {
          position: 'top',
          timeout: 2000
        })
      })
      this.onCleanForm()
    } else {
      Notification.error('Ambos campos son requeridos', {
        position: 'top',
        timeout: 2000
      })
    }
  }

  onEditMarket () {
    if (this.state.name && this.state.description) {
      const market = {
        ...this.state.market,
        name: this.state.name,
        description: this.state.description
      }
      this.props.editMarket(market, this.state.index)
      updateMarket(market)
      .then((result) => {
        if (result.updated) {
          Notification.success(`Mercado ${market.name} actualizado satisfactóriamente`, {
            position: 'top',
            timeout: 2000
          })
        } else {
          Notification.error(`Hubo un error actualizando el mercado ${market.name}`, {
            position: 'top',
            timeout: 2000
          })
        }
      })
      .catch((err) => {
        console.error(err)
        Notification.error(`Hubo un error actualizando el mercado ${market.name}`, {
          position: 'top',
          timeout: 2000
        })
      })
      this.onCleanForm()
    } else {
      Notification.error('Ambos campos son requeridos', {
        position: 'top',
        timeout: 2000
      })
    }
  }

  onCleanForm () {
    this.setState({
      name: '',
      description: '',
      market: {},
      editing: false,
      index: -1
    })
  }

  editMarket (market, index) {
    this.setState({
      market,
      name: market.name,
      description: market.description,
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

  render () {
    const nameClassName = classnames({
      active: this.state.name && this.state.name.trim().length > 0
    })
    const descriptionClassName = classnames({
      active: this.state.description && this.state.description.trim().length > 0
    })

    const btnText = this.state.editing ? 'editar' : 'agregar'
    const functionToExecute = this.state.editing ? this.onEditMarket : this.onAddMarket

    return (
      <div className="row">
        <div className="col s12">
          <div className="page-title">Mantenimiento de Mercados</div>
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
                    <div className="input-field col s12 center-align">
                      <a className="waves-effect waves-light btn cyan darken-1" onClick={functionToExecute}>
                        <i className="material-icons left">playlist_add</i>{btnText}
                      </a>
                      &nbsp; &nbsp;
                      <a className="waves-effect waves-light btn-flat" onClick={this.onCleanForm}>limpiar</a>
                    </div>
                  </div>
                </form>
              </div>
              <MarketList onEditMarket={this.editMarket} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Market.propTypes = {
  addMarket: PropTypes.func,
  editMarket: PropTypes.func
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addMarket, editMarket }, dispatch)
}

export default connect(null, mapDispatchToProps)(Market)
