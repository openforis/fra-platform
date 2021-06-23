import * as R from 'ramda'

import { sum, toFixed } from '@common/bignumberUtils'
import FraTableExporter from '../../exporter/fraTableExporter'

import * as FraValueService from '../../../../eof/fraValueService'

class ForestCharacteristicsExporter extends FraTableExporter {
  constructor() {
    super(
      'forestCharacteristics',
      [
        'naturallyRegeneratingForest',
        'plantedForest',
        'plantationForest',
        'plantationForestIntroduced',
        'otherPlantedForest',
      ],
      '1b'
    )
  }

  fetchData(countryIso: any) {
    return FraValueService.getFraValues(this.tableName, countryIso)
  }

  parseResultRow(result: any, _yearIdx: any, year: any) {
    const focYear = R.pipe(R.prop('fra'), R.find(R.propEq('year', year)), R.defaultTo({}))(result)

    // @ts-ignore
    const naturallyRegeneratingForest = R.prop('naturalForestArea', focYear)
    // @ts-ignore
    const plantationForest = R.prop('plantationForestArea', focYear)
    // @ts-ignore
    const plantationForestIntroduced = R.prop('plantationForestIntroducedArea', focYear)
    // @ts-ignore
    const otherPlantedForest = R.prop('otherPlantedForestArea', focYear)
    // @ts-ignore
    const plantedForest = toFixed(sum([plantationForest, otherPlantedForest]))

    return {
      naturallyRegeneratingForest,
      plantedForest,
      plantationForest,
      plantationForestIntroduced,
      otherPlantedForest,
    }
  }
}

const instance = new ForestCharacteristicsExporter()

export default instance
