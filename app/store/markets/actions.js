export const ADD_MARKET = 'markets/ADD_MARKET'
export const addMarket = (market) => {
  return {
    type: ADD_MARKET,
    payload: {market}
  }
}

export const EDIT_MARKET = 'markets/EDIT_MARKET'
export const editMarket = (market, index) => {
  return {
    type: EDIT_MARKET,
    payload: {market, index}
  }
}

export const DEACTIVATE_MARKET = 'markets/DEACTIVATE_MARKET'
export const deactivateMarket = (index) => {
  return {
    type: DEACTIVATE_MARKET,
    payload: {index}
  }
}

export const ACTIVATE_MARKET = 'markets/ACTIVATE_MARKET'
export const activateMarket = (index) => {
  return {
    type: ACTIVATE_MARKET,
    payload: {index}
  }
}

export const SET_MARKET_LIST = 'markets/SET_MARKET_LIST'
export const setMarketList = (marketList) => {
  return {
    type: SET_MARKET_LIST,
    payload: {marketList}
  }
}
