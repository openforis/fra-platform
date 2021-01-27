// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fraReposit... Remove this comment to see the full error message
const fraRepository = require('./fraRepository')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'odpReposit... Remove this comment to see the full error message
const odpRepository = require('../odp/odpRepository')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getDynamic... Remove this comment to see the full error message
const { getDynamicCountryConfiguration } = require('../country/countryRepository')

const forestAreaTableResponse = require('./forestAreaTableResponse')
const focTableResponse = require('./focTableResponse')

const fraReaders = {
  extentOfForest: fraRepository.readFraForestAreas,
  forestCharacteristics: fraRepository.readFraForestCharacteristics,
}
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'odpReaders... Remove this comment to see the full error message
const odpReaders = {
  extentOfForest: odpRepository.readEofOdps,
  forestCharacteristics: odpRepository.readFocOdps,
}
const defaultResponses = {
  extentOfForest: forestAreaTableResponse,
  forestCharacteristics: focTableResponse,
}
const odpsInUse = {
  extentOfForest: (config: any) => true,
  forestCharacteristics: (config: any) => config.useOriginalDataPointsInFoc === true,
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getOdps'.
const getOdps = async (section: any, countryIso: any, schemaName = 'public') => {
  const dynamicConfig = await getDynamicCountryConfiguration(countryIso, schemaName)
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const useOdps = odpsInUse[section](dynamicConfig)
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const readOdp = odpReaders[section]
  if (useOdps) {
    const odps = await readOdp(countryIso, schemaName)
    return odps
  }
  return []
}

const getFraValuesResult = async (fra: any, odp: any, defaultResponse: any) => {
  const odpYears = R.pluck('year', odp)
  const fraYears = R.pluck('year', fra)
  const defaults = R.reject((value: any) => R.contains(value.year, [...odpYears, ...fraYears]), defaultResponse)

  return R.pipe(
    R.reject((value: any) => R.contains(value.year, odpYears)),
    R.concat(defaults),
    R.concat(odp),
    R.values,
    R.sort((a: any, b: any) => (a.year === b.year ? (a.type < b.type ? -1 : 1) : a.year - b.year))
  )(fra)
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getFraValu... Remove this comment to see the full error message
const getFraValues = async (section: any, countryIso: any, schemaName = 'public') => {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const readFra = fraReaders[section]

  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const defaultResponse = defaultResponses[section]

  const fra = await readFra(countryIso, schemaName)
  const odp = await getOdps(section, countryIso, schemaName)

  const result = await getFraValuesResult(fra, odp, defaultResponse)
  const resultNoNDPs = await getFraValuesResult(fra, [], defaultResponse)

  return { fra: result, fraNoNDPs: resultNoNDPs }
}

module.exports = {
  getFraValues,
}
