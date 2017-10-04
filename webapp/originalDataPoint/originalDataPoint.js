/*
 * Functions for dealing with and creating the OriginalDataPoint datastructure
 */

import R from 'ramda'
import { sum, mul, div } from '../../common/bignumberUtils'

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

export const totalArea = odp => R.pipe(
  R.map(nationalClass => nationalClass.area),
  R.reject(v => !v),
  sum
)(odp.nationalClasses)

export const classTotalArea = (odp, percentFieldName) => R.pipe(
  R.filter(nationalClass => nationalClass.area && nationalClass[percentFieldName]),
  R.map(nationalClass => mul(nationalClass.area, nationalClass[percentFieldName]).div(100.0)),
  sum
)(odp.nationalClasses)

export const subClassTotalArea = (odp, percentFieldName, subClassPercentFieldName) =>
  R.pipe(
    R.filter(nationalClass => nationalClass.area && nationalClass[percentFieldName] && nationalClass[subClassPercentFieldName]),
    R.map(nationalClass => mul(nationalClass.area, nationalClass[percentFieldName]).mul(nationalClass[subClassPercentFieldName]).div(10000.0)),
    sum
  )(odp.nationalClasses)

export const otherLandTotalArea = odp => classTotalArea(odp, 'otherLandPercent')

export const otherLandClassTotalArea = (odp, percentFieldName) => subClassTotalArea(odp, 'otherLandPercent', percentFieldName)

export const forestClassTotalArea = (odp, percentFieldName) => subClassTotalArea(odp, 'forestPercent', percentFieldName)

export const allowCopyingOfPreviousValues =
  R.pipe(R.path(['nationalClasses', 0, 'className']), R.defaultTo(''), R.isEmpty)

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
