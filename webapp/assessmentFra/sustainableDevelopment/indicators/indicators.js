import * as R from 'ramda'
import { eq } from '@common/bignumberUtils'

export const getDataPoint = (data, year) => R.pipe(
  R.prop('extentOfForest'),
  R.find(v => eq(v.year, year))
)(data)

export const getForestArea = (data, year) => R.path(['forestArea'], getDataPoint(data, year))
