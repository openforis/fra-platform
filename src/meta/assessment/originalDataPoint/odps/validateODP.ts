import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ODPNationalClass } from 'meta/assessment'

import { OriginalDataPoint } from '../originalDataPoint'

const ltE100 = (x: number) => Numbers.lessThanOrEqualTo(x, 100)

const e100 = (x: number) => Numbers.eq(x, 100)

export const validateYear = (originalDataPoint: OriginalDataPoint) => {
  return Numbers.greaterThan(originalDataPoint.year ?? 0, 0)
}

// National Class Validations:
// == Name must not be empty or longer than 1024
const _validateClassName = (nationalClass: ODPNationalClass) => !Objects.isEmpty(nationalClass?.name) && nationalClass?.name?.length < 1024

// == Area must not be null
const _validateArea = (nationalClass: ODPNationalClass) => Number.isNaN(+nationalClass.area)

// == ExtentOfForest percentage (forestPercent, otherWoodedLandPercent) sum should be less than or equal to 100
const _validExtentOfForestPercentage = (nationalClass: ODPNationalClass) => {
  const percentSum = Numbers.sum([nationalClass.forestPercent ?? 0, nationalClass.otherWoodedLandPercent ?? 0])
  return ltE100(percentSum)
}

// == ForestCharacteristics percentage
// (forestNaturalPercent, forestPlantationPercent, otherPlantedForestPercent)
// sum should be equal to 100

const _validForestCharacteristicsPercentage = (nationalClass: ODPNationalClass) => {
  if (+nationalClass.forestPercent <= 0) return true
  const percentSum = Numbers.sum([
    nationalClass.forestNaturalPercent ?? 0,
    nationalClass.forestPlantationPercent ?? 0,
    nationalClass.otherPlantedForestPercent ?? 0,
  ])
  return e100(percentSum)
}

// == Forest plantation introduced percentage (forestPlantationIntroducedPercent)
// should be less than or equal to 100

const _validForestPlantationIntroducedPercent = (nationalClass: ODPNationalClass) => {
  if (Objects.isEmpty(nationalClass.forestPlantationIntroducedPercent)) return true
  if (+nationalClass.forestPlantationIntroducedPercent <= 0) return true
  return ltE100(+nationalClass.forestPlantationIntroducedPercent)
}
// == Natural forest of which primary forest percentage (forestNaturalForestOfWhichPrimaryForestPercent)
// should be less than or equal to 100

const _validPrimaryForest = (nationalClass: ODPNationalClass) => {
  if (Objects.isEmpty(nationalClass.forestNaturalForestOfWhichPrimaryForestPercent)) return true
  if (+nationalClass.forestNaturalForestOfWhichPrimaryForestPercent <= 0) return true
  return ltE100(+nationalClass.forestNaturalForestOfWhichPrimaryForestPercent)
}

export type NationalClassValidation = {
  error: boolean
  validClassName?: boolean
  validArea?: boolean
  validExtentOfForestPercentage: boolean
  validForestCharacteristicsPercentage: boolean
  validForestPlantationIntroducedPercent: boolean
  validPrimaryForest: boolean
}

export const validateNationalClass = (originalDataPoint: OriginalDataPoint, index: number): NationalClassValidation => {
  const nationalClass = originalDataPoint?.nationalClasses?.[index]
  // If the national class doesn't exist, it is not invalid
  if (!nationalClass) return { error: false } as NationalClassValidation
  const isPlaceHolder = nationalClass.placeHolder
  const validClassName = isPlaceHolder || _validateClassName(nationalClass)
  const validArea = validClassName || _validateArea(nationalClass)
  const validExtentOfForestPercentage = _validExtentOfForestPercentage(nationalClass)
  const validForestCharacteristicsPercentage = _validForestCharacteristicsPercentage(nationalClass)
  const validForestPlantationIntroducedPercent = _validForestPlantationIntroducedPercent(nationalClass)
  const validPrimaryForest = _validPrimaryForest(nationalClass)

  return {
    error: !(
      validClassName &&
      validArea &&
      validExtentOfForestPercentage &&
      validForestCharacteristicsPercentage &&
      validForestPlantationIntroducedPercent &&
      validPrimaryForest
    ),
    validClassName,
    validArea,
    validExtentOfForestPercentage,
    validForestCharacteristicsPercentage,
    validForestPlantationIntroducedPercent,
    validPrimaryForest,
  }
}
