// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'totalSum'.
const { totalSum } = require('../../../../common/aggregate')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Traditiona... Remove this comment to see the full error message
const TraditionalTableService = require('../../../traditionalTable/traditionalTableRepository')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'CsvOutput'... Remove this comment to see the full error message
const CsvOutput = require('../csvOutput')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fields'.
const fields = ['product', 'name', 'key_species', 'quantity', 'unit', 'value', 'nwfp_category']

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getCountry... Remove this comment to see the full error message
const getCountryData = async (country: any) => {
  const result = []
  const data = await TraditionalTableService.read(country.countryIso, 'nonWoodForestProductsRemovals')

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
      ...colFields.reduce((acc, col, colIdx) => {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
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

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getCsvOutp... Remove this comment to see the full error message
const getCsvOutput = () => {
  return new CsvOutput('NWFP_and_GSComp/7c_nonWoodForestProductsRemovals', fields)
}

module.exports = {
  getCountryData,
  getCsvOutput,
}
