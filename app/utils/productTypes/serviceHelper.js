import request from 'superagent'
import * as config from '../../constants/config'

export const getAllProductTypes = () => {
  return new Promise((resolve, reject) => {
    const url = `${config.EASY_SPREAD_BACKEND_SERVER}/producttypes`
    request.get(url)
      .timeout(config.MICROSERVICE_TIMEOUT)
      .end((err, res) => {
        if (err || !res.ok) {
          reject('Error getting productTypes information')
        } else {
          resolve(res.body.data.Items)
        }
      })
  })
}

export const insertProductType = (productType) => {
  return new Promise((resolve, reject) => {
    const url = `${config.EASY_SPREAD_BACKEND_SERVER}/producttypes`
    request.post(url)
      .send({productType})
      .set('Accept', 'application/json')
      // .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .timeout(config.MICROSERVICE_TIMEOUT)
      .end((err, res) => {
        if (err || !res.ok) {
          reject(`Error inserting new productType information: ${err}`)
        } else {
          resolve(res.body)
        }
      })
  })
}

export const updateProductType = (productType) => {
  return new Promise((resolve, reject) => {
    const url = `${config.EASY_SPREAD_BACKEND_SERVER}/producttypes`
    request.put(url)
      .send({productType})
      .set('Accept', 'application/json')
      // .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .timeout(config.MICROSERVICE_TIMEOUT)
      .end((err, res) => {
        if (err || !res.ok) {
          reject(`Error inserting new productType information: ${err}`)
        } else {
          resolve(res.body)
        }
      })
  })
}
