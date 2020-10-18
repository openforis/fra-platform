const EU = 'EU'

const levels = {
  global: 'WO',
  EU,
  regions: ['AF', 'AS', EU, 'NA', 'OC', 'SA'],
}

const isISOGlobal = (isoCode) => isoCode === levels.global
const isISOCountry = (isoCode) => /^[a-zA-Z0-9]{3}$/.test(isoCode)
const isISORegion = (isoCode) => levels.regions.includes(isoCode)

module.exports = {
  levels,
  isISOGlobal,
  isISORegion,
  isISOCountry,
}
