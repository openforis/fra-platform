/*
 * Functions for dealing with and creating the OriginalDataPoint datastructure
 */

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import { sum, mul, sub, add, div } from '@common/bignumberUtils'

const { v4: uuidv4 } = require('uuid')

export const updateNationalClass = (odp: any, index: any, field: any, value: any) => {
  const nationalClassToUpdate = odp.nationalClasses[index]
  const wasPlaceHolder = !R.isNil(R.path(['placeHolder'], nationalClassToUpdate))
  const updatedNationalClass = R.dissoc('placeHolder', { ...nationalClassToUpdate, [field]: value })
  const classesWithValueUpdated = R.update(index, updatedNationalClass, odp.nationalClasses)

  return wasPlaceHolder
    ? { ...odp, nationalClasses: [...classesWithValueUpdated, nationalClassPlaceHolder()] }
    : { ...odp, nationalClasses: classesWithValueUpdated }
}

export const removeNationalClass = (odp: any, index: any) => ({
  ...odp,
  nationalClasses: R.remove(index, 1, odp.nationalClasses),
})

export const removeClassPlaceholder = (odp: any) => {
  const updatedClasses = R.filter((nClass: any) => !nClass.placeHolder, odp.nationalClasses)
  return { ...odp, nationalClasses: updatedClasses }
}

export const defaultNationalClass = (className = '', definition = '') => ({
  className,
  definition,
  // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'area' implicitly has an... Remove this comment to see the full error message
  area: null,
  // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'forestPercent' implicit... Remove this comment to see the full error message
  forestPercent: null,
  // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'otherWoodedLandPercent'... Remove this comment to see the full error message
  otherWoodedLandPercent: null,
  // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'otherLandPercent' impli... Remove this comment to see the full error message
  otherLandPercent: null,
  // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'naturalForestPercent' i... Remove this comment to see the full error message
  naturalForestPercent: null,
  // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'plantationPercent' impl... Remove this comment to see the full error message
  plantationPercent: null,
  // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'plantationIntroducedPer... Remove this comment to see the full error message
  plantationIntroducedPercent: null,
  // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'otherPlantedPercent' im... Remove this comment to see the full error message
  otherPlantedPercent: null,
  uuid: uuidv4(),
})

export const nationalClassPlaceHolder = () => ({ ...defaultNationalClass(), placeHolder: true })

export const emptyDataPoint = () => ({
  // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'year' implicitly has an... Remove this comment to see the full error message
  year: null,
  // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'forestArea' implicitly ... Remove this comment to see the full error message
  forestArea: null,
  nationalClasses: [nationalClassPlaceHolder()],
})

export const addNationalClassPlaceHolder = (odp: any) => ({
  ...odp,
  nationalClasses: [...odp.nationalClasses, nationalClassPlaceHolder()],
})

export const totalArea = (odp: any) =>
  R.pipe(
    R.map((nationalClass: any) => nationalClass.area),
    R.reject((v: any) => !v),
    sum
  )(odp.nationalClasses)

export const classTotalArea = (odp: any, percentFieldName: any) =>
  R.pipe(
    R.filter((nationalClass: any) => nationalClass.area && nationalClass[percentFieldName]),
    R.map((nationalClass: any) => mul(nationalClass.area, nationalClass[percentFieldName]).div(100.0)),
    sum
  )(odp.nationalClasses)

export const otherLandTotalArea = (odp: any) => {
  const total = totalArea(odp)
  const forestArea = classTotalArea(odp, 'forestPercent')
  const otherWoodedArea = classTotalArea(odp, 'otherWoodedLandPercent')
  return sub(total, add(forestArea, otherWoodedArea))
}

export const subClassTotalArea = (odp: any, percentFieldName: any, subClassPercentFieldName: any) =>
  R.pipe(
    R.filter(
      (nationalClass: any) =>
        nationalClass.area && nationalClass[percentFieldName] && nationalClass[subClassPercentFieldName]
    ),
    R.map((nationalClass: any) => {
      const x = mul(nationalClass.area, nationalClass[percentFieldName])
      const y = mul(x, nationalClass[subClassPercentFieldName])
      return div(y, 10000.0)
    }),
    sum
  )(odp.nationalClasses)

export const subSubClassTotalArea = (
  odp: any,
  percentFieldName: any,
  subClassPercentFieldName: any,
  subSubClassPercentFieldName: any
) =>
  R.pipe(
    R.filter(
      (nationalClass: any) =>
        nationalClass.area &&
        nationalClass[percentFieldName] &&
        nationalClass[subClassPercentFieldName] &&
        nationalClass[subSubClassPercentFieldName]
    ),
    R.map((nationalClass: any) => {
      const x = mul(nationalClass.area, nationalClass[percentFieldName])
      const y = mul(x, nationalClass[subClassPercentFieldName])
      const z = mul(y, nationalClass[subSubClassPercentFieldName])
      return div(z, 1000000.0)
    }),
    sum
  )(odp.nationalClasses)

export const allowCopyingOfPreviousValues = R.pipe(
  R.path(['nationalClasses', 0, 'className']),
  R.defaultTo(''),
  R.isEmpty
)

export const copyNationalClassDefinitions = (odpTarget: any, odpSource: any) => ({
  ...odpTarget,
  nationalClasses: [
    ...odpSource.nationalClasses.map((c: any) =>
      R.merge(
        defaultNationalClass(c.className, c.definition),
        R.pick(
          [
            'forestPercent',
            'otherWoodedLandPercent',
            'otherLandPercent',
            'naturalForestPercent',
            'plantationPercent',
            'plantationIntroducedPercent',
            'otherPlantedPercent',
            'otherLandPalmsPercent',
            'otherLandTreeOrchardsPercent',
            'otherLandAgroforestryPercent',
            'otherLandTreesUrbanSettingsPercent',
          ],
          c
        )
      )
    ),
    nationalClassPlaceHolder(),
  ],
})
