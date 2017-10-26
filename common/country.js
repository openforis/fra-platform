const {alpha3ToAlpha2, getName} = require('i18n-iso-countries')

const getCountryName = (countryIso, language) =>
  countryIso === 'ATL' // ATL is Atlantis and is for testing/demo purposes only
    ? 'Atlantis'
    : getName(countryIso, language)

const getCountryAlpha2 = (countryIso) =>
  countryIso === 'ATL' // ATL is Atlantis and is for testing/demo purposes only
    ? 'atlantis'
    : alpha3ToAlpha2(countryIso)

module.exports = {
  getCountryName,
  getCountryAlpha2
}
