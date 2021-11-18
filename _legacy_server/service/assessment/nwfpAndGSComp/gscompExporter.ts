import * as R from 'ramda'
import { DataTableService } from '@server/service'
import { totalSum } from '../../../../common/aggregate'

import CsvOutput from '../csvOutput'

export const years = ['1990', '2000', '2010', '2015', '2020']

export const fields = ['FRA_categories', 'scientific_name', 'common_name', ...years]

export const getCountryData = async (country: any) => {
  const result = []
  const data = await DataTableService.read({ countryIso: country.countryIso, tableSpecName: 'growingStockComposition' })

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

  // Native tree species
  for (let i = 0; i < 10; i++) {
    const row = {
      ...country,
      FRA_categories: `#${i + 1} Ranked in terms of volume - Native`,
      ...colFields.reduce((acc: { [key: string]: any }, col, colIdx) => {
        acc[col] = normalizeColValue(i, colIdx)
        return acc
      }, {}),
    }
    result.push(row)
  }

  result.push({
    ...country,
    FRA_categories: 'Remaining native tree species',
    scientific_name: '',
    common_name: '',
    ...years.reduce((acc: { [key: string]: any }, year, idx) => {
      acc[year] = normalizeColValue(10, idx + 2)
      return acc
    }, {}),
  })

  result.push({
    ...country,
    FRA_categories: 'Total volume of native tree species',
    scientific_name: '',
    common_name: '',
    ...years.reduce((acc: { [key: string]: any }, year, idx) => {
      acc[year] = data ? totalSum(data, idx + 2, R.range(0, 11)) : null
      return acc
    }, {}),
  })

  // Introduced tree species
  for (let i = 13; i < 18; i++) {
    const row = {
      ...country,
      FRA_categories: `#${i - 12} Ranked in terms of volume - Introduced`,
      ...colFields.reduce((acc: { [key: string]: any }, col, colIdx) => {
        acc[col] = normalizeColValue(i, colIdx)
        return acc
      }, {}),
    }
    result.push(row)
  }

  result.push({
    ...country,
    FRA_categories: 'Remaining introduced tree species\t',
    scientific_name: '',
    common_name: '',
    ...years.reduce((acc: { [key: string]: any }, year, idx) => {
      acc[year] = normalizeColValue(18, idx + 2)
      return acc
    }, {}),
  })

  result.push({
    ...country,
    FRA_categories: 'Total volume of introduced tree species',
    scientific_name: '',
    common_name: '',
    ...years.reduce((acc: { [key: string]: any }, year, idx) => {
      acc[year] = data ? totalSum(data, idx + 2, R.range(13, 19)) : null
      return acc
    }, {}),
  })

  // Total growing stock
  result.push({
    ...country,
    FRA_categories: 'Total growing stock',
    scientific_name: '',
    common_name: '',
    ...years.reduce((acc: { [key: string]: any }, year, idx) => {
      acc[year] = data ? totalSum(data, idx + 2, [...R.range(0, 11), ...R.range(13, 19)]) : null
      return acc
    }, {}),
  })

  return result
}

export const getCsvOutput = () => {
  return new CsvOutput('NWFP_and_GSComp/2b_growingStockComposition', fields)
}

export default {
  getCountryData,
  getCsvOutput,
}
