import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Notification from 'react-s-alert'

import { deactivateMarket, activateMarket } from '../../../store/markets/actions'
import { setShowAlert } from '../../../store/alert/actions'
import { updateMarket } from '../../../utils/markets/serviceHelper'

export const MarketList = ({marketList, onEditMarket, deactivateMarket, activateMarket, setShowAlert}) => {
  const onDeactivateMarket = (market, index) => {
    setShowAlert(true, {
      title: 'Esta seguro?',
      text: 'Está seguro de desactivar el mercado? \n Desaparecera de todas las páginas!',
      showCancelButton: true,
      onConfirm: () => {
        deactivateMarket(index)
        setShowAlert(false)
        updateMarket({...market, active: false})
        .then((result) => {
          if (result.updated) {
            Notification.success(`Mercado ${market.name} desactivado satisfactóriamente`, {
              position: 'top',
              timeout: 2000
            })
          } else {
            Notification.error(`Hubo un error desactivando el mercado ${market.name}`, {
              position: 'top',
              timeout: 2000
            })
          }
        })
        .catch((err) => {
          console.error(err)
          Notification.error(`Hubo un error desactivando el mercado ${market.name}`, {
            position: 'top',
            timeout: 2000
          })
        })
      },
      onCancel: () => { setShowAlert(false) }
    })
  }

  const onActivateMarket = (market, index) => {
    activateMarket(index)
    updateMarket({...market, active: true})
    .then((result) => {
      if (result.updated) {
        Notification.success(`Mercado ${market.name} activado satisfactóriamente`, {
          position: 'top',
          timeout: 2000
        })
      } else {
        Notification.error(`Hubo un error activando el mercado ${market.name}`, {
          position: 'top',
          timeout: 2000
        })
      }
    })
    .catch((err) => {
      console.error(err)
      Notification.error(`Hubo un error activando el mercado ${market.name}`, {
        position: 'top',
        timeout: 2000
      })
    })
  }

  const renderMarkets = () => {
    return marketList && marketList.map((market, index) => {
      let actionClassName = 'material-icons '
      actionClassName += market.active ? 'active-icon' : 'delete-icon'
      const action = market.active ? () => { onDeactivateMarket(market, index) } : () => { onActivateMarket(market, index) }

      return (
        <tr key={index}>
          <td>{market.name}</td>
          <td>{market.description}</td>
          <td>{market.active ? 'Activo' : 'Desactivado'}</td>
          <td className="center-align">
            <i className="material-icons edit-icon" onClick={() => { onEditMarket(market, index) }}>mode_edit</i>
            &nbsp; &nbsp; &nbsp;
            <i className={actionClassName} onClick={action}>{market.active ? 'done' : 'close'}</i>
          </td>
        </tr>
      )
    })
  }

  return (
    <div className="row">
      <div className="col s12">
        <div className="page-title">Mercados Agregados</div>
      </div>
      <div className="col s12">
        <table className="responsive-table">
          <thead>
            <tr>
              <th data-field="name">Mercado</th>
              <th data-field="description">Descripción</th>
              <th data-field="status">Estado</th>
              <th data-field="edit" className="center-align">Edición</th>
            </tr>
          </thead>
          <tbody>
            {renderMarkets()}
          </tbody>
        </table>
      </div>
    </div>
  )
}

MarketList.propTypes = {
  marketList: PropTypes.array,
  onEditMarket: PropTypes.func,
  deactivateMarket: PropTypes.func,
  activateMarket: PropTypes.func,
  setShowAlert: PropTypes.func
}

const mapStateToProps = (state) => ({
  marketList: state.markets
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ deactivateMarket, activateMarket, setShowAlert }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketList)
