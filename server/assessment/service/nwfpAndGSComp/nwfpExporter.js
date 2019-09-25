const R = require('ramda')
const { totalSum } = require('../../../../webapp/traditionalTable/aggregate')

const TraditionalTableService = require('../../../traditionalTable/traditionalTableRepository')
const CsvOutput = require('../csvOutput')

const fields = [
  'product',
  'name',
  'key_species',
  'quantity',
  'unit',
  'value',
  'nwfp_category',
]

const getCountryData = async country => {

  const result = []
  const data = await TraditionalTableService.read(country.countryIso, 'nonWoodForestProductsRemovals')

  const getColValue = (row, col) => R.pipe(
    R.defaultTo([]),
    R.prop(row),
    R.defaultTo([]),
    R.prop(col)
  )(data)

  const colFields = fields.slice(1)
  for (let i = 0; i < 10; i++) {
    const row = {
      ...country,
      product: `#${i + 1}`,
      ...colFields.reduce((acc, col, colIdx) => {
        acc[col] = getColValue(i, colIdx)
        return acc
      }, {})
    }
    result.push(row)
  }

  result.push({
    ...country,
    product: 'All other plant products',
    'name': '',
    'key_species': '',
    'quantity': '',
    'unit': '',
    'value': getColValue(10, 4),
    'nwfp_category': '',
  })

  result.push({
    ...country,
    product: 'All other animal products',
    'name': '',
    'key_species': '',
    'quantity': '',
    'unit': '',
    'value': getColValue(10, 4),
    'nwfp_category': '',
  })

  result.push({
    ...country,
    product: 'Total',
    'name': '',
    'key_species': '',
    'quantity': '',
    'unit': '',
    'value': data ? totalSum(data, 4, R.range(0, 12)) : null,
    'nwfp_category': '',
  })

  return result
}

const getCsvOutput = () => {
  return new CsvOutput('NWFP_and_GSComp/7c_nonWoodForestProductsRemovals', fields)
}

module.exports = {
  getCountryData,
  getCsvOutput,
}
