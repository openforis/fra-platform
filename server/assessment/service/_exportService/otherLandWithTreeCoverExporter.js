
const TraditionalTableExporter = require('./traditionalTableExporter')

class OtherLandWithTreeCoverExporter extends TraditionalTableExporter {

  constructor () {
    super(
      'otherLandWithTreeCover',
      ['palms', 'treeOrchards', 'agroforestry', 'treesUrbanSettings', 'other']
    )
  }
}

const instance = new OtherLandWithTreeCoverExporter()

module.exports = instance
