const R = require('ramda')

const TraditionalTableExporter = require('../../exporter/traditionalTableExporter')

class DegradedForestExporter extends TraditionalTableExporter {

  constructor () {
    super(
      'degradedForest',
      ['y_n'],
      '5c'
    )
  }

  parseResultRow (result, yearIdx) {
    let resultRow = {}

    this.fields.forEach((field, fieldIdx) => {

      resultRow[field] = R.path([fieldIdx, 0], result)

    })

    return resultRow
  }
}

const instance = new DegradedForestExporter()

module.exports = instance
