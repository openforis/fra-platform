const R = require('ramda')

const TraditionalTableExporter = require('../../exporter/traditionalTableExporter')

const yearsIdx = {
  '1990': 0,
  '2000': 3,
  '2010': 6,
  '2015': 9,
}

const fieldsIdx = {
  'employment_tot': 0, 'employment_fem': 0, 'employment_male': 0,
  'emp_forestry_tot': 1, 'emp_forestry_fem': 1, 'emp_forestry_male': 1,
  'emp_logging_tot': 2, 'emp_logging_fem': 2, 'emp_logging_male': 2,
  'emp_nwfp_tot': 3, 'emp_nwfp_fem': 3, 'emp_nwfp_male': 3,
  'emp_support_tot': 4, 'emp_support_fem': 4, 'emp_support_male': 4,
}


class EmploymentInForestryAndLoggingExporter extends TraditionalTableExporter {

  constructor () {
    super(
      'employment',
      [
        'employment_tot',
        'employment_fem',
        'employment_male',
        'emp_forestry_tot',
        'emp_forestry_fem',
        'emp_forestry_male',
        'emp_logging_tot',
        'emp_logging_fem',
        'emp_logging_male',
        'emp_nwfp_tot',
        'emp_nwfp_fem',
        'emp_nwfp_male',
        'emp_support_tot',
        'emp_support_fem',
        'emp_support_male',
      ],
      '7a'
    )
  }

  parseResultRow (result, yearIdx, year) {
    let resultRow = {}

    this.fields.forEach((field, fieldIdx) => {
      const yearIdxData = yearsIdx[year]
      const yearIdxField = R.endsWith('fem', field) ? yearIdxData + 1
        : R.endsWith('male', field) ? yearIdxData + 2
          : yearIdxData

      const fieldIdxData = fieldsIdx[field]

      resultRow[field] = R.path([fieldIdxData, yearIdxField], result)
    })

    return resultRow
  }
}

const instance = new EmploymentInForestryAndLoggingExporter()

module.exports = instance
