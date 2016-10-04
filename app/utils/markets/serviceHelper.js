import request from 'superagent'
import * as config from '../../constants/config'

export const getAllMarkets = () => {
  return new Promise((resolve, reject) => {
    const url = `${config.EASY_SPREAD_BACKEND_SERVER}/markets`
    request.get(url)
      .timeout(config.MICROSERVICE_TIMEOUT)
      .end((err, res) => {
        if (err || !res.ok) {
          reject('Error getting markets information')
        } else {
          resolve(res.body.data.Items)
        }
      })
  })
}

export const insertMarket = (market) => {
  return new Promise((resolve, reject) => {
    const url = `${config.EASY_SPREAD_BACKEND_SERVER}/markets`
    request.post(url)
      .send({market})
      .set('Accept', 'application/json')
      // .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .timeout(config.MICROSERVICE_TIMEOUT)
      .end((err, res) => {
        if (err || !res.ok) {
          reject(`Error inserting new market information: ${err}`)
        } else {
          resolve(res.body)
        }
      })
  })
}

export const updateMarket = (market) => {
  return new Promise((resolve, reject) => {
    const url = `${config.EASY_SPREAD_BACKEND_SERVER}/markets`
    request.put(url)
      .send({market})
      .set('Accept', 'application/json')
      // .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .timeout(config.MICROSERVICE_TIMEOUT)
      .end((err, res) => {
        if (err || !res.ok) {
          reject(`Error inserting new market information: ${err}`)
        } else {
          resolve(res.body)
        }
      })
  })
}
