import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Notification from 'react-s-alert'

import { deactivateProvider, activateProvider } from '../../../store/providers/actions'
import { setShowAlert } from '../../../store/alert/actions'
import { updateProvider } from '../../../utils/providers/serviceHelper'

export const ProviderList = ({providerList, onEditProvider, deactivateProvider, activateProvider, setShowAlert}) => {
  const onDeactivateProvider = (provider, index) => {
    setShowAlert(true, {
      title: 'Esta seguro?',
      text: 'Está seguro de desactivar el proveedor? \n Desaparecerá de todas las páginas!',
      showCancelButton: true,
      onConfirm: () => {
        deactivateProvider(index)
        setShowAlert(false)
        updateProvider({...provider, active: false})
        .then((result) => {
          if (result.updated) {
            Notification.success(`Proveedor ${provider.name} desactivado satisfactóriamente`, {
              position: 'top',
              timeout: 2000
            })
          } else {
            Notification.error(`Hubo un error desactivando el proveedor ${provider.name}`, {
              position: 'top',
              timeout: 2000
            })
          }
        })
        .catch((err) => {
          console.error(err)
          Notification.error(`Hubo un error desactivando el proveedor ${provider.name}`, {
            position: 'top',
            timeout: 2000
          })
        })
      },
      onCancel: () => { setShowAlert(false) }
    })
  }

  const onActivateProvider = (provider, index) => {
    activateProvider(index)
    provider.active = true
    updateProvider(provider)
    .then((result) => {
      if (result.updated) {
        Notification.success(`Proveedor ${provider.name} activado satisfactóriamente`, {
          position: 'top',
          timeout: 2000
        })
      } else {
        Notification.error(`Hubo un error activando el proveedor ${provider.name}`, {
          position: 'top',
          timeout: 2000
        })
      }
    })
    .catch((err) => {
      console.error(err)
      Notification.error(`Hubo un error activando el proveedor ${provider.name}`, {
        position: 'top',
        timeout: 2000
      })
    })
  }

  const renderProviders = () => {
    return providerList && providerList.map((provider, index) => {
      let actionClassName = 'material-icons '
      actionClassName += provider.active ? 'active-icon' : 'delete-icon'
      const action = provider.active ? () => { onDeactivateProvider(provider, index) } : () => { onActivateProvider(provider, index) }
      const flagClassName = `flag-icon flag-icon-${provider.country.toLowerCase()}`
      return (
        <tr key={index}>
          <td><span className={flagClassName}></span></td>
          <td>{provider.name}</td>
          <td>{provider.phones}</td>
          <td>{provider.email}</td>
          <td>{provider.active ? 'Activo' : 'Desactivado'}</td>
          <td className="center-align">
            <i className="material-icons edit-icon" onClick={() => { onEditProvider(provider, index) }}>mode_edit</i>
            &nbsp; &nbsp; &nbsp;
            <i className={actionClassName} onClick={action}>{provider.active ? 'done' : 'close'}</i>
          </td>
        </tr>
      )
    })
  }

  return (
    <div className="row">
      <div className="col s12">
        <div className="page-title">Proveedores Agregados</div>
      </div>
      <div className="col s12">
        <table className="responsive-table">
          <thead>
            <tr>
              <th data-field="country">País</th>
              <th data-field="name">Proveedor</th>
              <th data-field="phones">Teléfonos</th>
              <th data-field="email">Email</th>
              <th data-field="status">Estado</th>
              <th data-field="edit" className="center-align">Edición</th>
            </tr>
          </thead>
          <tbody>
            {renderProviders()}
          </tbody>
        </table>
      </div>
    </div>
  )
}

ProviderList.propTypes = {
  providerList: PropTypes.array,
  onEditProvider: PropTypes.func,
  deactivateProvider: PropTypes.func,
  activateProvider: PropTypes.func,
  setShowAlert: PropTypes.func
}

const mapStateToProps = (state) => ({
  providerList: state.providers
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ deactivateProvider, activateProvider, setShowAlert }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProviderList)
