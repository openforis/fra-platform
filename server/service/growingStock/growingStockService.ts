import * as R from 'ramda'
import { FRA } from '@core/assessment'

import { add, defaultTo0 } from '@common/bignumberUtils'
import { getFraValues } from '../../eof/fraValueService'
import * as repository from '../../repository/growingStock/growingStockRepository'

export const defaultDatum: any = {
  year: null,
  naturallyRegeneratingForest: null,
  plantedForest: null,
  plantationForest: null,
  otherPlantedForest: null,
  forest: null,
  otherWoodedLand: null,
}

export const getDefaultData = () =>
  FRA.years.map((year: any) => ({
    ...defaultDatum,
    year,
  }))

// Schema name set to default public to get around GrowingStockExporter limitations
export const getGrowingStock = async (countryIso: any, schemaName = 'public') => {
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

  // @ts-ignore
  const years = R.uniq(R.pluck('year', [...focArea, ...eofArea]))
  const groupedFoc = R.groupBy(R.prop('year'), focArea)
  const groupedEof = R.groupBy(R.prop('year'), eofArea)
  const mergeFocEofByYear = R.map((year: any) => {
    const obj: any = {
      naturalForestArea: null,
      plantationForestArea: null,
      otherPlantedForestArea: null,
      forestArea: null,
      otherWoodedLand: null,
      plantedForestArea: null,
    }
    const yearFoc = R.path([year, 0], groupedFoc) || {}
    const yearEof = R.path([year, 0], groupedEof) || {}
    // @ts-ignore
    return [year, R.merge(obj, R.merge(yearFoc, yearEof))]
  }, years)

  // @ts-ignore
  const baseTable = R.fromPairs(mergeFocEofByYear)

  return { totalTable, avgTable, baseTable }
}

export default {
  getGrowingStock,
}
