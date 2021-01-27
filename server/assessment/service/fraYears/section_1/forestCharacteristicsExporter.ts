// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'FraTableEx... Remove this comment to see the full error message
const FraTableExporter = require('../../exporter/fraTableExporter')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'FraValueSe... Remove this comment to see the full error message
const FraValueService = require('../../../../eof/fraValueService')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'sum'.
const { sum, toFixed } = require('../../../../../common/bignumberUtils')

// @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'ForestCharacteristicsExporte... Remove this comment to see the full error message
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

  parseResultRow(result: any, yearIdx: any, year: any) {
    const focYear = R.pipe(R.prop('fra'), R.find(R.propEq('year', year)), R.defaultTo({}))(result)

    const naturallyRegeneratingForest = R.prop('naturalForestArea', focYear)
    const plantationForest = R.prop('plantationForestArea', focYear)
    const plantationForestIntroduced = R.prop('plantationForestIntroducedArea', focYear)
    const otherPlantedForest = R.prop('otherPlantedForestArea', focYear)
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

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'instance'.
const instance = new ForestCharacteristicsExporter()

module.exports = instance
