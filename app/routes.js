import React from 'react'
import { Route, IndexRoute } from 'react-router'

// Own Pages
import App from './modules/app'
import Dashboard from './modules/pages/Dashboard'
import Country from './modules/pages/Country'
import Provider from './modules/pages/Provider'
import Market from './modules/pages/Market'
import Category from './modules/pages/Category'
import ProductType from './modules/pages/ProductType'
import AllProducts from './modules/pages/products/AllProducts'
import Product from './modules/pages/products/Product'
import ProductBulkUpload from './modules/pages/products/ProductBulkUpload'
import ProductPicturesUpload from './modules/pages/products/ProductPicturesUpload'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Dashboard} />
    <Route path="country" component={Country} />
    <Route path="provider" component={Provider} />
    <Route path="market" component={Market} />
    <Route path="category" component={Category} />
    <Route path="product_type" component={ProductType} />
    <Route path="products" component={AllProducts} />
    <Route path="products/product" component={Product} />
    <Route path="products/bulk" component={ProductBulkUpload} />
    <Route path="products/pictures" component={ProductPicturesUpload} />
  </Route>
)
