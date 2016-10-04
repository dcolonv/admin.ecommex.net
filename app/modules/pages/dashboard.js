import React, {Component} from 'react'

export class Dashboard extends Component {
  render () {
    return (
      <div className="row">
        <div className="row no-m-t no-m-b">
          <div className="col s12 m12 l4">
            <div className="card stats-card">
              <div className="card-content">
                <div className="card-options">
                  <ul>
                    <li className="red-text"><span className="badge cyan lighten-1">brutas</span></li>
                  </ul>
                </div>
                <span className="card-title">Ventas</span>
                <span className="stats-counter">¢<span className="counter">48,190</span><small>Esta semana</small></span>
              </div>
              <div id="sparkline-bar"></div>
            </div>
          </div>
          <div className="col s12 m12 l4">
            <div className="card stats-card">
              <div className="card-content">
                <span className="card-title">Visitas a la pagina</span>
                <span className="stats-counter"><span className="counter">83,710</span><small>Este mes</small></span>
              </div>
              <div id="sparkline-line"></div>
            </div>
          </div>
          <div className="col s12 m12 l4">
            <div className="card stats-card">
              <div className="card-content">
                <span className="card-title">Ganancias</span>
                <span className="stats-counter">¢<span className="counter">23,230</span><small>Semana pasada</small></span>
                <div className="percent-info green-text">8% <i className="material-icons">trending_up</i></div>
              </div>
              <div className="progress stats-card-progress">
                <div className="determinate" style={{width: '70%'}}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="row no-m-t no-m-b">
          <div className="col s12 m12 l4">
            <div className="card server-card">
              <div className="card-content">
                <div className="card-options">
                  <ul>
                    <li className="red-text"><span className="badge red darken-3">pendientes</span></li>
                  </ul>
                </div>
                <div className="server-load row">
                  <div className="server-stat col s12">
                    <p>Ordenes Pendientes</p>
                  </div>
                  <div className="server-stat col s3">
                    <p>16</p>
                    <span>Ordenes</span>
                  </div>
                  <div className="server-stat col s5">
                    <p>¢320,000</p>
                    <span>Monto total</span>
                  </div>
                  <div className="server-stat col s4">
                    <p>55</p>
                    <span>Productos</span>
                  </div>
                </div>
                <div className="server-load row">
                  <div className="server-stat col s12">
                    <p>Ordenes Vendidas</p>
                  </div>
                  <div className="server-stat col s3">
                    <p>160</p>
                    <span>Ordenes</span>
                  </div>
                  <div className="server-stat col s5">
                    <p>¢3,200,000</p>
                    <span>Monto total</span>
                  </div>
                  <div className="server-stat col s4">
                    <p>550</p>
                    <span>Productos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col s12 m12 l8">
            <div className="card visitors-card">
              <div className="card-content">
                <div className="card-options">
                  <ul>
                    <li><a href="javascript:void(0)" className="card-refresh"><i className="material-icons">refresh</i></a></li>
                  </ul>
                </div>
                <span className="card-title">Productos Vendidos<span className="secondary-title">Enseña las estadisticas de la cantidad de productos vendidos</span></span>
                <div id="flotchart1"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="row no-m-t no-m-b">
          <div className="col s12 m12 l12">
            <div className="card invoices-card">
              <div className="card-content">
                <div className="card-options">
                  <input type="text" className="expand-search" placeholder="Search" autoComplete="off" />
                </div>
                <span className="card-title">Ordenes Pendientes</span>
                <table className="responsive-table bordered">
                  <thead>
                    <tr>
                      <th data-field="id">ID</th>
                      <th data-field="user">Usuario</th>
                      <th data-field="name">Nombre</th>
                      <th data-field="date">Fecha</th>
                      <th data-field="deposit">Depósito</th>
                      <th data-field="coupon">Cupón</th>
                      <th data-field="total">Total</th>
                      <th data-field="approval" className="center-align">Aprobacion</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#203</td>
                      <td>dx8732</td>
                      <td>David Doe Brice</td>
                      <td>Oct 16, 18:12</td>
                      <td>¢65,250</td>
                      <td>¢6,000</td>
                      <td>¢70250</td>
                      <td className="center-align">
                        <i className="material-icons">check</i>
                        &nbsp;
                        <i className="material-icons">close</i>
                      </td>
                    </tr>
                    <tr>
                      <td>#204</td>
                      <td>jp1234</td>
                      <td>John Pedroza Barrantes</td>
                      <td>Oct 16, 21:00</td>
                      <td>¢105,250</td>
                      <td>¢10,500</td>
                      <td>¢115,750</td>
                      <td className="center-align">
                        <i className="material-icons">check</i>
                        &nbsp;
                        <i className="material-icons">close</i>
                      </td>
                    </tr>
                    <tr>
                      <td>#207</td>
                      <td>ml1234</td>
                      <td>Mariana Sosa Sosa</td>
                      <td>Oct 17, 10:00</td>
                      <td>¢91,000</td>
                      <td>¢10,000</td>
                      <td>¢101,000</td>
                      <td className="center-align">
                        <i className="material-icons">check</i>
                        &nbsp;
                        <i className="material-icons">close</i>
                      </td>
                    </tr>
                    <tr>
                      <td>#210</td>
                      <td>ae1234</td>
                      <td>Alonso Moke Cordero</td>
                      <td>Oct 18, 12:00</td>
                      <td>¢900,000</td>
                      <td>¢90,000</td>
                      <td>¢990,000</td>
                      <td className="center-align">
                        <i className="material-icons">check</i>
                        &nbsp;
                        <i className="material-icons">close</i>
                      </td>
                    </tr>
                    <tr>
                      <td>#210</td>
                      <td>lb1234</td>
                      <td>Lucas Vasquez</td>
                      <td>Oct 19, 1:00</td>
                      <td>¢76,000</td>
                      <td>¢4,000</td>
                      <td>¢80,000</td>
                      <td className="center-align">
                        <i className="material-icons">check</i>
                        &nbsp;
                        <i className="material-icons">close</i>
                      </td>
                    </tr>
                    <tr>
                      <td>#210</td>
                      <td>lf1234</td>
                      <td>Luis Fonseca</td>
                      <td>Oct 20, 8:00</td>
                      <td>¢123,765</td>
                      <td>¢23,765</td>
                      <td>¢147,530</td>
                      <td className="center-align">
                        <i className="material-icons">check</i>
                        &nbsp; &nbsp; &nbsp;
                        <i className="material-icons">close</i>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard
