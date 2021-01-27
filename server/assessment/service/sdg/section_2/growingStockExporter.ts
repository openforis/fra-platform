// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'GrowingSto... Remove this comment to see the full error message
const GrowingStockService = require('../../../../growingStock/growingStockService')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'FraTableEx... Remove this comment to see the full error message
const FraTableExporter = require('../../exporter/fraTableExporter')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'GrowingSto... Remove this comment to see the full error message
class GrowingStockExporter extends FraTableExporter {
  constructor() {
    super('growingStock', ['gs_ha_nat_reg', 'gs_ha_planted', 'gs_ha_forest'], '2a')
  }

  fetchData(countryIso: any) {
    return GrowingStockService.getGrowingStock(countryIso)
  }

  parseResultRow(result: any, yearIdx: any, year: any) {
    const { avgTable } = result

    return {
      gs_ha_nat_reg: R.path([year, 'naturallyRegeneratingForest'], avgTable),
      gs_ha_planted: R.path([year, 'plantedForest'], avgTable),
      gs_ha_forest: R.path([year, 'forest'], avgTable),
    }
  }
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'instance'.
const instance = new GrowingStockExporter()

module.exports = instance
