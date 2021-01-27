// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'FRA'.
const FRA = require('../../common/assessment/fra')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getFraValu... Remove this comment to see the full error message
const { getFraValues } = require('../eof/fraValueService')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'repository... Remove this comment to see the full error message
const repository = require('./growingStockRepository')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'add'.
const { add, defaultTo0 } = require('../../common/bignumberUtils')

const defaultDatum = {
  // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'year' implicitly has an... Remove this comment to see the full error message
  year: null,
  // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'naturallyRegeneratingFo... Remove this comment to see the full error message
  naturallyRegeneratingForest: null,
  // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'plantedForest' implicit... Remove this comment to see the full error message
  plantedForest: null,
  // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'plantationForest' impli... Remove this comment to see the full error message
  plantationForest: null,
  // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'otherPlantedForest' imp... Remove this comment to see the full error message
  otherPlantedForest: null,
  // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'forest' implicitly has ... Remove this comment to see the full error message
  forest: null,
  // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'otherWoodedLand' implic... Remove this comment to see the full error message
  otherWoodedLand: null,
}

const getDefaultData = () =>
  FRA.years.map((year: any) => ({
    ...defaultDatum,
    year,
  }))

// Schema name set to default public to get around GrowingStockExporter limitations
const getGrowingStock = async (countryIso: any, schemaName = 'public') => {
  const growingStockTotal = await repository.readGrowingStock(countryIso, `${schemaName}.growing_stock_total`)
  const growingStockAvg = await repository.readGrowingStock(countryIso, `${schemaName}.growing_stock_avg`)

  const pairTable = R.pipe(
    R.when(R.isEmpty, getDefaultData),
    R.map((v: any) => [v.year, v]),
    R.fromPairs
  )
  const totalTable = pairTable(growingStockTotal)
  const avgTable = pairTable(growingStockAvg)

  const forestCharacteristics = await getFraValues('forestCharacteristics', countryIso)
  const extentOfForest = await getFraValues('extentOfForest', countryIso)

  const focArea = R.map(
    (foc: any) => ({
      year: foc.year,
      naturalForestArea: foc.naturalForestArea,
      plantationForestArea: foc.plantationForestArea,
      otherPlantedForestArea: foc.otherPlantedForestArea,
      plantedForestArea: add(defaultTo0(foc.plantationForestArea), defaultTo0(foc.otherPlantedForestArea)).toString(),
    }),
    forestCharacteristics.fra
  )
  const eofArea = R.map(R.pick(['year', 'forestArea', 'otherWoodedLand']), extentOfForest.fra)

  const years = R.uniq(R.pluck('year', [...focArea, ...eofArea]))
  const groupedFoc = R.groupBy(R.prop('year'), focArea)
  const groupedEof = R.groupBy(R.prop('year'), eofArea)
  const mergeFocEofByYear = R.map((year: any) => {
    const obj = {
      // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'naturalForestArea' impl... Remove this comment to see the full error message
      naturalForestArea: null,
      // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'plantationForestArea' i... Remove this comment to see the full error message
      plantationForestArea: null,
      // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'otherPlantedForestArea'... Remove this comment to see the full error message
      otherPlantedForestArea: null,
      // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'forestArea' implicitly ... Remove this comment to see the full error message
      forestArea: null,
      // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'otherWoodedLand' implic... Remove this comment to see the full error message
      otherWoodedLand: null,
      // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'plantedForestArea' impl... Remove this comment to see the full error message
      plantedForestArea: null,
    }
    const yearFoc = R.path([year, 0], groupedFoc) || {}
    const yearEof = R.path([year, 0], groupedEof) || {}
    return [year, R.merge(obj, R.merge(yearFoc, yearEof))]
  }, years)

  const baseTable = R.fromPairs(mergeFocEofByYear)

  return { totalTable, avgTable, baseTable }
}

module.exports = {
  getGrowingStock,
}
