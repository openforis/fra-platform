// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'assert'.
const assert = require('assert')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'NumberUtil... Remove this comment to see the full error message
const NumberUtils = require('../../common/bignumberUtils')

const linearInterpolation = (x: any, xa: any, ya: any, xb: any, yb: any) =>
  NumberUtils.add(
    ya,
    NumberUtils.div(NumberUtils.mul(NumberUtils.sub(yb, ya), NumberUtils.sub(x, xa)), NumberUtils.sub(xb, xa))
  )

const linearExtrapolationForwards = (x: any, xa: any, ya: any, xb: any, yb: any) =>
  NumberUtils.add(
    ya,
    NumberUtils.mul(NumberUtils.div(NumberUtils.sub(x, xa), NumberUtils.sub(xb, xa)), NumberUtils.sub(yb, ya))
  )

const linearExtrapolationBackwards = (x: any, xa: any, ya: any, xb: any, yb: any) =>
  NumberUtils.add(
    yb,
    NumberUtils.mul(NumberUtils.div(NumberUtils.sub(xb, x), NumberUtils.sub(xb, xa)), NumberUtils.sub(ya, yb))
  )

const getNextValues = (year: any) =>
  R.pipe(
    R.filter((v: any) => v.year > year),
    R.sort((a: any, b: any) => a.year - b.year)
  )

const getPreviousValues = (year: any) =>
  R.pipe(
    R.filter((v: any) => v.year < year),
    R.sort((a: any, b: any) => b.year - a.year)
  )

const applyEstimationFunction = (year: any, pointA: any, pointB: any, field: any, estFunction: any) => {
  const estimated = estFunction(year, pointA.year, pointA[field], pointB.year, pointB[field])
  return estimated < 0 ? '0' : estimated
}

const linearExtrapolation = (year: any, values: any, _: any, field: any) => {
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

const repeatLastExtrapolation = (year: any, values: any, _: any, field: any) => {
  const previousValues = getPreviousValues(year)(values)
  const nextValues = getNextValues(year)(values)
  if (previousValues.length >= 1) return R.head(previousValues)[field]
  if (nextValues.length >= 1) return R.head(nextValues)[field]
  return null
}

// @ts-expect-error ts-migrate(7011) FIXME: Function expression, which lacks return-type annot... Remove this comment to see the full error message
const clearTableValues = () => {
  return null
}

const annualChangeExtrapolation = (year: any, values: any, odpValues: any, field: any, { changeRates }: any) => {
  assert(changeRates, 'changeRates must be given for annualChange extrapolation method')

  const previousValues = getPreviousValues(year)(odpValues)
  const nextValues = getNextValues(year)(odpValues)
  if (previousValues.length >= 1) {
    const previousOdp = R.pipe(
      R.reject((o: any) => R.isNil(o[field])),
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

const extrapolate = (year: any, values: any, odpValues: any, field: any, generateSpec: any) => {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const extrapolationMethod = generateMethods[generateSpec.method]
  assert(extrapolationMethod, `Invalid extrapolation method: ${generateSpec.method}`)
  return extrapolationMethod(year, values, odpValues, field, generateSpec)
}

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'values' implicitly has an 'any[]' type.
const estimateField = (values = [], odpValues: any, field: any, year: any, generateSpec: any) => {
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

const estimateFraValue = (year: any, values: any, odpValues: any, generateSpec: any) => {
  const estimateFieldReducer = (newFraObj: any, field: any) => {
    const fraEstimatedYears = R.pipe(
      R.filter((v: any) => v.store),
      R.map((v: any) => v.year)
    )(values)

    const isEstimatedOdp = (v: any) => v.type === 'odp' && R.contains(v.year, fraEstimatedYears)

    // Filtering out objects with field value null or already estimated
    const fieldValues = R.reject((v: any) => !v[field] || isEstimatedOdp(v), values)

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
const estimateFraValues = (years: any, odpValues: any, generateSpec: any) => {
  const estimateFraValuesReducer = (values: any, year: any) => {
    const newValue = estimateFraValue(year, values, odpValues, generateSpec)
    return [...values, newValue]
  }

  const estimatedValues = R.pipe(
    R.partial(R.reduce, [estimateFraValuesReducer, odpValues]),
    R.filter((v: any) => v.store),
    R.map((v: any) => R.dissoc('store', v))
  )(years)

  return estimatedValues
}

module.exports.estimateFraValues = estimateFraValues

module.exports.estimateAndWrite = async (
  odpReader: any,
  fraWriter: any,
  countryIso: any,
  years: any,
  generateSpec: any
) => {
  const values = await odpReader(countryIso)
  const estimated = estimateFraValues(years, R.values(values), generateSpec)
  return Promise.all(
    R.map((estimatedValues: any) => fraWriter(countryIso, estimatedValues.year, estimatedValues, true), estimated)
  )
}
