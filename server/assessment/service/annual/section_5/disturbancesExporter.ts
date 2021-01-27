const TraditionalTableExporter = require('../../exporter/traditionalTableExporter')

class DisturbancesExporter extends TraditionalTableExporter {

  constructor () {
    super(
      'disturbances',
      ['insect', 'diseases', 'weather', 'other'],
      '5a'
    )
  }
}

const instance = new DisturbancesExporter()

module.exports = instance
