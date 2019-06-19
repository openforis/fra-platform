const R = require('ramda')
const Promise = require('bluebird')

const TraditionalTableService = require('../../../../traditionalTable/traditionalTableRepository')

const TraditionalTableExporter = require('../../exporter/traditionalTableExporter')

const fieldsPrimary = [
  'prim_prod', 'prim_prot', 'prim_biodiv', 'prim_socserv', 'prim_multi', 'prim_other'
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

  parseResultRow ([primary, totalArea], yearIdx, year) {
    const resultRow = {}

    fieldsPrimary.forEach((field, fieldIdx) => {
      resultRow[field] = R.path([fieldIdx, yearIdx], primary)
    })

    fieldsTotalArea.forEach((field, fieldIdx) => {
      resultRow[field] = R.path([fieldIdx, yearIdx], totalArea)
    })

    return resultRow
  }

}

const instance = new DesignatedManagementObjectiveExporter()

module.exports = instance
