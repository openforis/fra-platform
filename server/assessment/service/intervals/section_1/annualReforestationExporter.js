const TraditionalTableExporter = require('../../exporter/traditionalTableExporter')

class AnnualReforestationExporter extends TraditionalTableExporter {
  constructor() {
    super('annualReforestation', ['reforestation'], '1e')
  }
}

const instance = new AnnualReforestationExporter()

module.exports = instance
