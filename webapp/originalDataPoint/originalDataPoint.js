/*
 * Functions for dealing with and creating the OriginalDataPoint datastructure
 */

import R from 'ramda'

const uuidv4 = require('uuid/v4')

const defaultTo0 = R.defaultTo(0)

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
  naturalForestPrimaryPercent: null,
  plantationPercent: null,
  plantationIntroducedPercent: null,
  otherPlantedPercent: null,
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

export const otherLandTotalArea = odp =>
  R.reduce((total, nationalClass) => total + defaultTo0(nationalClass.area) * defaultTo0(nationalClass.otherLandPercent) / 100, 0, odp.nationalClasses).toFixed(0)

export const otherLandClassTotalArea = (odp, percentFieldName) =>
  R.reduce((total, nationalClass) => total + defaultTo0(nationalClass.area) * defaultTo0(nationalClass.otherLandPercent) * defaultTo0(nationalClass[percentFieldName]) / 10000,
    0, odp.nationalClasses).toFixed(0)

export const copyNationalClassDefinitions = (odpTarget, odpSource) => ({
  ...odpTarget,
  nationalClasses: [...odpSource.nationalClasses.map(c => R.merge(defaultNationalClass(c.className, c.definition), R.pick(['forestPercent',
    'otherWoodedLandPercent',
    'otherLandPercent',
    'naturalForestPercent',
    'naturalForestPrimaryPercent',
    'plantationPercent',
    'plantationIntroducedPercent',
    'otherPlantedPercent',
    'otherLandPalmsPercent',
    'otherLandTreeOrchardsPercent',
    'otherLandAgroforestryPercent',
    'otherLandTreesUrbanSettingsPercent'
  ], c))), nationalClassPlaceHolder()]
})

export const updateValueReducer = (state, action) => {
  const idx = R.findIndex(R.propEq('name', action.name), state.fra)
  return {...state, fra: R.update(idx, {...action.value}, state.fra)}
}

export const updateValuesReducer = (state, action) => {
  const newfra = R.map(fra => {
    const ni = R.findIndex(cd => cd.year === fra.year && fra.type === 'fra')(R.values(action.columnData))
    if (ni === -1) return fra
    return R.merge(fra, R.values(action.columnData)[ni])
  }, state.fra)
  return {...state, fra: R.pipe(R.merge(state.fra), R.values)(newfra)}
}
