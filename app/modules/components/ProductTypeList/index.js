import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Notification from 'react-s-alert'

import { deactivateProductType, activateProductType } from '../../../store/productTypes/actions'
import { setShowAlert } from '../../../store/alert/actions'
import { updateProductType } from '../../../utils/productTypes/serviceHelper'

export const ProductTypeList = ({productTypeList, categoryList, onEditProductType, deactivateProductType, activateProductType, setShowAlert}) => {
  const onDeactivateProductType = (productType, index) => {
    setShowAlert(true, {
      title: 'Esta seguro?',
      text: 'Está seguro de desactivar el tipo de producto? \n Desaparecerá de todas las páginas!',
      showCancelButton: true,
      onConfirm: () => {
        deactivateProductType(index)
        setShowAlert(false)
        updateProductType({...productType, active: false})
        .then((result) => {
          if (result.updated) {
            Notification.success(`Tipo de Producto ${productType.name} desactivada satisfactóriamente`, {
              position: 'top',
              timeout: 2000
            })
          } else {
            Notification.error(`Hubo un error desactivando el tipo de producto ${productType.name}`, {
              position: 'top',
              timeout: 2000
            })
          }
        })
        .catch((err) => {
          console.error(err)
          Notification.error(`Hubo un error desactivando el tipo de producto ${productType.name}`, {
            position: 'top',
            timeout: 2000
          })
        })
      },
      onCancel: () => { setShowAlert(false) }
    })
  }

  const onActivateProductType = (productType, index) => {
    activateProductType(index)
    productType.active = true
    updateProductType(productType)
    .then((result) => {
      if (result.updated) {
        Notification.success(`Tipo de Producto ${productType.name} activada satisfactóriamente`, {
          position: 'top',
          timeout: 2000
        })
      } else {
        Notification.error(`Hubo un error activando el tipo de producto ${productType.name}`, {
          position: 'top',
          timeout: 2000
        })
      }
    })
    .catch((err) => {
      console.error(err)
      Notification.error(`Hubo un error activando el tipo de producto ${productType.name}`, {
        position: 'top',
        timeout: 2000
      })
    })
  }

  const getCategoryName = (categoryId) => {
    const category = categoryList.find((category) => category.id === categoryId)
    if (category) {
      return category.name
    }
    return ''
  }

  const renderProductTypes = () => {
    return productTypeList && productTypeList.map((productType, index) => {
      let actionClassName = 'material-icons '
      actionClassName += productType.active ? 'active-icon' : 'delete-icon'
      const action = productType.active ? () => { onDeactivateProductType(productType, index) } : () => { onActivateProductType(productType, index) }
      return (
        <tr key={index}>
          <td>{productType.name}</td>
          <td>{productType.description}</td>
          <td>{getCategoryName(productType.category)}</td>
          <td>{productType.active ? 'Activa' : 'Desactivada'}</td>
          <td className="center-align">
            <i className="material-icons edit-icon" onClick={() => { onEditProductType(productType, index) }}>mode_edit</i>
            &nbsp; &nbsp; &nbsp;
            <i className={actionClassName} onClick={action}>{productType.active ? 'done' : 'close'}</i>
          </td>
        </tr>
      )
    })
  }

  return (
    <div className="row">
      <div className="col s12">
        <div className="page-title">Tipo de Productos Agregadas</div>
      </div>
      <div className="col s12">
        <table className="responsive-table">
          <thead>
            <tr>
              <th data-field="name">Tipo de Producto</th>
              <th data-field="description">Descripción</th>
              <th data-field="category">Categoría</th>
              <th data-field="status">Estado</th>
              <th data-field="edit" className="center-align">Edición</th>
            </tr>
          </thead>
          <tbody>
            {renderProductTypes()}
          </tbody>
        </table>
      </div>
    </div>
  )
}

ProductTypeList.propTypes = {
  productTypeList: PropTypes.array,
  categoryList: PropTypes.array,
  onEditProductType: PropTypes.func,
  deactivateProductType: PropTypes.func,
  activateProductType: PropTypes.func,
  setShowAlert: PropTypes.func
}

const mapStateToProps = (state) => ({
  productTypeList: state.productTypes,
  categoryList: state.categories
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ deactivateProductType, activateProductType, setShowAlert }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductTypeList)
