// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Traditiona... Remove this comment to see the full error message
const TraditionalTableExporter = require('../../exporter/traditionalTableExporter')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'AnnualRefo... Remove this comment to see the full error message
class AnnualReforestationExporter extends TraditionalTableExporter {
  constructor() {
    super('annualReforestation', ['reforestation'], '1e')
  }
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'instance'.
const instance = new AnnualReforestationExporter()

module.exports = instance
