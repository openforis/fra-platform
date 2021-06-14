import * as R from 'ramda'

import DataTableExporter from '../../exporter/dataTableExporter'

class SpecificForestCategoriesExporter extends DataTableExporter {
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
