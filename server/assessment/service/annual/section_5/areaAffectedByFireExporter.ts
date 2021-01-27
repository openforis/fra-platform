// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Traditiona... Remove this comment to see the full error message
const TraditionalTableExporter = require('../../exporter/traditionalTableExporter')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'AreaAffect... Remove this comment to see the full error message
class AreaAffectedByFireExporter extends TraditionalTableExporter {
  constructor() {
    super('areaAffectedByFire', ['fire_land', 'fire_forest'], '5b')
  }
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'instance'.
const instance = new AreaAffectedByFireExporter()

module.exports = instance
