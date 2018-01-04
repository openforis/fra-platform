import * as R from 'ramda'

const demoCountry = {
  countryIso: 'ATL',
  listName: {
    en: 'Atlantis',
    es: 'Atlantis',
    fr: 'Atlantis',
    ru: 'Atlantis'
  },
  fullName: {
    en: 'Atlantis',
    es: 'Atlantis',
    fr: 'Atlantis',
    ru: 'Atlantis'
  },
  lastEdit: null
}

const isDemoCountryISO = countryIso => countryIso === demoCountry.countryIso

export const getCountry = countryIso => isDemoCountryISO(countryIso)
  ? () => demoCountry
  : R.pipe(
    R.path(['country', 'countries']),
    R.values,
    R.flatten,
    R.find(R.propEq('countryIso', countryIso)),
  )
