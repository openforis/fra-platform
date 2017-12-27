import * as R from 'ramda'
import { eq } from '../../../../common/bignumberUtils'

export const getDataPoint = (data, year) => R.pipe(
  R.prop('extentOfForest'),
  R.find(v => eq(v.year, year) && R.propEq('type', 'odp', v)),
  o => R.isNil(o)
    ? R.find(v => eq(v.year, year) && R.propEq('type', 'fra', v), data.extentOfForest)
    : o,
)(data)

export const getForestArea = (data, year)  => R.pipe(
  R.partialRight(getDataPoint,[year]),
  R.prop('forestArea')
)(data)



