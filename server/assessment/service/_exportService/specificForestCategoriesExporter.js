const TraditionalTableExporter = require('./traditionalTableExporter')

class SpecificForestCategoriesExporter extends TraditionalTableExporter {

  constructor () {
    super(
      'specificForestCategories',
      ['bamboos', 'mangroves', 'tempUnstocked', 'primary', 'rubber']
    )
  }
}

const instance = new SpecificForestCategoriesExporter()

module.exports = instance
