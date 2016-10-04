import request from 'superagent'
import * as config from '../../constants/config'

export const getAllProducts = () => {
  return new Promise((resolve, reject) => {
    const url = `${config.EASY_SPREAD_BACKEND_SERVER}/products`
    request.get(url)
      .timeout(config.MICROSERVICE_TIMEOUT)
      .end((err, res) => {
        if (err || !res.ok) {
          reject('Error getting products information')
        } else {
          resolve(res.body.data.Items)
        }
      })
  })
}

export const insertProduct = (product) => {
  return new Promise((resolve, reject) => {
    const url = `${config.EASY_SPREAD_BACKEND_SERVER}/products`
    request.post(url)
      .send({product})
      .set('Accept', 'application/json')
      // .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .timeout(config.MICROSERVICE_TIMEOUT)
      .end((err, res) => {
        if (err || !res.ok) {
          reject(`Error inserting new product information: ${err}`)
        } else {
          resolve(res.body)
        }
      })
  })
}

export const insertProductList = (productList) => {
  return new Promise((resolve, reject) => {
    const url = `${config.EASY_SPREAD_BACKEND_SERVER}/products`
    request.post(url)
      .send({products: productList})
      .set('Accept', 'application/json')
      // .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .timeout(config.MICROSERVICE_TIMEOUT)
      .end((err, res) => {
        if (err || !res.ok) {
          reject(`Error inserting products information: ${err}`)
        } else {
          resolve(res.body)
        }
      })
  })
}

export const updateProduct = (product) => {
  return new Promise((resolve, reject) => {
    const url = `${config.EASY_SPREAD_BACKEND_SERVER}/products`
    request.put(url)
      .send({product})
      .set('Accept', 'application/json')
      // .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .timeout(config.MICROSERVICE_TIMEOUT)
      .end((err, res) => {
        if (err || !res.ok) {
          reject(`Error inserting new product information: ${err}`)
        } else {
          resolve(res.body)
        }
      })
  })
}

export const uploadProductImage = (country, provider, file) => {
  return new Promise((resolve, reject) => {
    const url = `${config.EASY_SPREAD_BACKEND_SERVER}/products/images`
    request.post(url)
      .send({country, provider, file})
      .set('Accept', 'application/json')
      // .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .timeout(config.MICROSERVICE_TIMEOUT)
      .end((err, res) => {
        if (err || !res.ok) {
          reject(`Error uploading new product information: ${err}`)
        } else {
          resolve(res.body)
        }
      })
  })
}
