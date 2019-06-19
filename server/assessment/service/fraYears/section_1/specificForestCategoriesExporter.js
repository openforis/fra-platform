const TraditionalTableExporter = require('../../exporter/traditionalTableExporter')

class SpecificForestCategoriesExporter extends TraditionalTableExporter {

  constructor () {
    super(
      'specificForestCategories',
      ['bamboos', 'mangroves', 'tempUnstocked', 'primary', 'rubber'],
      '1e'
    )
  }
}

const instance = new SpecificForestCategoriesExporter()

module.exports = instance
