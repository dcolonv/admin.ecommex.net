import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Notification from 'react-s-alert'

import { addCountry } from '../../store/countries/actions'
import { insertCountry } from '../../utils/countries/serviceHelper'

import CountryList from '../components/CountryList'

export class Country extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: '',
      name: ''
    }
    this.onCountryChange = this.onCountryChange.bind(this)
    this.onAddCountry = this.onAddCountry.bind(this)
    this.onCleanForm = this.onCleanForm.bind(this)
  }

  onCountryChange (event) {
    const selectedCountry = event.nativeEvent.target[event.nativeEvent.target.selectedIndex]
    this.setState({
      id: selectedCountry.value,
      name: selectedCountry.text
    })
  }

  onAddCountry () {
    if (this.state.id) {
      const country = {
        id: this.state.id,
        name: this.state.name,
        marketList: [],
        active: true
      }
      this.props.addCountry(country)
      insertCountry(country)
      .then((result) => {
        if (result.inserted) {
          Notification.success(`País ${country.name} agregado satisfactóriamente`, {
            position: 'top',
            timeout: 2000
          })
        } else {
          console.error(result.error || result.errorMessage)
          Notification.error(`Hubo un error insertando el país ${country.name}`, {
            position: 'top',
            timeout: 2000
          })
        }
      })
      .catch((err) => {
        console.error(err)
        Notification.error(`Hubo un error insertando el país ${country.name}`, {
          position: 'top',
          timeout: 2000
        })
      })
      this.onCleanForm()
    }
  }

  onCleanForm () {
    this.setState({
      id: '',
      name: ''
    })
  }

  render () {
    return (
      <div className="row">
        <div className="col s12">
          <div className="page-title">Mantenimiento de Países</div>
        </div>
        <div className="col s12 m12 l12">
          <div className="card">
            <div className="card-content">
              <div className="row">
                <div className="col s6">
                  <select className="browser-default" onChange={this.onCountryChange} value={this.state.id}>
                    <option value="">País...</option>
                    <option value="AR">Argentina</option>
                    <option value="BZ">Belize</option>
                    <option value="BO">Bolivia</option>
                    <option value="BR">Brasil</option>
                    <option value="CL">Chile</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="EC">Ecuador</option>
                    <option value="SV">El Salvador</option>
                    <option value="GT">Guatemala</option>
                    <option value="HN">Honduras</option>
                    <option value="MX">México</option>
                    <option value="NI">Nicaragua</option>
                    <option value="PA">Panamá</option>
                    <option value="PY">Paraguay</option>
                    <option value="PE">Perú</option>
                    <option value="UY">Uruguay</option>
                    <option value="VE">Venezuela</option>
                  </select>
                </div>
                <div className="col s2">
                  <a className="waves-effect waves-light btn cyan darken-1" onClick={this.onAddCountry}><i className="material-icons left">playlist_add</i>agregar</a>
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <div className="page-title">Paises Agregados</div>
                </div>
              </div>
              <CountryList />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Country.propTypes = {
  addCountry: PropTypes.func,
  editCountry: PropTypes.func,
  setCountryList: PropTypes.func
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addCountry }, dispatch)
}

export default connect(null, mapDispatchToProps)(Country)
