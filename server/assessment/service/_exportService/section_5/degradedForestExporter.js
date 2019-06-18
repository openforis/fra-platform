const TraditionalTableExporter = require('../traditionalTableExporter')

class DegradedForestExporter extends TraditionalTableExporter {

  constructor () {
    super(
      'degradedForest',
      ['y/n'],
      '5c'
    )
  }
}

const instance = new DegradedForestExporter()

module.exports = instance
