// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Traditiona... Remove this comment to see the full error message
const TraditionalTableExporter = require('../../exporter/traditionalTableExporter')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'ForestExpa... Remove this comment to see the full error message
class ForestExpansionDeforestationNetChangeExporter extends TraditionalTableExporter {
  constructor() {
    super('forestAreaChange', ['expansion', 'afforestation', 'nat_exp', 'deforestation'], '1d')
  }
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'instance'.
const instance = new ForestExpansionDeforestationNetChangeExporter()

module.exports = instance
