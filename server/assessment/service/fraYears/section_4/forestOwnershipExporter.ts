import * as R from 'ramda'

import { sub } from '../../../../../common/bignumberUtils'
import { getForestAreaForYear } from '../../../../../common/extentOfForestHelper'

import TraditionalTableExporter from '../../exporter/traditionalTableExporter'

class ForestOwnershipExporter extends TraditionalTableExporter {
  constructor() {
    super('forestOwnership', ['priv_own', 'individ', 'bus_inst_fo', 'indigenous_fo', 'pub_own', 'fo_unknown'], '4a')
  }

  parseResultRow(result: any, yearIdx: any, year: any, extentOfForest: any) {
    const resultRow: { [key: string]: any } = {}

    this.fields.forEach((field: any, fieldIdx: any) => {
      const value = R.path([fieldIdx, yearIdx], result)
      resultRow[field] = value
    })

    const unknownValue = R.reduce(
      (value: any, row: any) => {
        const rowValue = R.pipe(R.path([row, yearIdx]), R.defaultTo(0))(result)

        // @ts-ignore
        return sub(value, rowValue)
      },
      getForestAreaForYear(extentOfForest, year),
      [0, 4]
    )

    resultRow.fo_unknown = year < 2020 ? unknownValue : null

    return resultRow
  }
}

const instance = new ForestOwnershipExporter()

export default instance
