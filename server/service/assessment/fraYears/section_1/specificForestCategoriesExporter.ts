import TraditionalTableExporter from '../../exporter/traditionalTableExporter'

class SpecificForestCategoriesExporter extends TraditionalTableExporter {
  constructor() {
    super('specificForestCategories', ['primary', 'tempUnstocked', 'bamboos', 'mangroves', 'rubber'], '1c')
  }
}

const instance = new SpecificForestCategoriesExporter()

export default instance
