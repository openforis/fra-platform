const R = require('ramda')

const { sub } = require('../../../../../common/bignumberUtils')
const { getForestAreaForYear } = require('../../../../../common/extentOfForestHelper')

const TraditionalTableExporter = require('../../exporter/traditionalTableExporter')

class ForestOwnershipExporter extends TraditionalTableExporter {

  constructor () {
    super(
      'forestOwnership',
      [
        'priv_own', 'individ', 'bus_inst', 'indigenous', 'pub_own', 'fo_unknown'
      ],
      '4a'
    )
  }

  parseResultRow (result, yearIdx, year, extentOfForest) {
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
      getForestAreaForYear(extentOfForest, year),
      [0, 4]
    )

    resultRow['fo_unknown'] = (year < 2020) ? unknownValue : null

    return resultRow
  }
}

const instance = new ForestOwnershipExporter()

module.exports = instance
