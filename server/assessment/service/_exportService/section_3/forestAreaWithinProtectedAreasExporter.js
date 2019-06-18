const R = require('ramda')

const TraditionalTableExporter = require('../traditionalTableExporter')

const yearsIdx = {
  '1990': 0,
  '2000': 1,
  '2010': 2,
  '2015': 3,
  '2020': 8,
}

class ForestAreaWithinProtectedAreasExporter extends TraditionalTableExporter {

  constructor () {
    super(
      'forestAreaWithinProtectedAreas',
      ['protected', 'forMngt', 'mngtProt'],
      '3b'
    )
  }

  parseResultRow (result, yearIdx, year) {
    let resultRow = {}

    this.fields.forEach((field, fieldIdx) => {
      const yearIdxTable = yearsIdx[year.toString()]
      resultRow[field] = R.path([fieldIdx, yearIdxTable], result)
    })

    return resultRow
  }

}

const instance = new ForestAreaWithinProtectedAreasExporter()

module.exports = instance
