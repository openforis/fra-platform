const levels = {
  global: 'WO',
  europe: 'EU',
}

const isISOGlobal = (isoCode) => isoCode === levels.global
const isISOCountry = (isoCode) => /^[a-zA-Z0-9]{3}$/.test(isoCode)

module.exports = {
  levels,
  isISOGlobal,
  isISOCountry,
}
