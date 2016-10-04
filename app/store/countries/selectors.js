import { createSelector } from 'reselect'

export const getActiveCountries = createSelector(
  (state) => state.countries,
  (countries) => countries.filter((country) => country.active)
)
