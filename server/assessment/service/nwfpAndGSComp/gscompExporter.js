const R = require('ramda')
const { totalSum } = require('../../../../webapp/traditionalTable/aggregate')

const TraditionalTableService = require('../../../traditionalTable/traditionalTableRepository')
const CsvOutput = require('../csvOutput')

const years = ['1990', '2000', '2010', '2015', '2020']

const fields = [
  'FRA_categories',
  'scientific_name',
  'common_name',
  ...years,
]

const getCountryData = async country => {

  const result = []
  const data = await TraditionalTableService.read(country.countryIso, 'growingStockComposition')

  const getColValue = (row, col) => R.pipe(
    R.defaultTo([]),
    R.prop(row),
    R.defaultTo([]),
    R.prop(col)
  )(data)

  const colFields = fields.slice(1)

  //Native tree species
  for (let i = 0; i < 10; i++) {
    const row = {
      ...country,
      FRA_categories: `#${i + 1} Ranked in terms of volume - Native`,
      ...colFields.reduce((acc, col, colIdx) => {
        acc[col] = getColValue(i, colIdx)
        return acc
      }, {})
    }
    result.push(row)
  }

  result.push({
    ...country,
    FRA_categories: 'Remaining native tree species',
    'scientific_name': '',
    'common_name': '',
    ...years.reduce((acc, year, idx) => {
      acc[year] = getColValue(10, idx + 2)
      return acc
    }, {})
  })

  result.push({
    ...country,
    FRA_categories: 'Total volume of native tree species',
    'scientific_name': '',
    'common_name': '',
    ...years.reduce((acc, year, idx) => {
      acc[year] = data ? totalSum(data, idx + 2, R.range(0, 11)) : null
      return acc
    }, {})
  })

  //Introduced tree species
  for (let i = 13; i < 18; i++) {
    const row = {
      ...country,
      FRA_categories: `#${i - 12} Ranked in terms of volume - Introduced`,
      ...colFields.reduce((acc, col, colIdx) => {
        acc[col] = getColValue(i, colIdx)
        return acc
      }, {})
    }
    result.push(row)
  }

  result.push({
    ...country,
    FRA_categories: 'Remaining introduced tree species\t',
    'scientific_name': '',
    'common_name': '',
    ...years.reduce((acc, year, idx) => {
      acc[year] = getColValue(18, idx + 2)
      return acc
    }, {})
  })

  result.push({
    ...country,
    FRA_categories: 'Total volume of introduced tree species',
    'scientific_name': '',
    'common_name': '',
    ...years.reduce((acc, year, idx) => {
      acc[year] = data ? totalSum(data, idx + 2, R.range(13, 19)) : null
      return acc
    }, {})
  })

  //Total growing stock
  result.push({
    ...country,
    FRA_categories: 'Total growing stock',
    'scientific_name': '',
    'common_name': '',
    ...years.reduce((acc, year, idx) => {
      acc[year] = data ? totalSum(data, idx + 2, [...R.range(0, 11), ...R.range(13, 19)]) : null
      return acc
    }, {})
  })

  return result
}

const getCsvOutput = () => {
  return new CsvOutput('NWFP_and_GSComp/2b_growingStockComposition', fields)
}

module.exports = {
  getCountryData,
  getCsvOutput,
}
