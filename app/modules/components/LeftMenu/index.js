import React from 'react'
import { Link } from 'react-router'

const LeftMenu = () => (
  <aside id="slide-out" className="side-nav white fixed">
    <div className="side-nav-wrapper">
      <div className="sidebar-profile">
        <div className="sidebar-profile-image">
          <img src="//s3-us-west-2.amazonaws.com/easyspread/images/profile-image.png" className="circle" alt="" />
        </div>
        <div className="sidebar-profile-info">
          <a href="javascript:void(0);" className="account-settings-link">
            <p>David Doe</p>
            <span>david@gmail.com<i className="material-icons right">arrow_drop_down</i></span>
          </a>
        </div>
      </div>
      <div className="sidebar-account-settings">
        <ul>
          <li className="no-padding">
            <a className="waves-effect waves-grey"><i className="material-icons">exit_to_app</i>Sign Out</a>
          </li>
        </ul>
      </div>
      <ul className="sidebar-menu collapsible collapsible-accordion" data-collapsible="accordion">
        <li className="no-padding active"><Link to="/" className="waves-effect waves-grey active"><i className="material-icons">dashboard</i>Dashboard</Link></li>
        <li className="no-padding">
          <a className="collapsible-header waves-effect waves-grey"><i className="material-icons">shopping_basket</i>Productos<i className="nav-drop-icon material-icons">keyboard_arrow_right</i></a>
          <div className="collapsible-body">
            <ul>
              <li><Link to="/products">Todos</Link></li>
              <li><Link to="/products/product">Nuevo</Link></li>
              <li><Link to="/products/bulk">Subir Archivo</Link></li>
              <li><Link to="/products/pictures">Fotos de Productos</Link></li>
            </ul>
          </div>
        </li>
        <li className="no-padding">
          <a className="collapsible-header waves-effect waves-grey"><i className="material-icons">build</i>Mantenimiento<i className="nav-drop-icon material-icons">keyboard_arrow_right</i></a>
          <div className="collapsible-body">
            <ul>
              <li><Link to="/market">Mercados</Link></li>
              <li><Link to="/country">Países</Link></li>
              <li><Link to="/provider">Proveedores</Link></li>
              <li><Link to="/category">Categorías</Link></li>
              <li><Link to="/product_type">Tipos de Producto</Link></li>
            </ul>
          </div>
        </li>
      </ul>
      <div className="footer">
        <p className="copyright">dcolonv solutions ©</p>
        <a href="#!">Privacy</a> &amp; <a href="#!">Terms</a>
      </div>
    </div>
  </aside>
)

export default LeftMenu
