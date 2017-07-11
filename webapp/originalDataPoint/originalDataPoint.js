/*
 * Functions for dealing with and creating the OriginalDataPoint datastructure
 */

import R from 'ramda'

const uuidv4 = require('uuid/v4')

export const updateNationalClass = (odp, index, field, value) => {
  const nationalClassToUpdate = odp.nationalClasses[index]
  const wasPlaceHolder = nationalClassToUpdate.placeHolder
  const updatedNationalClass = R.dissoc('placeHolder', {...nationalClassToUpdate, [field]: value})
  const classesWithValueUpdated = R.update(index, updatedNationalClass, odp.nationalClasses)
  const updatedClasses = wasPlaceHolder
    ? [...classesWithValueUpdated, nationalClassPlaceHolder()]
    : classesWithValueUpdated
  return {...odp, nationalClasses: updatedClasses}
}

export const removeNationalClass = (odp, index) => ({...odp, nationalClasses: R.remove(index, 1, odp.nationalClasses)})

export const removeClassPlaceholder = (odp) => {
  const updatedClasses = R.filter(nClass => !nClass.placeHolder, odp.nationalClasses)
  return {...odp, nationalClasses: updatedClasses}
}

export const defaultNationalClass = (className = '', definition = '') => ({
  className,
  definition,
  area: null,
  forestPercent: null,
  otherWoodedLandPercent: null,
  otherLandPercent: null,
  uuid: uuidv4()
})

export const nationalClassPlaceHolder = () => ({...defaultNationalClass(), placeHolder: true})

export const emptyDataPoint = () => ({
  year: null,
  forestArea: null,
  nationalClasses: [nationalClassPlaceHolder()]
})

export const addNationalClassPlaceHolder = (odp) => ({
  ...odp,
  nationalClasses: [...odp.nationalClasses, nationalClassPlaceHolder()]
})

export const totalForest = (odp, percentFieldName) => {
  const reduceTotal = (total, nationalClass) =>
    isNaN(nationalClass.area) || isNaN(nationalClass[percentFieldName]) // isNaN actually tests whether something can be converted to a number, not whether it's NaN
      ? 0
      : total + (Number(nationalClass.area) * (Number(nationalClass[percentFieldName]) / 100.0))
  return (R.reduce(reduceTotal, 0, odp.nationalClasses)).toFixed(0)
}

export const copyNationalClasses = (odpTarget, odpSource) => ({
  ...odpTarget,
  nationalClasses: [...odpSource.nationalClasses.map(c => defaultNationalClass(c.className, c.definition)), nationalClassPlaceHolder()]
})

export const validateDataPoint = odp => {
  const defaultTo0 = R.defaultTo(0)

  const validYear = R.pipe(
    defaultTo0,
    R.partialRight(R.gt, [0])
  )(odp.year)

  const validateNationalClassPercentage = cls => R.pipe(
    c => R.sum([defaultTo0(c.forestPercent), defaultTo0(c.otherWoodedLandPercent), defaultTo0(c.otherLandPercent)]),
    R.equals(100)
  )(cls)

  const nationalClasses = R.map(
    c => R.pipe(
      R.assoc('uuid', c.uuid),
      R.assoc('validClassName', R.not(R.isEmpty(c.className))),
      v => R.assoc('validArea', c.placeHolder || !v.validClassName ? true : !isNaN(parseFloat(c.area)), v),
      v => R.assoc('validPercentage', c.placeHolder || !v.validArea || !v.validClassName ? true : validateNationalClassPercentage(c), v),
      v => R.assoc('valid', v.validClassName && v.validArea && v.validPercentage, v)
    )({})
    , odp.nationalClasses)

  return {
    year: {valid: validYear},
    nationalClasses,
    valid: !validYear || R.filter(c => !c.valid, nationalClasses).length !== 0 ? false : true
  }
}
