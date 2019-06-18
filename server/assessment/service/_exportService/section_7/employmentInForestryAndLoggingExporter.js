const R = require('ramda')

const TraditionalTableExporter = require('../traditionalTableExporter')

const yearsIdx = {
  '1990': 0,
  '2000': 3,
  '2010': 6,
  '2015': 9,
}

class EmploymentInForestryAndLoggingExporter extends TraditionalTableExporter {

  constructor () {
    super(
      'employment',
      ['employment', 'emp_forestry', 'emp_logging', 'emp_nwfp', 'emp_support'],
      '7a'
    )
  }

  parseResultRow (result, yearIdx, year) {
    let resultRow = {}

    this.fields.forEach((field, fieldIdx) => {
      const yearIdxData = yearsIdx[year]
      resultRow[field] = R.path([fieldIdx, yearIdxData], result)
    })

    return resultRow
  }
}

const instance = new EmploymentInForestryAndLoggingExporter()

module.exports = instance
