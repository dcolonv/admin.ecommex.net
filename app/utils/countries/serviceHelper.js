import request from 'superagent'
import * as config from '../../constants/config'

export const getAllCountries = () => {
  return new Promise((resolve, reject) => {
    const url = `${config.EASY_SPREAD_BACKEND_SERVER}/countries`
    request.get(url)
      .timeout(config.MICROSERVICE_TIMEOUT)
      .end((err, res) => {
        if (err || !res.ok) {
          reject('Error getting countries information')
        } else {
          resolve(res.body.data.Items)
        }
      })
  })
}

export const insertCountry = (country) => {
  return new Promise((resolve, reject) => {
    const url = `${config.EASY_SPREAD_BACKEND_SERVER}/countries`
    request.post(url)
      .send({country})
      .set('Accept', 'application/json')
      // .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .timeout(config.MICROSERVICE_TIMEOUT)
      .end((err, res) => {
        if (err || !res.ok) {
          reject(`Error inserting new country information: ${err}`)
        } else {
          resolve(res.body)
        }
      })
  })
}

export const updateCountry = (country) => {
  return new Promise((resolve, reject) => {
    const url = `${config.EASY_SPREAD_BACKEND_SERVER}/countries`
    request.put(url)
      .send({country})
      .set('Accept', 'application/json')
      // .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .timeout(config.MICROSERVICE_TIMEOUT)
      .end((err, res) => {
        if (err || !res.ok) {
          reject(`Error inserting new country information: ${err}`)
        } else {
          resolve(res.body)
        }
      })
  })
}
