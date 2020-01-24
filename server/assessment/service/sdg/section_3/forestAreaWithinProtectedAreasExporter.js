const R = require('ramda')

const TraditionalTableExporter = require('../../exporter/traditionalTableExporter')

const yearsIdx = {
  '1990': 0,
  '2000': 1,
  '2010': 2,
  '2015': 3,
  '2016': 4,
  '2017': 5,
  '2018': 6,
  '2019': 7,
  '2020': 8,
}

class ForestAreaWithinProtectedAreasExporter extends TraditionalTableExporter {

  constructor () {
    super(
      'forestAreaWithinProtectedAreas',
      ['protected', 'forMngt'],
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
