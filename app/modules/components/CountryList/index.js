import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Notification from 'react-s-alert'

import { deactivateCountry, activateCountry, editCountry } from '../../../store/countries/actions'
import { getActiveMarkets } from '../../../store/markets/selectors'
import { setShowAlert } from '../../../store/alert/actions'
import { updateCountry } from '../../../utils/countries/serviceHelper'

export const CountryList = ({countryList, marketList, deactivateCountry, activateCountry, editCountry, setShowAlert}) => {
  const onDeactivateCountry = (country, index) => {
    setShowAlert(true, {
      title: 'Esta seguro?',
      text: 'Está seguro de desactivar el país? \n Desaparecera de todas las páginas!',
      showCancelButton: true,
      onConfirm: () => {
        deactivateCountry(index)
        setShowAlert(false)
        country.active = false
        updateCountry(country)
        .then((result) => {
          if (result.updated) {
            Notification.success(`País ${country.name} desactivado satisfactoriamente`, {
              position: 'top',
              timeout: 2000
            })
          } else {
            Notification.error(`Hubo un error desactivando el país ${country.name}`, {
              position: 'top',
              timeout: 2000
            })
          }
        })
        .catch((err) => {
          console.error(err)
          Notification.error(`Hubo un error desactivando el país ${country.name}`, {
            position: 'top',
            timeout: 2000
          })
        })
      },
      onCancel: () => { setShowAlert(false) }
    })
  }

  const onActivateCountry = (country, index) => {
    setShowAlert(true, {
      title: 'Esta seguro?',
      text: 'Está seguro de activar el país? \n Aparecera en todas las páginas!',
      showCancelButton: true,
      onConfirm: () => {
        activateCountry(index)
        setShowAlert(false)
        country.active = true
        updateCountry(country)
        .then((result) => {
          if (result.updated) {
            Notification.success(`País ${country.name} activado satisfactoriamente`, {
              position: 'top',
              timeout: 2000
            })
          } else {
            Notification.error(`Hubo un error activado el país ${country.name}`, {
              position: 'top',
              timeout: 2000
            })
          }
        })
        .catch((err) => {
          console.error(err)
          Notification.error(`Hubo un error activando el país ${country.name}`, {
            position: 'top',
            timeout: 2000
          })
        })
      },
      onCancel: () => { setShowAlert(false) }
    })
  }

  const onCountryMarketChange = (active, country, countryIndex, market) => {
    setShowAlert(true, {
      title: 'Esta seguro?',
      text: `Está seguro de ${active ? 'activar' : 'desactivar'} el mercado ${market.name} para ${country.name}?`,
      showCancelButton: true,
      onConfirm: () => {
        let newMarketList = []
        if (active) {
          newMarketList = [...country.marketList, market.id]
        } else {
          newMarketList = country.marketList.filter((marketId) => marketId !== market.id)
        }
        setShowAlert(false)
        editCountry({...country, marketList: newMarketList}, countryIndex)
        updateCountry({...country, marketList: newMarketList})
        .then((result) => {
          if (result.updated) {
            Notification.success(`País ${country.name} modificado satisfactoriamente`, {
              position: 'top',
              timeout: 2000
            })
          } else {
            Notification.error(`Hubo un error modificando el país ${country.name}`, {
              position: 'top',
              timeout: 2000
            })
          }
        })
        .catch((err) => {
          console.error(err)
          Notification.error(`Hubo un error modificando el país ${country.name}`, {
            position: 'top',
            timeout: 2000
          })
        })
      },
      onCancel: () => {
        event.preventDefault()
        setShowAlert(false)
      }
    })
  }

  const renderMarkets = (country, countryIndex) => {
    return marketList.map((market, index) => {
      const marketId = country.marketList && country.marketList.find((marketId) => (marketId === market.id))
      let iconClassName = 'material-icons left'
      iconClassName += marketId ? ' active-icon' : ''
      return (
        <li key={index} className="collection-item">
          <i className={iconClassName} onClick={() => { onCountryMarketChange(!marketId, country, countryIndex, market) }}>{marketId ? 'done' : 'crop_square'}</i> {market.name}
        </li>
      )
    })
  }

  const renderCountries = () => (
    countryList.map((country, index) => {
      if (country.id) {
        let actionClassName = 'material-icons '
        actionClassName += country.active ? 'active-icon' : 'delete-icon'
        const action = country.active ? () => { onDeactivateCountry(country, index) } : () => { onActivateCountry(country, index) }
        const flagClassName = `flag-icon flag-icon-${country.id.toLowerCase()}`
        return (
          <div key={index} className="col s12 m4 l3">
            <div className="card">
              <div className="card-content">
                <span className="card-title"><span className={flagClassName}></span>&nbsp;{country.name}</span>
                <div className="card-options">
                  <i className={actionClassName} onClick={action}>{country.active ? 'done' : 'close'}</i>
                </div>
                <ul className="collection">
                  {renderMarkets(country, index)}
                </ul>
              </div>
            </div>
          </div>
        )
      }
    })
  )

  return (
    <div className="row">
      {renderCountries()}
    </div>
  )
}

CountryList.propTypes = {
  countryList: PropTypes.array,
  marketList: PropTypes.array,
  deactivateCountry: PropTypes.func,
  activateCountry: PropTypes.func,
  editCountry: PropTypes.func,
  setShowAlert: PropTypes.func
}

const mapStateToProps = (state) => ({
  countryList: state.countries,
  marketList: getActiveMarkets(state)
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ deactivateCountry, activateCountry, editCountry, setShowAlert }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CountryList)
