const R = require('ramda')

const { sub } = require('../../../../../common/bignumberUtils')
const { getForestAreaForYear } = require('../../../../../common/extentOfForestHelper')

const TraditionalTableExporter = require('../traditionalTableExporter')

class HolderOfManagementRightsExporter extends TraditionalTableExporter {

  constructor () {
    super(
      'holderOfManagementRights',
      [
        'pub_admin', 'individuals', 'bus_inst', 'indigenous', 'unknown'
      ],
      '4b'
    )
  }

  parseResultRow (result, yearIdx, year, forestOwnership) {
    const resultRow = {}

    this.fields.forEach((field, fieldIdx) => {
      const value = R.path([fieldIdx, yearIdx], result)
      resultRow[field] = value
    })

    const unknownValue = R.reduce(
      (value, row) => {

        const rowValue = R.pipe(
          R.path([row, yearIdx]),
          R.defaultTo(0)
        )(result)

        return sub(value, rowValue)
      },
      R.path([4, yearIdx], forestOwnership),
      [0, 1, 2, 3]
    )

    resultRow['unknown'] = (year < 2020) ? unknownValue : null

    return resultRow
  }
}

const instance = new HolderOfManagementRightsExporter()

module.exports = instance
