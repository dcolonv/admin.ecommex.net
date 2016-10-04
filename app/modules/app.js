import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Styles
import '../assets/plugins/react-s-alert/s-alert-default.css'

// Own components
import NavBar from './components/NavBar'
import ModalSignIn from './components/ModalSignIn'
import LeftMenu from './components/LeftMenu'
import Alert from './components/Alert'
import Notification from 'react-s-alert'

// Preload data
import { getAllMarkets } from '../utils/markets/serviceHelper'
import { setMarketList } from '../store/markets/actions'
import { getAllCountries } from '../utils/countries/serviceHelper'
import { setCountryList } from '../store/countries/actions'
import { getAllProviders } from '../utils/providers/serviceHelper'
import { setProviderList } from '../store/providers/actions'
import { getAllCategories } from '../utils/categories/serviceHelper'
import { setCategoryList } from '../store/categories/actions'
import { getAllProductTypes } from '../utils/productTypes/serviceHelper'
import { setProductTypeList } from '../store/productTypes/actions'

export class App extends Component {
  componentDidMount () {
    getAllMarkets()
    .then((items) => {
      this.props.setMarketList(items)
    })
    .catch((err) => {
      console.error(err)
    })

    getAllCountries()
    .then((items) => {
      this.props.setCountryList(items)
    })
    .catch((err) => {
      console.error(err)
    })

    getAllProviders()
    .then((items) => {
      this.props.setProviderList(items)
    })
    .catch((err) => {
      console.error(err)
    })

    getAllCategories()
    .then((items) => {
      this.props.setCategoryList(items)
    })
    .catch((err) => {
      console.error(err)
    })

    getAllProductTypes()
    .then((items) => {
      this.props.setProductTypeList(items)
    })
    .catch((err) => {
      console.error(err)
    })
  }

  render () {
    return (
      <div className="mn-content fixed-sidebar">
        <Notification stack={{limit: 1}} />
        <Alert />
        <NavBar />
        <ModalSignIn />
        <LeftMenu />
        <main className="mn-inner">
          {this.props.children}
        </main>
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.object,
  setMarketList: PropTypes.func,
  setCountryList: PropTypes.func,
  setProviderList: PropTypes.func,
  setCategoryList: PropTypes.func,
  setProductTypeList: PropTypes.func
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setMarketList, setCountryList, setProviderList, setCategoryList, setProductTypeList }, dispatch)
}

export default connect(null, mapDispatchToProps)(App)
