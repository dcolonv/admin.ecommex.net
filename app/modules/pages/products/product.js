import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import classnames from 'classnames'
import Notification from 'react-s-alert'
import { Link } from 'react-router'

import { setSelectedProduct } from '../../../store/products/actions'
import { getActiveCountries } from '../../../store/countries/selectors'
import { getActiveProviders } from '../../../store/providers/selectors'
import { getActiveMarkets } from '../../../store/markets/selectors'
import { getActiveCategories } from '../../../store/categories/selectors'
import { getActiveProductTypes } from '../../../store/productTypes/selectors'

import { updateProduct } from '../../../utils/products/serviceHelper'

export class Product extends Component {
  constructor (props) {
    super(props)
    const product = props.product || {}
    const price = this.getPrice(product.cost, product.tax, product.profit)
    const gross = this.getGrossProfit(price, product.cost, product.tax)
    const net = this.getNetIncome(gross, product.tax)
    const category = this.getCategoryId(product.productType, props.productTypeList)
    const market = this.getMarketId(category, props.categoryList)
    this.state = {
      id: product.id || '',
      name: product.name || '',
      brand: product.brand || '',
      description: product.description || '',
      cost: product.cost || '',
      price,
      tax: product.tax || '',
      profit: product.profit || '',
      country: product.country || '',
      provider: product.provider || '',
      market,
      category,
      productType: product.productType || '',
      gross,
      net,
      editing: !!product.id
    }

    this.onAddProduct = this.onAddProduct.bind(this)
    this.onCleanForm = this.onCleanForm.bind(this)
    this.onIdChange = this.onIdChange.bind(this)
    this.onNameChange = this.onNameChange.bind(this)
    this.onBrandChange = this.onBrandChange.bind(this)
    this.onDescriptionChange = this.onDescriptionChange.bind(this)
    this.onCostChange = this.onCostChange.bind(this)
    this.onTaxChange = this.onTaxChange.bind(this)
    this.onProfitChange = this.onProfitChange.bind(this)
    this.onCountryChange = this.onCountryChange.bind(this)
    this.onProviderChange = this.onProviderChange.bind(this)
    this.onMarketChange = this.onMarketChange.bind(this)
    this.onCategoryChange = this.onCategoryChange.bind(this)
    this.onProductTypeChange = this.onProductTypeChange.bind(this)
    this.renderProviderOptions = this.renderProviderOptions.bind(this)
    this.renderCategoryOptions = this.renderCategoryOptions.bind(this)
    this.renderProductTypeOptions = this.renderProductTypeOptions.bind(this)
  }

  onAddProduct () {
    if (this.state.id && this.state.name && this.state.brand &&
        this.state.cost && !!~this.state.tax &&
        !!~this.state.profit && this.state.country &&
        this.state.provider && this.state.market && this.state.category &&
        this.state.productType) {
      const product = {
        id: `${this.state.id.split('|')[0]}|${this.state.provider}`,
        name: this.state.name,
        brand: this.state.brand,
        description: this.state.description ? this.state.description : null,
        cost: this.state.cost,
        tax: this.state.tax,
        profit: this.state.profit,
        country: this.state.country,
        provider: this.state.provider,
        productType: this.state.productType,
        active: true
      }
      console.log(product)
      updateProduct(product)
      .then((result) => {
        console.log(result)
        if (result.updated) {
          Notification.success(`Producto ${product.name} ingresado satisfactóriamente`, {
            position: 'top',
            timeout: 2000
          })
        } else {
          Notification.error(`Hubo un error ingresando el producto ${product.name}`, {
            position: 'top',
            timeout: 2000
          })
        }
        this.onCleanForm()
      })
      .catch((err) => {
        console.error(err)
        Notification.error(`Hubo un error ingresando el producto ${product.name}`, {
          position: 'top',
          timeout: 2000
        })
      })
    } else {
      Notification.error('Todos los campos son requeridos', {
        position: 'top',
        timeout: 2000
      })
    }
  }

  onCleanForm () {
    this.setState({
      id: '',
      name: '',
      brand: '',
      description: '',
      cost: '',
      price: '',
      tax: '',
      profit: '',
      country: '',
      provider: '',
      market: '',
      category: '',
      productType: '',
      gross: '',
      net: '',
      editing: false
    })
    this.props.setSelectedProduct({})
  }

  onIdChange (event) {
    this.setState({
      id: event.target.value
    })
  }

  onNameChange (event) {
    this.setState({
      name: event.target.value
    })
  }

