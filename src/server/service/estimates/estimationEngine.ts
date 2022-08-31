import { BigNumberInput, Numbers } from '@utils/numbers'
import BigNumber from 'bignumber.js'

import { NodeUpdate, TableData } from '@meta/data'

const assert = (condition: any, message: string) => {
  if (!condition) {
    throw message
  }
}

interface Deprecated_TableDatum {
  forestAreaEstimated?: boolean
  otherWoodedLandEstimated?: boolean
  countryIso?: string
  dataSourceAdditionalComments?: string
  dataSourceReferences?: string
  description?: string
  id?: string
  odpId?: string
  reservedYears?: Array<number>
  year?: number
  store?: boolean
  type: 'odp' | 'fra'
  forestArea?: string
  otherWoodedLand?: string
}

type Field = keyof Deprecated_TableDatum

type ValueArray = Array<Deprecated_TableDatum>
type ODPValueArray = ValueArray // Array<Deprecated_TableDatum & { type: 'odp' }>

type GenerateSpecMethods = 'linear' | 'repeatLast' | 'annualChange' | 'clearTable'

export interface GenerateSpec {
  method: GenerateSpecMethods
  fields?: Array<string>
  changeRates?: Record<string, { rateFuture: number; ratePast: number }>
}

export const linearInterpolation = (
  x: BigNumberInput,
  xa: BigNumberInput,
  ya: BigNumberInput,
  xb: BigNumberInput,
  yb: BigNumberInput
): BigNumber => Numbers.add(ya, Numbers.div(Numbers.mul(Numbers.sub(yb, ya), Numbers.sub(x, xa)), Numbers.sub(xb, xa)))

export const linearExtrapolationForwards = (
  x: BigNumberInput,
  xa: BigNumberInput,
  ya: BigNumberInput,
  xb: BigNumberInput,
  yb: BigNumberInput
): BigNumber => Numbers.add(ya, Numbers.mul(Numbers.div(Numbers.sub(x, xa), Numbers.sub(xb, xa)), Numbers.sub(yb, ya)))

export const linearExtrapolationBackwards = (
  x: BigNumberInput,
  xa: BigNumberInput,
  ya: BigNumberInput,
  xb: BigNumberInput,
  yb: BigNumberInput
): BigNumber => Numbers.add(yb, Numbers.mul(Numbers.div(Numbers.sub(xb, x), Numbers.sub(xb, xa)), Numbers.sub(ya, yb)))

export const getNextValues = (year: number, values: ValueArray) =>
  values
    .filter((v: Deprecated_TableDatum) => v.year > year)
    .sort((a: Deprecated_TableDatum, b: Deprecated_TableDatum) => a.year - b.year)

export const getPreviousValues = (year: number, values: ValueArray) =>
  values.filter((v) => v.year < year).sort((a, b) => b.year - a.year)

export const applyEstimationFunction = (
  year: number,
  pointA: Deprecated_TableDatum,
  pointB: Deprecated_TableDatum,
  field: Field,
  estFunction: (...params: any[]) => BigNumber
): number => {
  const estimated = Number(estFunction(year, pointA.year, pointA[field], pointB.year, pointB[field]))
  return Number(estimated < 0 ? '0' : estimated)
}

