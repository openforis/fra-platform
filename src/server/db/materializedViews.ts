import { CountryIso } from 'meta/area'

const getActivityLogCountry = (countryIso: CountryIso) => `"activity_log_${countryIso}"`

export const MaterializedViews = {
  getActivityLogCountry,
}
