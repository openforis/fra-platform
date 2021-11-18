import DataTableExporter from '../../exporter/dataTableExporter'

class AnnualReforestationExporter extends DataTableExporter {
  constructor() {
    super('annualReforestation', ['reforestation'], '1e')
  }
}

const instance = new AnnualReforestationExporter()

export default instance
