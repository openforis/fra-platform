const TraditionalTableExporter = require('../../exporter/traditionalTableExporter')

class AnnualReforestationExporter extends TraditionalTableExporter {

  constructor () {
    super(
      'annualReforestation',
      ['reforestation'],
      '1d'
    )
  }
}

const instance = new AnnualReforestationExporter()

module.exports = instance
