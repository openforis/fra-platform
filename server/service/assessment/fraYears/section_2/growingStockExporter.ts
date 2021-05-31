import * as R from 'ramda'

import * as GrowingStockService from '../../../growingStock/growingStockService'

import FraTableExporter from '../../exporter/fraTableExporter'

class GrowingStockExporter extends FraTableExporter {
  constructor() {
    super(
      'growingStock',
      [
        'gs_ha_nat_reg',
        'gs_ha_planted',
        'gs_ha_plantation',
        'gs_ha_other_planted',
        'gs_ha_forest',
        'gs_ha_owl',
        'gs_tot_nat_reg',
        'gs_tot_planted',
        'gs_tot_plantation',
        'gs_tot_other_planted',
        'gs_tot_forest',
        'gs_tot_owl',
      ],
      '2a'
    )
  }

  fetchData(countryIso: any) {
    return GrowingStockService.getGrowingStock(countryIso)
  }

  parseResultRow(result: any, yearIdx: any, year: any) {
    const { avgTable, totalTable } = result

    return {
      gs_ha_nat_reg: R.path([year, 'naturallyRegeneratingForest'], avgTable),
      gs_ha_planted: R.path([year, 'plantedForest'], avgTable),
      gs_ha_plantation: R.path([year, 'plantationForest'], avgTable),
      gs_ha_other_planted: R.path([year, 'otherPlantedForest'], avgTable),
      gs_ha_forest: R.path([year, 'forest'], avgTable),
      gs_ha_owl: R.path([year, 'otherWoodedLand'], avgTable),

      gs_tot_nat_reg: R.path([year, 'naturallyRegeneratingForest'], totalTable),
      gs_tot_planted: R.path([year, 'plantedForest'], totalTable),
      gs_tot_plantation: R.path([year, 'plantationForest'], totalTable),
      gs_tot_other_planted: R.path([year, 'otherPlantedForest'], totalTable),
      gs_tot_forest: R.path([year, 'forest'], totalTable),
      gs_tot_owl: R.path([year, 'otherWoodedLand'], totalTable),
    }
  }
}

const instance = new GrowingStockExporter()

export default instance
