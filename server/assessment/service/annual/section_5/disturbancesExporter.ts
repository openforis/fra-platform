// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Traditiona... Remove this comment to see the full error message
const TraditionalTableExporter = require('../../exporter/traditionalTableExporter')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Disturbanc... Remove this comment to see the full error message
class DisturbancesExporter extends TraditionalTableExporter {
  constructor() {
    super('disturbances', ['insect', 'diseases', 'weather', 'other'], '5a')
  }
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'instance'.
const instance = new DisturbancesExporter()

module.exports = instance
