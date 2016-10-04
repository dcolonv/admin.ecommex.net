import React from 'react'

const ModalSignIn = () => (
  <div id="modal1" className="modal">
    <div className="modal-content">
      <div className="row">
        <form className="col s12">
          <div className="input-field col s12">
            <input id="user" type="text" className="validate" />
            <label htmlFor="user">Usuario</label>
          </div>
          <div className="input-field col s12">
            <input id="password" type="password" className="validate" />
            <label htmlFor="password">Contraseña</label>
          </div>
          <div className="col s12 right-align m-t-sm">
            <a className="modal-action modal-close waves-effect waves-grey btn-flat">Cancelar</a>
            <a href="index.html" className="modal-action modal-close waves-effect waves-light btn cyan darken-1">Entrar</a>
          </div>
        </form>
      </div>
    </div>
  </div>
)

export default ModalSignIn
