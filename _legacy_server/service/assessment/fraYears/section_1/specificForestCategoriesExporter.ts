import DataTableExporter from '../../exporter/dataTableExporter'

class SpecificForestCategoriesExporter extends DataTableExporter {
  constructor() {
    super('specificForestCategories', ['primary', 'tempUnstocked', 'bamboos', 'mangroves', 'rubber'], '1c')
  }
}

const instance = new SpecificForestCategoriesExporter()

export default instance
