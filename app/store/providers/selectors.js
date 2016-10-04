import { createSelector } from 'reselect'

export const getActiveProviders = createSelector(
  (state) => state.providers,
  (providers) => providers.filter((provider) => provider.active)
)
