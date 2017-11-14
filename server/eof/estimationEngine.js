const R = require('ramda')
const assert = require('assert')
const {add, mul, div, sub, toFixed} = require('../../common/bignumberUtils')

const linearInterpolation = (x, xa, ya, xb, yb) =>
  add(ya,
    div(
      mul(
        sub(yb, ya),
        sub(x, xa)
      ),
      sub(xb, xa)
    )
  )

const linearExtrapolationForwards = (x, xa, ya, xb, yb) =>
  add(ya,
    mul(
      div(
        sub(x, xa),
        sub(xb, xa)
      ),
      sub(yb, ya)
    )
  )

const linearExtrapolationBackwards = (x, xa, ya, xb, yb) =>
  add(yb,
    mul(
      div(
        sub(xb, x),
        sub(xb, xa)
      ),
      sub(ya, yb)
    )
  )

const eofFields = ['forestArea', 'otherWoodedLand', 'otherLand', 'otherLandPalms', 'otherLandTreeOrchards', 'otherLandAgroforestry', 'otherLandTreesUrbanSettings']
const focFields = ['naturalForestArea', 'plantationForestArea', 'plantationForestIntroducedArea', 'otherPlantedForestArea']

const getNextValues = year => R.pipe(
  R.filter(v => v.year > year),
  R.sort((a, b) => a.year - b.year)
)

const getPreviousValues = year => R.pipe(
  R.filter(v => v.year < year),
  R.sort((a, b) => b.year - a.year)
)

const estimateField = (values = [], field, year, extrapolationSpec) => {
  const odp = R.find(R.propEq('year', year))(values)
  const previousValue = getPreviousValues(year)(values)[0]
  const nextValue = getNextValues(year)(values)[0]

  if (odp) {
    return odp[field]
  } else if (values.length < 2) {
    return null
  } else if (previousValue && nextValue) {
    return applyEstimationFunction(year, previousValue, nextValue, field, linearInterpolation)
  } else {
    return extrapolate(year, values, field, extrapolationSpec)
  }
}

const applyEstimationFunction = (year, pointA, pointB, field, estFunction) => {
  const estimated = estFunction(year, pointA.year, pointA[field], pointB.year, pointB[field])
  return estimated < 0 ? '0' : estimated
}

const linearExtrapolation = (year, values, field) => {
  const previous2Values = getPreviousValues(year)(values).slice(0, 2)
  const next2Values = getNextValues(year)(values).slice(0, 2)

  if (previous2Values.length === 2)
    return applyEstimationFunction(year, previous2Values[1], previous2Values[0], field, linearExtrapolationForwards)
  else if (next2Values.length === 2)
    return applyEstimationFunction(year, next2Values[0], next2Values[1], field, linearExtrapolationBackwards)
  else
    return null
}

const repeatLastExtrapolation = (year, values, field) => {
  const previousValues = getPreviousValues(year)(values)
  const nextValues = getNextValues(year)(values)
  if (previousValues.length >= 1)
    return R.head(previousValues)[field]
  else if (nextValues.length >= 1)
    return R.head(nextValues)[field]
  else
    return null
}

const extrapolationMethods = {
  'linear': linearExtrapolation,
  'repeatLast': repeatLastExtrapolation
}

const extrapolate = (year, values, field, extrapolationSpec) => {
  const extrapolationMethod = extrapolationMethods[extrapolationSpec.method]
  assert(extrapolationMethod,`Invalid extrapolation method: ${extrapolationSpec.method}`)
  return extrapolationMethod(year, values, field, extrapolationSpec)
}

const estimateFraValue = (year, values, fieldsToEstimate, extrapolationSpec) => {

  const estimateFieldReducer = (newFraObj, field) => {
    const fraEstimatedYears = R.pipe(
      R.filter(v => v.store),
      R.map(v => v.year)
    )(values)

    const isEstimatedOdp = v => v.type === 'odp' && R.contains(v.year, fraEstimatedYears)

    //Filtering out objects with field value null or already estimated
    const fieldValues = R.reject(v => !v[field] || isEstimatedOdp(v), values)

    const estValue = estimateField(fieldValues, field, year, extrapolationSpec)

    return R.pipe(
      R.assoc([field], toFixed(estValue)),
      R.assoc(`${field}Estimated`, true)
    )(newFraObj)
  }

  return R.pipe(
    R.partial(R.reduce, [estimateFieldReducer, {}]),
    R.assoc('year', year),
    R.assoc('store', true)
  )(fieldsToEstimate)
}

// Pure function, no side-effects
const estimateFraValues = (years, odpValues, fieldstoEstimate, extrapolationSpec) => {

  const estimateFraValuesReducer = (values, year) => {
    const newValue = estimateFraValue(year, values, fieldstoEstimate, extrapolationSpec)
    return [...values, newValue]
  }

  const estimatedValues = R.pipe(
    R.partial(R.reduce, [estimateFraValuesReducer, odpValues]),
    R.filter(v => v.store),
    R.map(v => R.dissoc('store', v))
  )(years)

  return estimatedValues
}

module.exports.eofFields = eofFields
module.exports.focFields = focFields

module.exports.estimateFraValues = estimateFraValues

module.exports.estimateAndWrite = (odpReader, fraWriter, fieldsToEstimate, countryIso, years, extrapolationSpec) => {
  return odpReader(countryIso).then(values => {
    const estimated = estimateFraValues(years, R.values(values), fieldsToEstimate, extrapolationSpec)
    return Promise.all(
      R.map(
        estimatedValues => fraWriter(countryIso, estimatedValues.year, estimatedValues, true),
        estimated))
  })
}
