import * as R from 'ramda'

import DataTableExporter from '../../exporter/dataTableExporter'

class PoliciesLegislationNationalPlatformExporter extends DataTableExporter {
  constructor() {
    super(
      'forestPolicy',
      [
        'policies_national',
        'policies_sub_national',
        'legislation_national',
        'legislation_sub_national',
        'platform_national',
        'platform_sub_national',
        'traceability_national',
        'traceability_sub_national',
      ],
      '6a'
    )
  }

  parseResultRow(result: any, _yearIdx: any) {
    const resultRow: { [key: string]: any } = {}

    resultRow.policies_national = R.path([0, 0], result)
    resultRow.policies_sub_national = R.path([0, 1], result)

    resultRow.legislation_national = R.path([1, 0], result)
    resultRow.legislation_sub_national = R.path([1, 1], result)

    resultRow.platform_national = R.path([2, 0], result)
    resultRow.platform_sub_national = R.path([2, 1], result)

    resultRow.traceability_national = R.path([3, 0], result)
    resultRow.traceability_sub_national = R.path([3, 1], result)

    return resultRow
  }
}

const instance = new PoliciesLegislationNationalPlatformExporter()

export default instance
