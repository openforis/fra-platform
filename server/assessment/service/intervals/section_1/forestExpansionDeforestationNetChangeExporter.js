const TraditionalTableExporter = require('../../exporter/traditionalTableExporter')

class ForestExpansionDeforestationNetChangeExporter extends TraditionalTableExporter {

  constructor () {
    super(
      'forestAreaChange',
      ['expansion', 'afforestation', 'nat_exp', 'deforestation'],
      '1c'
    )
  }
}

const instance = new ForestExpansionDeforestationNetChangeExporter()

module.exports = instance