  onBrandChange (event) {
    this.setState({
      brand: event.target.value
    })
  }

  onDescriptionChange (event) {
    this.setState({
      description: event.target.value
    })
  }

  onCostChange (event) {
    const cost = Number.parseFloat(event.target.value)
    const price = this.getPrice(cost, this.state.tax, this.state.profit)
    const gross = this.getGrossProfit(price, cost, this.state.tax)
    const net = this.getNetIncome(gross, this.state.tax)
    this.setState({
      cost,
      price,
      gross,
      net
    })
  }

  onTaxChange (event) {
    const tax = Number.parseFloat(event.target.value)
    const price = this.getPrice(this.state.cost, tax, this.state.profit)
    const gross = this.getGrossProfit(price, this.state.cost, tax)
    const net = this.getNetIncome(gross, tax)
    this.setState({
      tax,
      price,
      gross,
      net
    })
  }

  onProfitChange (event) {
    const profit = Number.parseFloat(event.target.value)
    const price = this.getPrice(this.state.cost, this.state.tax, profit)
    const gross = this.getGrossProfit(price, this.state.cost, this.state.tax)
    const net = this.getNetIncome(gross, this.state.tax)
    this.setState({
      profit,
      price,
      gross,
      net
    })
  }

  onCountryChange (event) {
    this.setState({
      country: event.target.value,
      provider: ''
    })
  }

  onProviderChange (event) {
    this.setState({
      provider: event.target.value
    })
  }

  onMarketChange (event) {
    this.setState({
      market: event.target.value,
      category: '',
      productType: ''
    })
  }

  onCategoryChange (event) {
    this.setState({
      category: event.target.value,
      productType: ''
    })
  }

  onProductTypeChange (event) {
    this.setState({
      productType: event.target.value
    })
  }

  getCategoryId (productTypeId = '', productTypeList = []) {
    const productType = productTypeList.length &&
      productTypeList.find((productType) => (productType.id === productTypeId))
    if (productType) {
      return productType.category
    }
  }

  getMarketId (categoryId = '', categoryList = []) {
    const category = categoryList.length &&
      categoryList.find((category) => (category.id === categoryId))
    if (category) {
      return category.market
    }
  }

  getPrice (cost = 0, tax = 0, profit = 0) {
    return (cost * (1 + (tax / 100)) * (1 + (profit / 100))).toFixed(2)
  }

  getGrossProfit (price = 0, cost = 0, tax = 0) {
    return (price - (cost * (1 + (tax / 100)))).toFixed(2)
  }

  getNetIncome (gross = 0, tax = 0) {
    return (gross / (1 + (tax / 100))).toFixed(2)
  }

  renderProviderOptions () {
    const filteredProviderList = this.props.providerList && this.props.providerList.filter((provider) => (provider.country === this.state.country))
    if (filteredProviderList && filteredProviderList.length) {
      return filteredProviderList.map((provider, index) => (
        <option key={index} value={provider.id}>{provider.name}</option>
      ))
    }
  }

  renderCategoryOptions () {
    const filteredCategoryList = this.props.categoryList && this.props.categoryList.filter((category) => (category.market === this.state.market))
    if (filteredCategoryList && filteredCategoryList.length) {
      return filteredCategoryList.map((category, index) => (
        <option key={index} value={category.id}>{category.name}</option>
      ))
    }
  }

  renderProductTypeOptions () {
    const filteredProductTypeList = this.props.productTypeList && this.props.productTypeList.filter((productType) => (productType.category === this.state.category))
    if (filteredProductTypeList && filteredProductTypeList.length) {
      return filteredProductTypeList.map((productType, index) => (
        <option key={index} value={productType.id}>{productType.name}</option>
      ))
    }
  }

