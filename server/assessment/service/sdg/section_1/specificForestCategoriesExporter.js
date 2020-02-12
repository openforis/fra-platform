const R = require('ramda')

const TraditionalTableExporter = require('../../exporter/traditionalTableExporter')

class SpecificForestCategoriesExporter extends TraditionalTableExporter {

  constructor () {
    super(
      'specificForestCategories',
      ['mangroves'],
      '1e'
    )
  }

  parseResultRow (result, yearIdx) {
    const resultRow = {
      mangroves: R.path([1, yearIdx], result)
    }

    return resultRow
  }
}

const instance = new SpecificForestCategoriesExporter()

module.exports = instance
