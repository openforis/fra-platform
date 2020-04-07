const R = require('ramda')
const FRA = require('./assessment/fra')
const NumberUtils = require('./bignumberUtils')

/**
 * @deprecated
 */
const fraYears = [1990, 2000, 2010, 2015, 2016, 2017, 2018, 2019, 2020]

/**
 * @deprecated
 */
const hasData = R.pipe(R.reject(R.all(R.or(R.isNil, R.isEmpty))), R.isEmpty, R.not)

// ====== Table  methods

const isTableEmpty = R.pipe(R.defaultTo([]), R.flatten, R.reject(R.isNil), R.isEmpty)

const sumTableColumn = (columnIndex, rowIndexes) => (data) =>
  R.pipe(
    R.map((rowIdx) => R.pathOr(null, [rowIdx, columnIndex])(data)),
    R.reject(R.isNil),
    NumberUtils.sum
  )(rowIndexes)

// ====== Table with odp methods

const filterFraYears = R.filter((d) => R.includes(Number(d.year), FRA.years))

const getOdps = R.pipe(R.defaultTo([]), R.filter(R.propEq('type', 'odp')))

const hasOdps = R.pipe(getOdps, R.isEmpty, R.not)

const isTableWithOdpEmpty = R.pipe(
  R.defaultTo([]),
  R.map(R.omit(['year', 'name', 'type'])),
  R.map(R.values),
  isTableEmpty
)

const getDatumByYear = (year) => R.pipe(R.defaultTo([]), R.find(R.propEq('name', String(year))), R.defaultTo({}))

const updateTableWithOdpDatum = (datum) => (data) => {
  const { name } = datum
  const idx = R.findIndex((v) => v.name === name && v.type === 'fra', data)
  return R.update(idx, datum, data)
}

const updateTableWithOdpDatumOdp = (datum) => (data) => {
  const { name } = datum
  const idx = R.findIndex((v) => v.name === name && v.type === 'odp', data)
  if (idx >= 0) {
    return R.update(idx, datum, data)
  } else {
    return R.pipe(
      R.append(datum),
      R.sort((a, b) => Number(a.name) - Number(b.name))
    )(data)
  }
}

module.exports = {
  fraYears,
  hasData,

  // Table
  isTableEmpty,
  sumTableColumn,

  // Table with odp
  filterFraYears,
  getOdps,
  hasOdps,
  isTableWithOdpEmpty,
  getDatumByYear,
  updateTableWithOdpDatum,
  updateTableWithOdpDatumOdp,
}
