import * as R from 'ramda'

import { DataTableService } from '@server/service'

import DataTableExporter from '../../exporter/dataTableExporter'

const yearsIdx: { [key: string]: number } = {
  '1990': 0,
  '2000': 1,
  '2010': 2,
  '2015': 3,
  '2020': 8,
}

class CarbonStockExporter extends DataTableExporter {
  constructor() {
    super(
      'carbonStock',
      ['carbon_agb', 'carbon_bgb', 'carbon_dw', 'carbon_litter', 'carbon_soil', 'soil_depth_cm'],
      '2d'
    )
  }

  fetchData(countryIso: any) {
    return Promise.all([
      DataTableService.read(countryIso, this.tableName),
      DataTableService.read(countryIso, 'carbonStockSoilDepth'),
    ])
  }

  parseResultRow([result, carbonStockSoilDepth]: any[], _yearIdx: any, year: any) {
    const resultRow: { [key: string]: any } = {}

    this.fields.forEach((field: any, fieldIdx: any) => {
      if (field !== 'soil_depth_cm') {
        const yearIdxTable = yearsIdx[year.toString()]
        resultRow[field] = R.path([fieldIdx, yearIdxTable], result)
      }
    })

    resultRow.soil_depth_cm = R.path([0, 0], carbonStockSoilDepth)

    return resultRow
  }
}

const instance = new CarbonStockExporter()

export default instance
