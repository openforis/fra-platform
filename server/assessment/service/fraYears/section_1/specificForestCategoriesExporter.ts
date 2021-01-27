// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Traditiona... Remove this comment to see the full error message
const TraditionalTableExporter = require('../../exporter/traditionalTableExporter')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'SpecificFo... Remove this comment to see the full error message
class SpecificForestCategoriesExporter extends TraditionalTableExporter {
  constructor() {
    super('specificForestCategories', ['primary', 'tempUnstocked', 'bamboos', 'mangroves', 'rubber'], '1c')
  }
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'instance'.
const instance = new SpecificForestCategoriesExporter()

module.exports = instance
