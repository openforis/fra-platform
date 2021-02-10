import TraditionalTableExporter from '../../exporter/traditionalTableExporter'

class ForestExpansionDeforestationNetChangeExporter extends TraditionalTableExporter {
  constructor() {
    super('forestAreaChange', ['expansion', 'afforestation', 'nat_exp', 'deforestation'], '1d')
  }
}

const instance = new ForestExpansionDeforestationNetChangeExporter()

export default instance
