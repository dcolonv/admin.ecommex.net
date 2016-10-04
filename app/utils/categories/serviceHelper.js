import request from 'superagent'
import * as config from '../../constants/config'

export const getAllCategories = () => {
  return new Promise((resolve, reject) => {
    const url = `${config.EASY_SPREAD_BACKEND_SERVER}/categories`
    request.get(url)
      .timeout(config.MICROSERVICE_TIMEOUT)
      .end((err, res) => {
        if (err || !res.ok) {
          reject('Error getting categories information')
        } else {
          resolve(res.body.data.Items)
        }
      })
  })
}

export const insertCategory = (category) => {
  return new Promise((resolve, reject) => {
    const url = `${config.EASY_SPREAD_BACKEND_SERVER}/categories`
    request.post(url)
      .send({category})
      .set('Accept', 'application/json')
      // .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .timeout(config.MICROSERVICE_TIMEOUT)
      .end((err, res) => {
        if (err || !res.ok) {
          reject(`Error inserting new category information: ${err}`)
        } else {
          resolve(res.body)
        }
      })
  })
}

export const updateCategory = (category) => {
  return new Promise((resolve, reject) => {
    const url = `${config.EASY_SPREAD_BACKEND_SERVER}/categories`
    request.put(url)
      .send({category})
      .set('Accept', 'application/json')
      // .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .timeout(config.MICROSERVICE_TIMEOUT)
      .end((err, res) => {
        if (err || !res.ok) {
          reject(`Error inserting new category information: ${err}`)
        } else {
          resolve(res.body)
        }
      })
  })
}
