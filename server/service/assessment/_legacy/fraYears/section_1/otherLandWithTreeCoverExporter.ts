import DataTableExporter from '../../exporter/dataTableExporter'

class OtherLandWithTreeCoverExporter extends DataTableExporter {
  constructor() {
    super('otherLandWithTreeCover', ['palms', 'treeOrchards', 'agroforestry', 'treesUrbanSettings', 'other'], '1f')
  }
}

const instance = new OtherLandWithTreeCoverExporter()

export default instance