export const linearExtrapolation = (year: number, values: ValueArray, _: ODPValueArray, field: Field): number => {
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

export const repeatLastExtrapolation = (year: number, values: ValueArray, _: ODPValueArray, field: Field): number => {
  const previousValues = getPreviousValues(year, values)
  const nextValues = getNextValues(year, values)

  if (previousValues.length >= 1) return previousValues[0][field] as number
  if (nextValues.length >= 1) return nextValues[0][field] as number
  return null
}

const clearTableValues = (): null => {
  return null
}

export const annualChangeExtrapolation = (
  year: number,
  _values: ValueArray,
  odpValues: ODPValueArray,
  field: Field,
  { changeRates }: GenerateSpec
): number => {
  assert(changeRates, 'changeRates must be given for annualChange extrapolation method')

  const previousValues = getPreviousValues(year, odpValues)
  const nextValues = getNextValues(year, odpValues)
  if (previousValues.length >= 1) {
    const previousOdp = previousValues.filter((pv) => !!pv[field])?.[0] ?? previousValues[0]
    const previousOdpYear = previousOdp.year
    const years = year - previousOdpYear
    const rateFuture = changeRates?.[field]?.rateFuture
    return rateFuture ? Number(Numbers.add(previousOdp[field] as number, Numbers.mul(rateFuture, years))) : null
  }
  if (nextValues.length >= 1) {
    const nextOdp = nextValues[0]
    const nextOdpYear = nextOdp.year
    const years = nextOdpYear - year
    const ratePast = changeRates?.[field]?.ratePast
    return ratePast ? Number(Numbers.add(nextOdp[field] as number, Numbers.mul(ratePast * -1, years))) : null
  }
  return null
}

export const generateMethods: Record<string, (...params: any[]) => number> = {
  linear: linearExtrapolation,
  repeatLast: repeatLastExtrapolation,
  annualChange: annualChangeExtrapolation,
  clearTable: clearTableValues,
}

export const extrapolate = (
  year: number,
  values: ValueArray,
  odpValues: ODPValueArray,
  field: keyof Deprecated_TableDatum,
  generateSpec: Partial<GenerateSpec>
) => {
  const extrapolationMethod = generateMethods[generateSpec.method]
  assert(extrapolationMethod, `Invalid extrapolation method: ${generateSpec.method}`)
  return extrapolationMethod(year, values, odpValues, field, generateSpec)
}

export const estimateField = (
  odpValues: ODPValueArray,
  field: Field,
  year: number,
  generateSpec: Partial<GenerateSpec>,
  values: ValueArray = []
): number => {
  const odp = values.find((v) => v.year === year)
  const previousValue = getPreviousValues(year, values)[0]
  const nextValue = getNextValues(year, values)[0]
  const noRequiredOdps = generateSpec.method === 'linear' ? 2 : 1

  if (values.length < noRequiredOdps || generateSpec.method === 'clearTable') {
    return null
  }
  if (odp) {
    return Number(odp[field])
  }
  if (previousValue && nextValue) {
    return applyEstimationFunction(year, previousValue, nextValue, field, linearInterpolation)
  }
  return extrapolate(year, values, odpValues, field, generateSpec)
}

export const estimateFraValue = (
  year: number,
  values: ValueArray,
  odpValues: ODPValueArray,
  generateSpec: Partial<GenerateSpec>
): Deprecated_TableDatum => {
  const estimateFieldReducer = (newFraObj: Deprecated_TableDatum, field: Field) => {
    const fraEstimatedYears = values.filter((v) => v.store).map((v) => v.year)

    const isEstimatedOdp = (v: Deprecated_TableDatum) => v.type === 'odp' && fraEstimatedYears.includes(v.year)

    // Filtering out objects with field value null or already estimated
    const fieldValues = values.filter((v: Deprecated_TableDatum) => !v[field] || !isEstimatedOdp(v))

    const estValue = estimateField(odpValues, field, year, generateSpec, fieldValues)

    return {
      ...newFraObj,
      [field]: Numbers.toFixed(estValue),
      [`${field}Estimated`]: true,
    }
  }

  return {
    ...generateSpec.fields.reduce<Deprecated_TableDatum>(estimateFieldReducer, {} as Deprecated_TableDatum),
    year,
    countryIso: values[0].countryIso,
    store: true,
  }
}

const translateObjectToOldFormat = (x: any) => {
  const newData: any = []
  Object.entries(x).forEach(([countryIso, countryValues]) => {
    Object.entries(countryValues).forEach(([_section, sectionValues]) => {
      Object.entries(sectionValues).forEach(([year, yearValues]: any[]) => {
        newData.push({
          countryIso,
          year: Number(year),
          name: year,
          ...Object.keys(yearValues).reduce(
            (acc, key) => ({
              ...acc,
              [key === 'forest' ? 'forestArea' : key]: yearValues[key].raw,
              [`${key}Estimated`]: yearValues[key].estimated || false,
              type: yearValues[key].odp ? 'odp' : 'fra',
            }),
            {}
          ),
        })
      })
    })
  })
  return newData
}

const formatArray = (arr: Deprecated_TableDatum[], tableName: string, fields: string[]): Array<NodeUpdate> => {
  const res: Array<NodeUpdate> = []
  arr.forEach((tableDatum: Deprecated_TableDatum) => {
    fields.forEach((field) => {
      res.push({
        colName: `${tableDatum.year}`,
        tableName,
        variableName: field,
        value: {
          // @ts-ignore
          raw: tableDatum[field as keyof Deprecated_TableDatum],
          estimated: true,
        },
      })
    })
  })
  return res
}

export const estimateValues = (
  years: Array<number>,
  values: Partial<TableData>,
  generateSpec: Partial<GenerateSpec>,
  tableName: string
): Array<NodeUpdate> => {
  const translatedData = translateObjectToOldFormat(values)
  const result: Deprecated_TableDatum[] = years
    .reduce<ValueArray>((values, year) => {
      const newValue = estimateFraValue(year, values, translatedData, generateSpec)
      return [...values, newValue]
    }, translatedData)
    .filter((v: Deprecated_TableDatum): boolean => v.store)
    .map((v: Deprecated_TableDatum): Deprecated_TableDatum => {
      // eslint-disable-next-line no-param-reassign
      delete v.store
      return v
    })
  return formatArray(result, tableName, generateSpec.fields)
}

export const EstimationEngine = {
  estimateValues,
}

/**
 * @deprecated
 */
export const estimateFraValues = (
  years: Array<number>,
  odpValues: ODPValueArray,
  generateSpec: GenerateSpec
): ValueArray => {
  return years
    .reduce<ValueArray>((values, year) => {
      const newValue = estimateFraValue(year, values, odpValues, generateSpec)
      return [...values, newValue]
    }, odpValues)
    .filter((v: Deprecated_TableDatum): boolean => v.store)
    .map((v: Deprecated_TableDatum): Deprecated_TableDatum => {
      // eslint-disable-next-line no-param-reassign
      delete v.store
      return v
    })
}

// type FraWriter = (
//   countryIso: CountryIso,
//   year: number,
//   estimatedValues: Deprecated_TableDatum,
//   bool: boolean
// ) => Promise<any>
//
// export const estimateAndWrite = async (
//   odps: ODPValueArray,
//   fraWriter: FraWriter,
//   countryIso: CountryIso,
//   years: Array<number>,
//   generateSpec: GenerateSpec
// ) => {
//   const estimated = estimateFraValues(years, odps, generateSpec)
//   return Promise.all(
//     estimated.map((estimatedValues: Deprecated_TableDatum) =>
//       fraWriter(countryIso, estimatedValues.year, estimatedValues, true)
//     )
//   )
// }
