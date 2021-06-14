import DataTableExporter from '../../exporter/dataTableExporter'

class ForestExpansionDeforestationNetChangeExporter extends DataTableExporter {
  constructor() {
    super('forestAreaChange', ['expansion', 'afforestation', 'nat_exp', 'deforestation'], '1d')
  }
}

const instance = new ForestExpansionDeforestationNetChangeExporter()

export default instance
