const levels = {
  global: 'WO',
  regions: ['AT', 'AF', 'AS', 'EU', 'NA', 'OC', 'SA'],
}

const isISOCountry = (isoCode) => isoCode.length === 3
const isISORegion = (isoCode) => levels.regions.includes(isoCode)

module.exports = {
  levels,
  isISORegion,
  isISOCountry,
}
