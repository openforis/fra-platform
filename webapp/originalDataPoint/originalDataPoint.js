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
  naturalForestPercent: null,
  naturallyRegeneratedPrimaryPercent: null,
  plantationForestPercent: null,
  plantationForestIntroducedSpeciesPercent: null,
  otherPlantedForestPercent: null,
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

export const allowCopyingOfPreviousValues =
  R.pipe(R.path(['nationalClasses', 0, 'className']), R.defaultTo(''), R.isEmpty)

export const totalArea = odp =>
  R.reduce((total, nationalClass) => isNaN(nationalClass.area) ? 0 : total + Number(nationalClass.area), 0, odp.nationalClasses).toFixed(0)

export const copyNationalClassDefinitions = (odpTarget, odpSource) => ({
  ...odpTarget,
  nationalClasses: [...odpSource.nationalClasses.map(c => R.merge(defaultNationalClass(c.className, c.definition), R.pick(['forestPercent',
      'otherWoodedLandPercent',
      'otherLandPercent'], c))), nationalClassPlaceHolder()]
})