  render () {
    const idClassName = classnames({
      active: this.state.id
    })
    const nameClassName = classnames({
      active: this.state.name
    })
    const brandClassName = classnames({
      active: this.state.name
    })
    const descriptionClassName = classnames({
      active: this.state.description
    })
    const costClassName = classnames({
      active: this.state.cost
    })
    const priceClassName = classnames({
      active: this.state.price
    })
    const taxClassName = classnames({
      active: this.state.tax
    })
    const profitClassName = classnames({
      active: this.state.profit
    })
    const grossClassName = classnames({
      active: this.state.gross
    })
    const netClassName = classnames({
      active: this.state.net
    })

    const btnText = this.state.editing ? 'editar' : 'agregar'

    return (
      <div className="row">
        <div className="col s12">
          <div className="page-title">Mantenimiento de Producto</div>
        </div>
        <div className="col s12 m12 l12">
          <div className="card">
            <div className="card-content">
              <div className="row">
                <form className="col s12">
                  <div className="row">
                    <div className="input-field col s6">
                      <input id="code" type="text" className="validate" required disabled={this.state.editing} value={this.state.id.split('|')[0]} onChange={this.onIdChange} />
                      <label htmlFor="code" className={idClassName}>Código</label>
                    </div>
                    <div className="input-field col s6">
                      <input id="name" type="text" className="validate" required value={this.state.name} onChange={this.onNameChange} />
                      <label htmlFor="name" className={nameClassName}>Nombre</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s6">
                      <input id="brand" type="text" className="validate" required value={this.state.brand} onChange={this.onBrandChange} />
                      <label htmlFor="brand" className={brandClassName}>Marca</label>
                    </div>
                    <div className="input-field col s6">
                      <input id="description" type="text" className="validate" required value={this.state.description} onChange={this.onDescriptionChange} />
                      <label htmlFor="description" className={descriptionClassName}>Descripción</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s6">
                      <input id="cost" type="number" className="validate" required value={this.state.cost} onChange={this.onCostChange} />
                      <label htmlFor="cost" className={costClassName}>Costo</label>
                    </div>
                    <div className="input-field col s6">
                      <input id="price" type="number" disabled value={this.state.price} />
                      <label htmlFor="price" className={priceClassName}>Precio</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s6">
                      <input id="tax" type="number" className="validate" required value={this.state.tax} onChange={this.onTaxChange} />
                      <label htmlFor="tax" className={taxClassName}>% Impuestos</label>
                    </div>
                    <div className="input-field col s6">
                      <input id="profit" type="number" className="validate" required value={this.state.profit} onChange={this.onProfitChange} />
                      <label htmlFor="profit" className={profitClassName}>% Ganancia</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12 l6">
                      <select className="browser-default" required value={this.state.country} onChange={this.onCountryChange} >
                        <option value="">País del producto</option>
                        if (this.props.countryList && this.props.countryList.length) {
                          this.props.countryList.map((country, index) => (
                            <option key={index} value={country.id}>{country.name}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className="input-field col s12 l6">
                      <select className="browser-default" required value={this.state.provider} onChange={this.onProviderChange} >
                        <option value="">Proveedor</option>
                        {this.renderProviderOptions()}
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12 m6 l4">
                      <select className="browser-default" required value={this.state.market} onChange={this.onMarketChange} >
                        <option value="">Mercado</option>
                        if (this.props.marketList && this.props.marketList.length) {
                          this.props.marketList.map((market, index) => (
                            <option key={index} value={market.id}>{market.name}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className="input-field col s12 m6 l4">
                      <select className="browser-default" required value={this.state.category} onChange={this.onCategoryChange} >
                        <option value="">Categoría</option>
                        {this.renderCategoryOptions()}
                      </select>
                    </div>
                    <div className="input-field col s12 m6 l4">
                      <select className="browser-default" required value={this.state.productType} onChange={this.onProductTypeChange} >
                        <option value="">Tipo</option>
                        {this.renderProductTypeOptions()}
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s6">
                      <input id="gross" type="number" disabled value={this.state.gross} />
                      <label htmlFor="gross" className={grossClassName}>Ganancia Bruta</label>
                    </div>
                    <div className="input-field col s6">
                      <input id="net" type="number" disabled value={this.state.net} />
                      <label htmlFor="net" className={netClassName}>Ganancia Neta</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s6">
                      <Link to="/products">Ver todos</Link>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12 center-align">
                      <a className="waves-effect waves-light btn cyan darken-1" onClick={this.onAddProduct}>
                        <i className="material-icons left">playlist_add</i>{btnText}
                      </a>
                      &nbsp; &nbsp;
                      <a className="waves-effect waves-light btn-flat" onClick={this.onCleanForm}>limpiar</a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Product.propTypes = {
  product: PropTypes.object,
  countryList: PropTypes.array,
  providerList: PropTypes.array,
  marketList: PropTypes.array,
  categoryList: PropTypes.array,
  productTypeList: PropTypes.array,
  setSelectedProduct: PropTypes.func
}

const mapStateToProps = (state) => ({
  product: state.products.selectedProduct,
  countryList: getActiveCountries(state),
  providerList: getActiveProviders(state),
  marketList: getActiveMarkets(state),
  categoryList: getActiveCategories(state),
  productTypeList: getActiveProductTypes(state)
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setSelectedProduct }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
