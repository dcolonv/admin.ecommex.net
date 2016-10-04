import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Notification from 'react-s-alert'

import { deactivateCategory, activateCategory } from '../../../store/categories/actions'
import { setShowAlert } from '../../../store/alert/actions'
import { updateCategory } from '../../../utils/categories/serviceHelper'

export const CategoryList = ({categoryList, marketList, onEditCategory, deactivateCategory, activateCategory, setShowAlert}) => {
  const onDeactivateCategory = (category, index) => {
    setShowAlert(true, {
      title: 'Esta seguro?',
      text: 'Está seguro de desactivar la categoría? \n Desaparecerá de todas las páginas!',
      showCancelButton: true,
      onConfirm: () => {
        deactivateCategory(index)
        setShowAlert(false)
        updateCategory({...category, active: false})
        .then((result) => {
          if (result.updated) {
            Notification.success(`Categoría ${category.name} desactivada satisfactóriamente`, {
              position: 'top',
              timeout: 2000
            })
          } else {
            Notification.error(`Hubo un error desactivando la categoría ${category.name}`, {
              position: 'top',
              timeout: 2000
            })
          }
        })
        .catch((err) => {
          console.error(err)
          Notification.error(`Hubo un error desactivando la categoría ${category.name}`, {
            position: 'top',
            timeout: 2000
          })
        })
      },
      onCancel: () => { setShowAlert(false) }
    })
  }

  const onActivateCategory = (category, index) => {
    activateCategory(index)
    category.active = true
    updateCategory(category)
    .then((result) => {
      if (result.updated) {
        Notification.success(`Categoría ${category.name} activada satisfactóriamente`, {
          position: 'top',
          timeout: 2000
        })
      } else {
        Notification.error(`Hubo un error activando la categoría ${category.name}`, {
          position: 'top',
          timeout: 2000
        })
      }
    })
    .catch((err) => {
      console.error(err)
      Notification.error(`Hubo un error activando la categoría ${category.name}`, {
        position: 'top',
        timeout: 2000
      })
    })
  }

  const getMarketName = (marketId) => {
    const market = marketList.find((market) => market.id === marketId)
    if (market) {
      return market.name
    }
    return ''
  }

  const renderCategories = () => {
    return categoryList && categoryList.map((category, index) => {
      let actionClassName = 'material-icons '
      actionClassName += category.active ? 'active-icon' : 'delete-icon'
      const action = category.active ? () => { onDeactivateCategory(category, index) } : () => { onActivateCategory(category, index) }
      return (
        <tr key={index}>
          <td>{category.name}</td>
          <td>{category.description}</td>
          <td>{getMarketName(category.market)}</td>
          <td>{category.active ? 'Activa' : 'Desactivada'}</td>
          <td className="center-align">
            <i className="material-icons edit-icon" onClick={() => { onEditCategory(category, index) }}>mode_edit</i>
            &nbsp; &nbsp; &nbsp;
            <i className={actionClassName} onClick={action}>{category.active ? 'done' : 'close'}</i>
          </td>
        </tr>
      )
    })
  }

  return (
    <div className="row">
      <div className="col s12">
        <div className="page-title">Categorías Agregadas</div>
      </div>
      <div className="col s12">
        <table className="responsive-table">
          <thead>
            <tr>
              <th data-field="name">Categoría</th>
              <th data-field="description">Descripción</th>
              <th data-field="market">Mercado</th>
              <th data-field="status">Estado</th>
              <th data-field="edit" className="center-align">Edición</th>
            </tr>
          </thead>
          <tbody>
            {renderCategories()}
          </tbody>
        </table>
      </div>
    </div>
  )
}

CategoryList.propTypes = {
  categoryList: PropTypes.array,
  marketList: PropTypes.array,
  onEditCategory: PropTypes.func,
  deactivateCategory: PropTypes.func,
  activateCategory: PropTypes.func,
  setShowAlert: PropTypes.func
}

const mapStateToProps = (state) => ({
  categoryList: state.categories,
  marketList: state.markets
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ deactivateCategory, activateCategory, setShowAlert }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)
