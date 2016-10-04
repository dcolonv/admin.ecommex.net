import { createSelector } from 'reselect'

export const getActiveProductTypes = createSelector(
  (state) => state.productTypes,
  (productTypes) => productTypes.filter((productType) => productType.active)
)
