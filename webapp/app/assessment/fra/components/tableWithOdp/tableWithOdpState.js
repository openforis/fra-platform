import * as R from 'ramda'

export const getFra = section => R.pathOr({}, [section, 'fra'])

export const getFieldByYear = (section, field, year) => R.pipe(
  getFra(section),
  R.groupBy(R.prop('name')),
  R.path([year, 0, field])
)
