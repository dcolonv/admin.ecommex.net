import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import classnames from 'classnames'
import Notification from 'react-s-alert'

import { addProvider, editProvider } from '../../store/providers/actions'
import { getActiveCountries } from '../../store/countries/selectors'
import { insertProvider, updateProvider } from '../../utils/providers/serviceHelper'
import { generateId } from '../../utils/idGenerator'

import ProviderList from '../components/ProviderList'

export class Provider extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      phones: '',
      email: '',
      country: '',
      provider: {},
      editing: false,
      index: -1
    }

    this.onAddProvider = this.onAddProvider.bind(this)
    this.onEditProvider = this.onEditProvider.bind(this)
    this.onNameChange = this.onNameChange.bind(this)
    this.onPhonesChange = this.onPhonesChange.bind(this)
    this.onEmailChange = this.onEmailChange.bind(this)
    this.onCountryChange = this.onCountryChange.bind(this)
    this.onCleanForm = this.onCleanForm.bind(this)
    this.editProvider = this.editProvider.bind(this)
  }

  onAddProvider () {
    if (this.state.name && this.state.phones && this.state.email && this.state.country) {
      const id = generateId()
      const provider = {
        id,
        name: this.state.name,
        phones: this.state.phones,
        email: this.state.email,
        country: this.state.country,
        active: true
      }
      this.props.addProvider(provider)
      insertProvider(provider)
      .then((result) => {
        if (result.inserted) {
          Notification.success(`Proveedor ${provider.name} agregado satisfactóriamente`, {
            position: 'top',
            timeout: 2000
          })
        } else {
          console.error(result.error)
          Notification.error(`Hubo un error insertando el proveedor ${provider.name}`, {
            position: 'top',
            timeout: 2000
          })
        }
      })
      .catch((err) => {
        console.error(err)
        Notification.error(`Hubo un error insertando el proveedor ${provider.name}`, {
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

  onEditProvider () {
    if (this.state.name && this.state.phones && this.state.email && this.state.country) {
      const provider = {
        ...this.state.provider,
        name: this.state.name,
        phones: this.state.phones,
        email: this.state.email,
        country: this.state.country
      }
      this.props.editProvider(provider, this.state.index)
      updateProvider(provider)
      .then((result) => {
        if (result.updated) {
          Notification.success(`Proveedor ${provider.name} actualizado satisfactóriamente`, {
            position: 'top',
            timeout: 2000
          })
        } else {
          Notification.error(`Hubo un error actualizando el proveedor ${provider.name}`, {
            position: 'top',
            timeout: 2000
          })
        }
      })
      .catch((err) => {
        console.error(err)
        Notification.error(`Hubo un error actualizando el proveedor ${provider.name}`, {
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
      phones: '',
      email: '',
      country: '',
      provider: {},
      editing: false,
      index: -1
    })
  }

  editProvider (provider, index) {
    this.setState({
      provider,
      name: provider.name,
      phones: provider.phones,
      email: provider.email,
      country: provider.country,
      index,
      editing: true
    })
  }

  onNameChange (event) {
    this.setState({
      name: event.target.value
    })
  }

  onPhonesChange (event) {
    this.setState({
      phones: event.target.value
    })
  }

  onEmailChange (event) {
    this.setState({
      email: event.target.value
    })
  }

  onCountryChange (event) {
    this.setState({
      country: event.target.value
    })
  }

  render () {
    const nameClassName = classnames({
      active: this.state.name && this.state.name.trim().length > 0
    })
    const phonesClassName = classnames({
      active: this.state.phones && this.state.phones.trim().length > 0
    })
    const emailClassName = classnames({
      active: this.state.email && this.state.email.trim().length > 0
    })

    const btnText = this.state.editing ? 'editar' : 'agregar'
    const functionToExecute = this.state.editing ? this.onEditProvider : this.onAddProvider

    return (
      <div className="row">
        <div className="col s12">
          <div className="page-title">Mantenimiento de Proveedores</div>
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
                      <input id="phones" type="text" className="validate" required value={this.state.phones} onChange={this.onPhonesChange} />
                      <label htmlFor="phones" className={phonesClassName}>Teléfonos</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s6">
                      <input id="email" type="email" className="validate" required value={this.state.email} onChange={this.onEmailChange} />
                      <label htmlFor="email" className={emailClassName}>Email</label>
                    </div>
                    <div className="input-field col s6">
                      <select className="browser-default" required value={this.state.country} onChange={this.onCountryChange} >
                        <option value="">País del Proveedor</option>
                        if (this.props.countryList && this.props.countryList.length) {
                          this.props.countryList.map((country, index) => (
                            <option key={index} value={country.id}>{country.name}</option>
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
                      <a className="waves-effect waves-light btn-flat" onClick={this.onCleanForm}>limpiar</a>
                    </div>
                  </div>
                </form>
              </div>
              <ProviderList onEditProvider={this.editProvider} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Provider.propTypes = {
  countryList: PropTypes.array,
  addProvider: PropTypes.func,
  editProvider: PropTypes.func
}

const mapStateToProps = (state) => ({
  countryList: getActiveCountries(state)
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addProvider, editProvider }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Provider)
