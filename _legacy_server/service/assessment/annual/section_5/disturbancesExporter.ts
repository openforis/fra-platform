import DataTableExporter from '../../exporter/dataTableExporter'

class DisturbancesExporter extends DataTableExporter {
  constructor() {
    super('disturbances', ['insect', 'diseases', 'weather', 'other'], '5a')
  }
}

const instance = new DisturbancesExporter()

export default instance
