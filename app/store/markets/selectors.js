import { createSelector } from 'reselect'

export const getActiveMarkets = createSelector(
  (state) => state.markets,
  (markets) => markets.filter((market) => market.active)
)
