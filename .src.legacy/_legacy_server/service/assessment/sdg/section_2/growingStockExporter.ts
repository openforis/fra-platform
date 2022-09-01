import * as R from 'ramda'

import * as GrowingStockService from '../../../growingStock/growingStockService'

import FraTableExporter from '../../exporter/fraTableExporter'

class GrowingStockExporter extends FraTableExporter {
  constructor() {
    super('growingStock', ['gs_ha_nat_reg', 'gs_ha_planted', 'gs_ha_forest'], '2a')
  }

  fetchData(countryIso: any) {
    return GrowingStockService.getGrowingStock(countryIso)
  }

  parseResultRow(result: any, _yearIdx: any, year: any) {
    const { avgTable } = result

    return {
      gs_ha_nat_reg: R.path([year, 'naturallyRegeneratingForest'], avgTable),
      gs_ha_planted: R.path([year, 'plantedForest'], avgTable),
      gs_ha_forest: R.path([year, 'forest'], avgTable),
    }
  }
}

const instance = new GrowingStockExporter()

export default instance
