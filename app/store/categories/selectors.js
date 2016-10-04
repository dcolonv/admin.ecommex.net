import { createSelector } from 'reselect'

export const getActiveCategories = createSelector(
  (state) => state.categories,
  (categories) => categories.filter((category) => category.active)
)
