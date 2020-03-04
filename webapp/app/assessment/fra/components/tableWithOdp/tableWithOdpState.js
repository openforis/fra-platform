import * as R from 'ramda'

const keys = {
  fra: 'fra',
  generatingFraValues: 'generatingFraValues'
}

const getSection = R.propOr({})

export const getFra = section => R.pipe(
  getSection(section),
  R.propOr({}, keys.fra)
)

export const getFieldByYear = (section, field, year) => R.pipe(
  getFra(section),
  R.groupBy(R.prop('name')),
  R.path([year, 0, field])
)

export const isGeneratingFraValues = section => R.pipe(
  getSection(section),
  R.propEq(keys.generatingFraValues, true)
)
