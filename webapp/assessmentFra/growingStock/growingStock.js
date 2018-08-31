import * as R from 'ramda'
import {sum} from '../../../common/bignumberUtils'

const getTotalFieldValue = (field, year) => R.pipe(
  R.path(['totalTable', year, field]),
  R.defaultTo('0')
)

export const getTotalGrowingStock = (growingStock, year) => {
  const fields = [
    getTotalFieldValue('naturallyRegeneratingForest',year)(growingStock),
    getTotalFieldValue('plantedForest',year)(growingStock),
    getTotalFieldValue('forest',year)(growingStock),
    getTotalFieldValue('otherWoodedLand',year)(growingStock),
  ]
  return sum(fields)
}
