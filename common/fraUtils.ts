import * as R from 'ramda'
import { FRA } from '@core/assessment'
import { Numbers } from '@core/utils/numbers'

/**
 * @deprecated
 */
export const fraYears = [1990, 2000, 2010, 2015, 2016, 2017, 2018, 2019, 2020]

/**
 * @deprecated
 */
export const hasData = R.pipe(R.reject(R.all(R.or(R.isNil, R.isEmpty))), R.isEmpty, R.not)

// ====== Table  methods
// @ts-ignore
export const isTableEmpty = R.pipe(R.defaultTo([]), R.flatten, R.reject(R.isNil), R.isEmpty)

export const sumTableColumn = (columnIndex: any, rowIndexes: any) => (data: any) =>
  R.pipe(
    R.map((rowIdx: any) => R.pathOr(null, [rowIdx, columnIndex])(data)),
    R.reject(R.isNil),
    Numbers.sum
  )(rowIndexes)

// ====== Table with odp methods

export const filterFraYears = R.filter((d: any) => R.includes(Number(d.year), FRA.years))
// @ts-ignore
export const getOdps = (x: any) => R.pipe(R.defaultTo([]), R.filter(R.propEq('type', 'odp')))(x)

export const hasOdps = R.pipe(getOdps, R.isEmpty, R.not)

export const isTableWithOdpEmpty = (table: any) =>
  R.pipe(
    R.defaultTo([]),
    // @ts-ignore
    R.map(R.pickBy((val: any, key: any) => !['year', 'name', 'type'].includes(key) && !key.endsWith('Estimated'))),
    R.map(R.values),
    isTableEmpty
    // @ts-ignore
  )(table)

export const getDatumByYear = (year: any) =>
  R.pipe(
    R.defaultTo([]),
    // @ts-ignore
    R.find((datum) => String(datum?.year || datum?.name) === String(year)),
    R.defaultTo({})
  )

export const updateTableWithOdpDatum = (datum: any) => (data: any) => {
  const { name } = datum
  const idx = R.findIndex((v: any) => v.name === name && v.type === 'fra', data)
  return R.update(idx, datum, data)
}

export const updateTableWithOdpDatumOdp = (datum: any, dataNoNDPs: any) => (data: any) => {
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

export default {
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
