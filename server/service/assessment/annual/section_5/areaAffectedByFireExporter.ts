import DataTableExporter from '../../exporter/dataTableExporter'

class AreaAffectedByFireExporter extends DataTableExporter {
  constructor() {
    super('areaAffectedByFire', ['fire_land', 'fire_forest'], '5b')
  }
}

const instance = new AreaAffectedByFireExporter()

export default instance
