import { OriginalDataPointCommentKey } from 'meta/assessment/originalDataPoint'
import { SectionName, SectionNames } from 'meta/assessment/section'
import { TableNames } from 'meta/assessment/table'
import { NDPNationalClassValidationField, NDPValidation } from 'meta/assessment/validation/nationalDataPoint'
import { Validation } from 'meta/assessment/validation/validation'
import { Objects } from 'utils/objects'

type NDPSectionRule = {
  commentKey: OriginalDataPointCommentKey
  nationalClassFields: Array<NDPNationalClassValidationField>
}

type Props = {
  nationalDataPointValidation?: NDPValidation
  sectionName: SectionName
}

const sharedNationalClassFields: Array<NDPNationalClassValidationField> = ['name']

// Only these fields are section-specific, all other NDP errors invalidate every section
const sectionRules: Partial<Record<SectionName, NDPSectionRule>> = {
  [SectionNames.extentOfForest]: {
    commentKey: TableNames.extentOfForest,
    nationalClassFields: ['area', 'extentOfForestPercentage'],
  },
  [SectionNames.forestCharacteristics]: {
    commentKey: TableNames.forestCharacteristics,
    nationalClassFields: ['forestCharacteristicsPercentage', 'forestPlantationIntroducedPercentage', 'primaryForest'],
  },
}

const _isInvalid = (validation?: Validation): boolean => {
  return validation?.valid === false
}

export const hasSectionError = (props: Props): boolean => {
  const { nationalDataPointValidation, sectionName } = props
  if (Objects.isNil(nationalDataPointValidation)) return false

  const sectionRule = sectionRules[sectionName]
  if (Objects.isNil(sectionRule)) return false

  const { comments, dataSources, nationalClasses, year } = nationalDataPointValidation

  if (_isInvalid(year)) return true

  const dataSourceInvalid = Object.values(dataSources ?? {}).some((dataSource) => {
    return Object.values(dataSource).some((field) => _isInvalid(field))
  })
  if (dataSourceInvalid) return true

  if (_isInvalid(comments?.[sectionRule.commentKey])) return true

  const nationalClassFields = [...sharedNationalClassFields, ...sectionRule.nationalClassFields]
  const nationalClassInvalid = Object.values(nationalClasses ?? {}).some((nationalClass) => {
    return nationalClassFields.some((field) => _isInvalid(nationalClass[field]))
  })
  if (nationalClassInvalid) return true

  return false
}
