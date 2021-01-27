// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Promise'.
const Promise = require('bluebird')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Traditiona... Remove this comment to see the full error message
const TraditionalTableService = require('../../../../traditionalTable/traditionalTableRepository')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Traditiona... Remove this comment to see the full error message
const TraditionalTableExporter = require('../../exporter/traditionalTableExporter')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'yearsIdx'.
const yearsIdx = {
  '1990': 0,
  '2000': 1,
  '2010': 2,
  '2015': 3,
  '2020': 8,
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'CarbonStoc... Remove this comment to see the full error message
class CarbonStockExporter extends TraditionalTableExporter {
  constructor() {
    super(
      'carbonStock',
      ['carbon_agb', 'carbon_bgb', 'carbon_dw', 'carbon_litter', 'carbon_soil', 'soil_depth_cm'],
      '2d'
    )
  }

  fetchData(countryIso: any) {
    return Promise.all([
      TraditionalTableService.read(countryIso, this.tableName),
      TraditionalTableService.read(countryIso, 'carbonStockSoilDepth'),
    ])
  }

  // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'result' implicitly has an 'any' t... Remove this comment to see the full error message
  parseResultRow([result, carbonStockSoilDepth], yearIdx: any, year: any) {
    const resultRow = {}

    this.fields.forEach((field: any, fieldIdx: any) => {
      if (field !== 'soil_depth_cm') {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const yearIdxTable = yearsIdx[year.toString()]
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        resultRow[field] = R.path([fieldIdx, yearIdxTable], result)
      }
    })

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'soil_depth_cm' does not exist on type '{... Remove this comment to see the full error message
    resultRow.soil_depth_cm = R.path([0, 0], carbonStockSoilDepth)

    return resultRow
  }
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'instance'.
const instance = new CarbonStockExporter()

module.exports = instance
