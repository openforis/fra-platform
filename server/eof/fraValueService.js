const fraRepository = require('./fraRepository')
const odpRepository = require('../odp/odpRepository')
const R = require('ramda')
const {getDynamicCountryConfiguration} = require('../country/countryRepository')

const forestAreaTableResponse = require('./forestAreaTableResponse')
const focTableResponse = require('./focTableResponse')

const fraReaders = {
  'extentOfForest': fraRepository.readFraForestAreas,
  'forestCharacteristics': fraRepository.readFraForestCharacteristics
}
const odpReaders = {
  'extentOfForest': odpRepository.readEofOdps,
  'forestCharacteristics': odpRepository.readFocOdps
}
const defaultResponses = {
  'extentOfForest': forestAreaTableResponse,
  'forestCharacteristics': focTableResponse
}
const odpsInUse = {
  'extentOfForest': (config) => true,
  'forestCharacteristics': (config) => config.useOriginalDataPointsInFoc === true
}

const getOdps = async (section, countryIso, schemaName = 'public') => {
  const dynamicConfig = await getDynamicCountryConfiguration(countryIso, schemaName)
  const useOdps = odpsInUse[section](dynamicConfig)
  const readOdp = odpReaders[section]
  if (useOdps) {
    const odps = await readOdp(countryIso)
    return odps
  } else {
    return []
  }
}

const getFraValuesResult = async (fra, odp, defaultResponse) => {
  const odpYears = R.pluck('year', odp)
  const fraYears = R.pluck('year', fra)
  const defaults = R.reject(
    value => R.contains(value.year, [...odpYears, ...fraYears]),
    defaultResponse
  )

  return R.pipe(
    R.reject(value => R.contains(value.year, odpYears)),
    R.concat(defaults),
    R.concat(odp),
    R.values,
    R.sort((a, b) => a.year === b.year ? (a.type < b.type ? -1 : 1) : a.year - b.year)
  )(fra)
}

const getFraValues = async (section, countryIso, schemaName = 'public') => {
  const readFra = fraReaders[section]

  const defaultResponse = defaultResponses[section]

  const fra = await readFra(countryIso)
  const odp = await getOdps(section, countryIso, schemaName)

  const result = await getFraValuesResult(fra, odp, defaultResponse)
  const resultNoNDPs = await getFraValuesResult(fra, [], defaultResponse)

  return {fra: result, fraNoNDPs: resultNoNDPs}
}

module.exports = {
  getFraValues
}
