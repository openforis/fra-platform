import TraditionalTableExporter from '../../exporter/traditionalTableExporter'

class AreaAffectedByFireExporter extends TraditionalTableExporter {
  constructor() {
    super('areaAffectedByFire', ['fire_land', 'fire_forest'], '5b')
  }
}

const instance = new AreaAffectedByFireExporter()

export default instance
