import * as R from 'ramda'

import DataTableExporter from '../../exporter/dataTableExporter'

class AreaOfPermanentForestEstateExporter extends DataTableExporter {
  constructor() {
    super('areaOfPermanentForestEstate', ['pfe_y_n', 'pfe_area'], '6b')
  }

  parseResultRow(result: any, yearIdx: any) {
    const resultRow: { [key: string]: any } = {}

    resultRow.pfe_y_n = R.path([0, 0], result)
    resultRow.pfe_area = R.path([0, yearIdx + 1], result)

    return resultRow
  }
}

const instance = new AreaOfPermanentForestEstateExporter()

export default instance
