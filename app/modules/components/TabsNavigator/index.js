import React from 'react'
import { Link } from 'react-router'
import styles from './styles'

const TabsNavigator = () => (
  <div className="row" style={styles.component}>
    <div className="col s4">
      <ul>
        <li className="col s2"><Link to="/upload">Upload</Link></li>
        <li className="col s2"><Link to="/status">Status</Link></li>
      </ul>
    </div>
  </div>
)

export default TabsNavigator
