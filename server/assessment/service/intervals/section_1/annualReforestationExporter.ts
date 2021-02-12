import TraditionalTableExporter from '../../exporter/traditionalTableExporter'

class AnnualReforestationExporter extends TraditionalTableExporter {
  constructor() {
    super('annualReforestation', ['reforestation'], '1e')
  }
}

const instance = new AnnualReforestationExporter()

export default instance
