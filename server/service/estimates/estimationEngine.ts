import * as assert from 'assert'

import { BigNumberInput, Numbers } from '@core/utils/numbers'

interface ODP {
  countryIso?: string
  dataSourceAdditionalComments?: string
  dataSourceReferences?: string
  description?: string
  id?: string
  odpId?: string
  reservedYears?: Array<number>
  year?: string
}

export const linearInterpolation = (
  x: BigNumberInput,
  xa: BigNumberInput,
  ya: BigNumberInput,
  xb: BigNumberInput,
  yb: BigNumberInput
) => Numbers.add(ya, Numbers.div(Numbers.mul(Numbers.sub(yb, ya), Numbers.sub(x, xa)), Numbers.sub(xb, xa)))

export const linearExtrapolationForwards = (
  x: BigNumberInput,
  xa: BigNumberInput,
  ya: BigNumberInput,
  xb: BigNumberInput,
  yb: BigNumberInput
) => Numbers.add(ya, Numbers.mul(Numbers.div(Numbers.sub(x, xa), Numbers.sub(xb, xa)), Numbers.sub(yb, ya)))

export const linearExtrapolationBackwards = (
  x: BigNumberInput,
  xa: BigNumberInput,
  ya: BigNumberInput,
  xb: BigNumberInput,
  yb: BigNumberInput
) => Numbers.add(yb, Numbers.mul(Numbers.div(Numbers.sub(xb, x), Numbers.sub(xb, xa)), Numbers.sub(ya, yb)))

export const getNextValues = (year: number, values: any[]) =>
  values.filter((v: any) => v.year > year).sort((a: any, b: any) => a.year - b.year)

export const getPreviousValues = (year: number, values: any[]) =>
  values.filter((v) => v.year < year).sort((a, b) => b.year - a.year)

export const applyEstimationFunction = (year: number, pointA: any, pointB: any, field: any, estFunction: any) => {
  const estimated = estFunction(year, pointA.year, pointA[field], pointB.year, pointB[field])
  return estimated < 0 ? '0' : estimated
}

export const linearExtrapolation = (year: number, values: any, _: any, field: any) => {
  const previous2Values = getPreviousValues(year, values).slice(0, 2)
  const next2Values = getNextValues(year, values).slice(0, 2)

  if (previous2Values.length === 2) {
    return applyEstimationFunction(year, previous2Values[1], previous2Values[0], field, linearExtrapolationForwards)
  }
  if (next2Values.length === 2) {
    return applyEstimationFunction(year, next2Values[0], next2Values[1], field, linearExtrapolationBackwards)
  }
  return null
}

export const repeatLastExtrapolation = (year: number, values: any, _: any, field: any) => {
  const previousValues = getPreviousValues(year, values)
  const nextValues = getNextValues(year, values)

  if (previousValues.length >= 1) return previousValues[0][field]
  if (nextValues.length >= 1) return nextValues[0][field]
  return null
}

function clearTableValues(): any {
  return null
}

export const annualChangeExtrapolation = (
  year: number,
  _values: any,
  odpValues: any,
  field: any,
  { changeRates }: any
) => {
  assert(changeRates, 'changeRates must be given for annualChange extrapolation method')

  const previousValues = getPreviousValues(year, odpValues)
  const nextValues = getNextValues(year, odpValues)
  if (previousValues.length >= 1) {
    const previousOdp = previousValues.filter((pv) => !!pv[field])?.[0] ?? previousValues[0]
    const previousOdpYear = previousOdp.year
    const years = year - previousOdpYear
    const rateFuture = changeRates?.[field]?.rateFuture
    return rateFuture ? Numbers.add(previousOdp[field], Numbers.mul(rateFuture, years)) : null
  }
  if (nextValues.length >= 1) {
    const nextOdp = nextValues[0]
    const nextOdpYear = nextOdp.year
    const years = nextOdpYear - year
    const ratePast = changeRates?.[field]?.ratePast
    return ratePast ? Numbers.add(nextOdp[field], Numbers.mul(ratePast * -1, years)) : null
  }
  return null
}

export const generateMethods: { [key: string]: any } = {
  linear: linearExtrapolation,
  repeatLast: repeatLastExtrapolation,
  annualChange: annualChangeExtrapolation,
  clearTable: clearTableValues,
}

export const extrapolate = (year: number, values: any, odpValues: any, field: any, generateSpec: any) => {
  const extrapolationMethod = generateMethods[generateSpec.method]
  assert(extrapolationMethod, `Invalid extrapolation method: ${generateSpec.method}`)
  return extrapolationMethod(year, values, odpValues, field, generateSpec)
}

export const estimateField = (values: any[] = [], odpValues: any, field: string, year: number, generateSpec: any) => {
  const odp: { [key: string]: any } | null = values.find((v) => v.year === year)
  const previousValue = getPreviousValues(year, values)[0]
  const nextValue = getNextValues(year, values)[0]
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

export const estimateFraValue = (year: number, values: any, odpValues: any, generateSpec: any) => {
  const estimateFieldReducer = (newFraObj: any, field: any) => {
    const fraEstimatedYears = values.filter((v) => v.store).map((v) => v.year)

    const isEstimatedOdp = (v: any) => v.type === 'odp' && fraEstimatedYears.includes(v.year)

    // Filtering out objects with field value null or already estimated
    const fieldValues = values.filter((v) => !v[field] || !isEstimatedOdp(v))

    const estValue = estimateField(fieldValues, odpValues, field, year, generateSpec)

    // @ts-ignore
    return {
      ...newFraObj,
      [field]: Numbers.toFixed(estValue),
      [`${field}Estimated`]: true,
    }
  }

  return {
    ...generateSpec.fields.reduce(estimateFieldReducer, {}),
    year,
    store: true,
  }
}

// Pure function, no side-effects
export const estimateFraValues = (years: Array<number>, odpValues: Array<ODP>, generateSpec: any) => {
  const estimatedValues = years
    .reduce<Array<any>>((values, year) => {
      const newValue = estimateFraValue(year, values, odpValues, generateSpec)
      return [...values, newValue]
    }, odpValues)
    .filter((v: any) => v.store)
    .map((v: any) => {
      // eslint-disable-next-line no-param-reassign
      delete v.store
      return v
    })

  return estimatedValues
}

export const estimateAndWrite = async (
  odps: Array<ODP>,
  fraWriter: any,
  countryIso: any,
  years: Array<number>,
  generateSpec: any
) => {
  const estimated = estimateFraValues(years, odps, generateSpec)
  return Promise.all(
    estimated.map((estimatedValues: any) => fraWriter(countryIso, estimatedValues.year, estimatedValues, true))
  )
}
