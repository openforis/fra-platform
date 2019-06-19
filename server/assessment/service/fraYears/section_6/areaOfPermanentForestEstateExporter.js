const R = require('ramda')

const TraditionalTableExporter = require('../../exporter/traditionalTableExporter')

class AreaOfPermanentForestEstateExporter extends TraditionalTableExporter {

  constructor () {
    super(
      'areaOfPermanentForestEstate',
      ['pfe_y_n', 'pfe_area'],
      '6b'
    )
  }

  parseResultRow (result, yearIdx) {
    const resultRow = {}

    resultRow['pfe_y_n'] = R.path([0, 0], result)
    resultRow['pfe_area'] = R.path([0, yearIdx + 1], result)

    return resultRow
  }
}

const instance = new AreaOfPermanentForestEstateExporter()

module.exports = instance
