import React from 'react'
import { Link } from 'react-router'

const NavBar = () => (
  <header className="mn-header navbar-fixed">
    <nav className="cyan darken-1">
      <div className="nav-wrapper row">
        <section className="material-design-hamburger navigation-toggle">
          <a href="javascript:void(0)" data-activates="slide-out" className="button-collapse show-on-large material-design-hamburger__icon">
            <span className="material-design-hamburger__layer"></span>
          </a>
        </section>
        <div className="header-title col s3 m3">
          <span className="chapter-title hide-on-med-and-down"><Link to="/">Ecommex.net Admin</Link></span>
        </div>
        <ul className="right col s9 m3 nav-right-menu">
          <li><a href="#modal1" className="modal-trigger"><i className="material-icons">person</i></a></li>
        </ul>
      </div>
    </nav>
  </header>
)

export default NavBar
