const R = require('ramda')

const GrowingStockService = require('../../../../growingStock/growingStockService')

const FraTableExporter = require('../../exporter/fraTableExporter')

class GrowingStockExporter extends FraTableExporter {

  constructor () {
    super(
      'growingStock',
      [
        'gs_ha_nat_reg', 'gs_ha_planted', 'gs_ha_forest',
      ],
      '2a'
    )
  }

  fetchData (countryIso) {
    return GrowingStockService.getGrowingStock(countryIso)
  }

  parseResultRow (result, yearIdx, year) {

    const { avgTable, totalTable } = result

    return ({
      gs_ha_nat_reg: R.path([year, 'naturallyRegeneratingForest'], avgTable),
      gs_ha_planted: R.path([year, 'plantedForest'], avgTable),
      gs_ha_forest: R.path([year, 'forest'], avgTable),
    })
  }

}

const instance = new GrowingStockExporter()

module.exports = instance
