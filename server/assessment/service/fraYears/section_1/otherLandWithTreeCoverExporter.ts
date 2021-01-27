// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Traditiona... Remove this comment to see the full error message
const TraditionalTableExporter = require('../../exporter/traditionalTableExporter')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'OtherLandW... Remove this comment to see the full error message
class OtherLandWithTreeCoverExporter extends TraditionalTableExporter {
  constructor() {
    super('otherLandWithTreeCover', ['palms', 'treeOrchards', 'agroforestry', 'treesUrbanSettings', 'other'], '1f')
  }
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'instance'.
const instance = new OtherLandWithTreeCoverExporter()

module.exports = instance
