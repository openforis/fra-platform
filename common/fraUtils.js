const R = require('ramda')
const FRA = require('./assessment/fra')

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

// ====== Table with odp methods

const filterFraYears = R.filter(d => R.includes(Number(d.year), FRA.years))

const getOdps = R.pipe(R.defaultTo([]), R.filter(R.propEq('type', 'odp')))

const hasOdps = R.pipe(getOdps, R.isEmpty, R.not)

const isTableWithOdpEmpty = R.pipe(
  R.defaultTo([]),
  R.map(R.omit(['year', 'name', 'type'])),
  R.map(R.values),
  isTableEmpty
)

const updateTableWithOdpDatum = datum => data => {
  const { name } = datum
  const idx = R.findIndex(v => v.name === name && v.type === 'fra', data)
  return R.update(idx, datum, data)
}

module.exports = {
  /**
   * @deprecated
   */
  fraYears,
  /**
   * @deprecated
   */
  hasData,

  // Table
  isTableEmpty,

  // Table with odp
  filterFraYears,
  getOdps,
  hasOdps,
  isTableWithOdpEmpty,
  updateTableWithOdpDatum,
}
