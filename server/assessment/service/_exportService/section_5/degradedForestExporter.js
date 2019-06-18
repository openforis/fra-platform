const R = require('ramda')

const TraditionalTableExporter = require('../traditionalTableExporter')

class DegradedForestExporter extends TraditionalTableExporter {

  constructor () {
    super(
      'degradedForest',
      ['y/n'],
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
