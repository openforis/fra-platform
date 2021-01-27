const R = require('ramda')

const TraditionalTableExporter = require('../../exporter/traditionalTableExporter')

class SpecificForestCategoriesExporter extends TraditionalTableExporter {
  constructor() {
    super('specificForestCategories', ['mangroves'], '1c')
  }

  parseResultRow(result, yearIdx) {
    const resultRow = {
      mangroves: R.path([3, yearIdx], result),
    }

    return resultRow
  }
}

const instance = new SpecificForestCategoriesExporter()

module.exports = instance
