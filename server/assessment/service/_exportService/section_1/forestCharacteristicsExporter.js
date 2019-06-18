const R = require('ramda')

const FraTableExporter = require('../fraTableExporter')

const FraValueService = require('../../../../eof/fraValueService')
const { sum, toFixed } = require('../../../../../common/bignumberUtils')

class ForestCharacteristicsExporter extends FraTableExporter {

  constructor () {
    super(
      'forestCharacteristics',
      [
        'naturallyRegeneratingForest',
        'plantedForest',
        'plantationForest',
        'plantationForestIntroduced',
        'otherPlantedForest',
      ]
    )
  }

  fetchData (countryIso) {
    return FraValueService.getFraValues(this.tableName, countryIso)
  }

  parseResultRow (result, yearIdx, year) {
    const focYear = R.pipe(
      R.prop('fra'),
      R.find(R.propEq('year', year)),
      R.defaultTo({})
    )(result)

    const naturallyRegeneratingForest = R.prop('naturalForestArea', focYear)
    const plantationForest = R.prop('plantationForestArea', focYear)
    const plantationForestIntroduced = R.prop('plantationForestIntroducedArea', focYear)
    const otherPlantedForest = R.prop('otherPlantedForestArea', focYear)
    const plantedForest = toFixed(sum([plantationForest, otherPlantedForest]))

    return ({
      naturallyRegeneratingForest,
      plantedForest,
      plantationForest,
      plantationForestIntroduced,
      otherPlantedForest,
    })
  }

}

const instance = new ForestCharacteristicsExporter()

module.exports = instance
