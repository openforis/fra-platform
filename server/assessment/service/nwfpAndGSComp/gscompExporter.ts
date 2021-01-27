// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'totalSum'.
const { totalSum } = require('../../../../common/aggregate')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Traditiona... Remove this comment to see the full error message
const TraditionalTableService = require('../../../traditionalTable/traditionalTableRepository')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'CsvOutput'... Remove this comment to see the full error message
const CsvOutput = require('../csvOutput')

const years = ['1990', '2000', '2010', '2015', '2020']

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fields'.
const fields = ['FRA_categories', 'scientific_name', 'common_name', ...years]

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getCountry... Remove this comment to see the full error message
const getCountryData = async (country: any) => {
  const result = []
  const data = await TraditionalTableService.read(country.countryIso, 'growingStockComposition')

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
    FRA_categories: 'Remaining native tree species',
    scientific_name: '',
    common_name: '',
    ...years.reduce((acc, year, idx) => {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      acc[year] = normalizeColValue(10, idx + 2)
      return acc
    }, {}),
  })

  result.push({
    ...country,
    FRA_categories: 'Total volume of native tree species',
    scientific_name: '',
    common_name: '',
    ...years.reduce((acc, year, idx) => {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      acc[year] = data ? totalSum(data, idx + 2, R.range(0, 11)) : null
      return acc
    }, {}),
  })

  // Introduced tree species
  for (let i = 13; i < 18; i++) {
    const row = {
      ...country,
      FRA_categories: `#${i - 12} Ranked in terms of volume - Introduced`,
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
    FRA_categories: 'Remaining introduced tree species\t',
    scientific_name: '',
    common_name: '',
    ...years.reduce((acc, year, idx) => {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      acc[year] = normalizeColValue(18, idx + 2)
      return acc
    }, {}),
  })

  result.push({
    ...country,
    FRA_categories: 'Total volume of introduced tree species',
    scientific_name: '',
    common_name: '',
    ...years.reduce((acc, year, idx) => {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
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
    ...years.reduce((acc, year, idx) => {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      acc[year] = data ? totalSum(data, idx + 2, [...R.range(0, 11), ...R.range(13, 19)]) : null
      return acc
    }, {}),
  })

  return result
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getCsvOutp... Remove this comment to see the full error message
const getCsvOutput = () => {
  return new CsvOutput('NWFP_and_GSComp/2b_growingStockComposition', fields)
}

module.exports = {
  getCountryData,
  getCsvOutput,
}
