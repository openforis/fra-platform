import * as R from 'ramda'

import { DataTableService } from '@server/controller'

import DataTableExporter from '../../exporter/dataTableExporter'

const yearsIdx: { [key: string]: number } = {
  '1990': 0,
  '2000': 1,
  '2010': 2,
  '2015': 3,
  '2016': 4,
  '2017': 5,
  '2018': 6,
  '2019': 7,
  '2020': 8,
}

class CarbonStockExporter extends DataTableExporter {
  constructor() {
    super('carbonStock', ['carbon_agb', 'carbon_bgb', 'carbon_dw', 'carbon_litter', 'carbon_soil'], '2d')
  }

  fetchData(countryIso: any) {
    return Promise.all([
      DataTableService.read({ countryIso, tableSpecName: this.tableName }),
      DataTableService.read({ countryIso, tableSpecName: 'carbonStockSoilDepth' }),
    ])
  }

  parseResultRow([result, _]: any[], _yearIdx: any, year: any) {
    const resultRow: { [key: string]: any } = {}

    this.fields.forEach((field: any, fieldIdx: any) => {
      const yearIdxTable = yearsIdx[year.toString()]
      resultRow[field] = R.path([fieldIdx, yearIdxTable], result)
    })

    return resultRow
  }
}

const instance = new CarbonStockExporter()

export default instance
