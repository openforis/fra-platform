import * as R from 'ramda'
import { DataTableService } from '@server/service'
import { totalSum } from '../../../../common/aggregate'

import CsvOutput from '../csvOutput'

export const fields = ['product', 'name', 'key_species', 'quantity', 'unit', 'value', 'nwfp_category']

export const getCountryData = async (country: any) => {
  const result = []
  const data = await DataTableService.read({
    countryIso: country.countryIso,
    tableSpecName: 'nonWoodForestProductsRemovals',
  })

  // @ts-ignore
  const getColValue = (row: any, col: any) => R.pipe(R.defaultTo([]), R.prop(row), R.defaultTo([]), R.prop(col))(data)

  const normalizeColValue = R.pipe(
    getColValue,
    R.defaultTo(''),
    // R.replace(/\n\r/g, ' '),
    R.replace(/"/g, "'"),
    R.split(/\r\n|\r|\n/g),
    R.join(' ')
  )

  const colFields = fields.slice(1)
  for (let i = 0; i < 10; i++) {
    const row = {
      ...country,
      product: `#${i + 1}`,
      ...colFields.reduce((acc: { [key: string]: any }, col, colIdx) => {
        acc[col] = normalizeColValue(i, colIdx)
        return acc
      }, {}),
    }
    result.push(row)
  }

  result.push({
    ...country,
    product: 'All other plant products',
    name: '',
    key_species: '',
    quantity: '',
    unit: '',
    value: normalizeColValue(10, 4),
    nwfp_category: '',
  })

  result.push({
    ...country,
    product: 'All other animal products',
    name: '',
    key_species: '',
    quantity: '',
    unit: '',
    value: normalizeColValue(10, 4),
    nwfp_category: '',
  })

  result.push({
    ...country,
    product: 'Total',
    name: '',
    key_species: '',
    quantity: '',
    unit: '',
    value: data ? totalSum(data, 4, R.range(0, 12)) : null,
    nwfp_category: '',
  })

  return result
}

export const getCsvOutput = () => {
  return new CsvOutput('NWFP_and_GSComp/7c_nonWoodForestProductsRemovals', fields)
}

export default {
  getCountryData,
  getCsvOutput,
}
