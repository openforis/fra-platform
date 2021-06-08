import * as R from 'ramda'

import TraditionalTableExporter from '../../exporter/traditionalTableExporter'

class SpecificForestCategoriesExporter extends TraditionalTableExporter {
  constructor() {
    super('specificForestCategories', ['mangroves'], '1c')
  }

  parseResultRow(result: any, yearIdx: any) {
    const resultRow = {
      mangroves: R.path([3, yearIdx], result),
    }

    return resultRow
  }
}

const instance = new SpecificForestCategoriesExporter()

export default instance
