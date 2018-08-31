import * as R from 'ramda'
import { sum } from '../../../common/bignumberUtils'

const getTotalFieldValue = (field, year) => R.pipe(
  R.path(['totalTable', year, field]),
  R.defaultTo('0')
)

export const getTotalGrowingStockFieldsSum = (growingStock, year, fields = []) => {
  const values = fields.map(field =>
    getTotalFieldValue(field, year)(growingStock),
  )
  return sum(values)
}

export const getTotalGrowingStockInForest = (growingStock, year) =>
  getTotalFieldValue('forest', year)(growingStock)
