// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'FRA'.
const FRA = require('./assessment/fra')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'NumberUtil... Remove this comment to see the full error message
const NumberUtils = require('./bignumberUtils')

/**
 * @deprecated
 */
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fraYears'.
const fraYears = [1990, 2000, 2010, 2015, 2016, 2017, 2018, 2019, 2020]

/**
 * @deprecated
 */
const hasData = R.pipe(R.reject(R.all(R.or(R.isNil, R.isEmpty))), R.isEmpty, R.not)

// ====== Table  methods

const isTableEmpty = R.pipe(R.defaultTo([]), R.flatten, R.reject(R.isNil), R.isEmpty)

const sumTableColumn = (columnIndex: any, rowIndexes: any) => (data: any) =>
  R.pipe(
    R.map((rowIdx: any) => R.pathOr(null, [rowIdx, columnIndex])(data)),
    R.reject(R.isNil),
    NumberUtils.sum
  )(rowIndexes)

// ====== Table with odp methods

const filterFraYears = R.filter((d: any) => R.includes(Number(d.year), FRA.years))

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getOdps'.
const getOdps = R.pipe(R.defaultTo([]), R.filter(R.propEq('type', 'odp')))

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'hasOdps'.
const hasOdps = R.pipe(getOdps, R.isEmpty, R.not)

const isTableWithOdpEmpty = R.pipe(
  R.defaultTo([]),
  R.map(R.pickBy((val: any, key: any) => !['year', 'name', 'type'].includes(key) && !key.endsWith('Estimated'))),
  R.map(R.values),
  isTableEmpty
)

const getDatumByYear = (year: any) => R.pipe(R.defaultTo([]), R.find(R.propEq('name', String(year))), R.defaultTo({}))

const updateTableWithOdpDatum = (datum: any) => (data: any) => {
  const { name } = datum
  const idx = R.findIndex((v: any) => v.name === name && v.type === 'fra', data)
  return R.update(idx, datum, data)
}

const updateTableWithOdpDatumOdp = (datum: any, dataNoNDPs: any) => (data: any) => {
  const { name, namePrev } = datum
  const dataUpdate = [...data]
  const idx = data.findIndex((d: any) => d.name === name)
  const idxPrev = data.findIndex((d: any) => d.name === namePrev)

  if (idx >= 0) {
    // update old value
    dataUpdate.splice(idx, 1, datum)
    // if year has changed and previously was fraYear
    // previous year datum must be updated with value from data with no Odp
    const wasFraYear = FRA.years.findIndex((y: any) => y === Number(namePrev)) >= 0
    if (name !== namePrev && wasFraYear) {
      const datumNoOdpFraYear = dataNoNDPs.find((d: any) => d.name === namePrev)
      dataUpdate.splice(idxPrev, 1, datumNoOdpFraYear)
    }
  } else {
    // insert new value
    dataUpdate.push(datum)
  }

  return dataUpdate.sort((a, b) => Number(a.name) - Number(b.name))
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
