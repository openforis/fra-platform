const R = require('ramda')
const assert = require('assert')
const NumberUtils = require('../../common/bignumberUtils')

const linearInterpolation = (x, xa, ya, xb, yb) =>
  NumberUtils.add(
    ya,
    NumberUtils.div(NumberUtils.mul(NumberUtils.sub(yb, ya), NumberUtils.sub(x, xa)), NumberUtils.sub(xb, xa))
  )

const linearExtrapolationForwards = (x, xa, ya, xb, yb) =>
  NumberUtils.add(
    ya,
    NumberUtils.mul(NumberUtils.div(NumberUtils.sub(x, xa), NumberUtils.sub(xb, xa)), NumberUtils.sub(yb, ya))
  )

const linearExtrapolationBackwards = (x, xa, ya, xb, yb) =>
  NumberUtils.add(
    yb,
    NumberUtils.mul(NumberUtils.div(NumberUtils.sub(xb, x), NumberUtils.sub(xb, xa)), NumberUtils.sub(ya, yb))
  )

const getNextValues = (year) =>
  R.pipe(
    R.filter((v) => v.year > year),
    R.sort((a, b) => a.year - b.year)
  )

const getPreviousValues = (year) =>
  R.pipe(
    R.filter((v) => v.year < year),
    R.sort((a, b) => b.year - a.year)
  )

const applyEstimationFunction = (year, pointA, pointB, field, estFunction) => {
  const estimated = estFunction(year, pointA.year, pointA[field], pointB.year, pointB[field])
  return estimated < 0 ? '0' : estimated
}

const linearExtrapolation = (year, values, _, field) => {
  const previous2Values = getPreviousValues(year)(values).slice(0, 2)
  const next2Values = getNextValues(year)(values).slice(0, 2)

  if (previous2Values.length === 2) {
    return applyEstimationFunction(year, previous2Values[1], previous2Values[0], field, linearExtrapolationForwards)
  }
  if (next2Values.length === 2) {
    return applyEstimationFunction(year, next2Values[0], next2Values[1], field, linearExtrapolationBackwards)
  }
  return null
}

const repeatLastExtrapolation = (year, values, _, field) => {
  const previousValues = getPreviousValues(year)(values)
  const nextValues = getNextValues(year)(values)
  if (previousValues.length >= 1) return R.head(previousValues)[field]
  if (nextValues.length >= 1) return R.head(nextValues)[field]
  return null
}

const clearTableValues = () => {
  return null
}

const annualChangeExtrapolation = (year, values, odpValues, field, { changeRates }) => {
  assert(changeRates, 'changeRates must be given for annualChange extrapolation method')

  const previousValues = getPreviousValues(year)(odpValues)
  const nextValues = getNextValues(year)(odpValues)
  if (previousValues.length >= 1) {
    const previousOdp = R.pipe(
      R.reject((o) => R.isNil(o[field])),
      R.head,
      R.defaultTo(R.head(previousValues))
    )(previousValues)
    const previousOdpYear = previousOdp.year
    const years = year - previousOdpYear
    const rateFuture = R.path([field, 'rateFuture'], changeRates)
    return rateFuture ? NumberUtils.add(previousOdp[field], NumberUtils.mul(rateFuture, years)) : null
  }
  if (nextValues.length >= 1) {
    const nextOdp = R.head(nextValues)
    const nextOdpYear = nextOdp.year
    const years = nextOdpYear - year
    const ratePast = R.path([field, 'ratePast'], changeRates)
    return ratePast ? NumberUtils.add(nextOdp[field], NumberUtils.mul(ratePast * -1, years)) : null
  }
  return null
}

const generateMethods = {
  linear: linearExtrapolation,
  repeatLast: repeatLastExtrapolation,
  annualChange: annualChangeExtrapolation,
  clearTable: clearTableValues,
}

const extrapolate = (year, values, odpValues, field, generateSpec) => {
  const extrapolationMethod = generateMethods[generateSpec.method]
  assert(extrapolationMethod, `Invalid extrapolation method: ${generateSpec.method}`)
  return extrapolationMethod(year, values, odpValues, field, generateSpec)
}

const estimateField = (values = [], odpValues, field, year, generateSpec) => {
  const odp = R.find(R.propEq('year', year))(values)
  const previousValue = getPreviousValues(year)(values)[0]
  const nextValue = getNextValues(year)(values)[0]
  const noRequiredOdps = generateSpec.method === 'linear' ? 2 : 1

  if (values.length < noRequiredOdps || generateSpec.method === 'clearTable') {
    return null
  }
  if (odp) {
    return odp[field]
  }
  if (previousValue && nextValue) {
    return applyEstimationFunction(year, previousValue, nextValue, field, linearInterpolation)
  }
  return extrapolate(year, values, odpValues, field, generateSpec)
}

const estimateFraValue = (year, values, odpValues, generateSpec) => {
  const estimateFieldReducer = (newFraObj, field) => {
    const fraEstimatedYears = R.pipe(
      R.filter((v) => v.store),
      R.map((v) => v.year)
    )(values)

    const isEstimatedOdp = (v) => v.type === 'odp' && R.contains(v.year, fraEstimatedYears)

    // Filtering out objects with field value null or already estimated
    const fieldValues = R.reject((v) => !v[field] || isEstimatedOdp(v), values)

    const estValue = estimateField(fieldValues, odpValues, field, year, generateSpec)

    return R.pipe(R.assoc([field], NumberUtils.toFixed(estValue)), R.assoc(`${field}Estimated`, true))(newFraObj)
  }

  return R.pipe(
    R.partial(R.reduce, [estimateFieldReducer, {}]),
    R.assoc('year', year),
    R.assoc('store', true)
  )(generateSpec.fields)
}

// Pure function, no side-effects
const estimateFraValues = (years, odpValues, generateSpec) => {
  const estimateFraValuesReducer = (values, year) => {
    const newValue = estimateFraValue(year, values, odpValues, generateSpec)
    return [...values, newValue]
  }

  const estimatedValues = R.pipe(
    R.partial(R.reduce, [estimateFraValuesReducer, odpValues]),
    R.filter((v) => v.store),
    R.map((v) => R.dissoc('store', v))
  )(years)

  return estimatedValues
}

module.exports.estimateFraValues = estimateFraValues

module.exports.estimateAndWrite = async (odpReader, fraWriter, countryIso, years, generateSpec) => {
  const values = await odpReader(countryIso)
  const estimated = estimateFraValues(years, R.values(values), generateSpec)
  return Promise.all(
    R.map((estimatedValues) => fraWriter(countryIso, estimatedValues.year, estimatedValues, true), estimated)
  )
}
