import request from 'superagent'
import * as config from '../../constants/config'

export const getAllProviders = () => {
  return new Promise((resolve, reject) => {
    const url = `${config.EASY_SPREAD_BACKEND_SERVER}/providers`
    request.get(url)
      .timeout(config.MICROSERVICE_TIMEOUT)
      .end((err, res) => {
        if (err || !res.ok) {
          reject('Error getting providers information')
        } else {
          resolve(res.body.data.Items)
        }
      })
  })
}

export const insertProvider = (provider) => {
  return new Promise((resolve, reject) => {
    const url = `${config.EASY_SPREAD_BACKEND_SERVER}/providers`
    request.post(url)
      .send({provider})
      .set('Accept', 'application/json')
      // .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .timeout(config.MICROSERVICE_TIMEOUT)
      .end((err, res) => {
        if (err || !res.ok) {
          reject(`Error inserting new provider information: ${err}`)
        } else {
          resolve(res.body)
        }
      })
  })
}

export const updateProvider = (provider) => {
  return new Promise((resolve, reject) => {
    const url = `${config.EASY_SPREAD_BACKEND_SERVER}/providers`
    request.put(url)
      .send({provider})
      .set('Accept', 'application/json')
      // .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .timeout(config.MICROSERVICE_TIMEOUT)
      .end((err, res) => {
        if (err || !res.ok) {
          reject(`Error inserting new provider information: ${err}`)
        } else {
          resolve(res.body)
        }
      })
  })
}
