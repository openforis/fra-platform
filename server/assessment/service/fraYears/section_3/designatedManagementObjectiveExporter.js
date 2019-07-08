const R = require('ramda')
const Promise = require('bluebird')

const TraditionalTableService = require('../../../../traditionalTable/traditionalTableRepository')

const TraditionalTableExporter = require('../../exporter/traditionalTableExporter')

const { sub } = require('../../../../../common/bignumberUtils')
const { getForestAreaForYear } = require('../../../../../common/extentOfForestHelper')

const fieldsPrimary = [
  'prim_prod', 'prim_prot', 'prim_biodiv', 'prim_socserv', 'prim_multi', 'prim_other', 'prim_no_unknown'
]
const fieldsTotalArea = [
  'tot_prod', 'tot_prot', 'tot_biodiv', 'tot_socserv', 'tot_other'
]

class DesignatedManagementObjectiveExporter extends TraditionalTableExporter {

  constructor () {

    super(
      'primaryDesignatedManagementObjective',
      [
        ...fieldsPrimary,
        ...fieldsTotalArea
      ],
      '3a'
    )
  }

  fetchData (countryIso) {
    return Promise.all([
      TraditionalTableService.read(countryIso, this.tableName),
      TraditionalTableService.read(countryIso, 'totalAreaWithDesignatedManagementObjective'),
    ])
  }

  parseResultRow ([primary, totalArea], yearIdx, year, extentOfForest) {
    const resultRow = {}

    fieldsPrimary.forEach((field, fieldIdx) => {
      resultRow[field] = R.path([fieldIdx, yearIdx], primary)
    })

    const unknownValue = R.reduce(
      (value, row) => {

        const rowValue = R.pipe(
          R.path([row, yearIdx]),
          R.defaultTo(0)
        )(primary)

        return sub(value, rowValue)
      },
      getForestAreaForYear(extentOfForest, year),
      R.range(0, 6)
    )

    resultRow['prim_no_unknown'] = unknownValue

    fieldsTotalArea.forEach((field, fieldIdx) => {
      resultRow[field] = R.path([fieldIdx, yearIdx], totalArea)
    })

    return resultRow
  }

}

const instance = new DesignatedManagementObjectiveExporter()

module.exports = instance
