import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescription, CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { DataSource, DataSourceEditableField } from 'meta/assessment/descriptionValue/dataSource'
import { RecordDescriptionValidations } from 'meta/assessment/validation/description'
import { DescriptionValidations } from 'meta/assessment/validation/descriptionValidations'
import { Validation } from 'meta/assessment/validation/validation'
import { Objects } from 'utils/objects'

import { SectionRedisRepository } from 'server/cache/repository/section'
import { DescriptionValidationRedisRepository } from 'server/cache/repository/validation/description'
import { notifyDescriptionValidationUpdate } from 'server/controller/cycleData/validations/descriptions/notifyDescriptionValidationUpdate'

type Props = {
  assessment: Assessment
  country: Country
  cycle: Cycle
  descriptions: Array<Omit<CommentableDescription, 'id'>>
  notifyClients?: boolean
}

// Reference (empty check + link verification) is validated by the description link flow.
type RequiredField = Extract<DataSourceEditableField, 'type' | 'variables' | 'year'>
const requiredFields: Array<RequiredField> = ['type', 'variables', 'year']

const _getRequiredValidation = (value: DataSource[RequiredField]): Validation => {
  if (Objects.isEmpty(value)) return { valid: false, messages: [{ key: 'generalValidation.notEmpty' }] }
  return { valid: true }
}

// Validates the required data source fields (type, variables, year), except the reference links.
export const validateDataSources = async (props: Props): Promise<void> => {
  const { assessment, country, cycle, descriptions, notifyClients = true } = props
  const { countryIso } = country

  // Return early if none of the descriptions have data sources, to avoid loading the subsections unnecessarily.
  const descriptionsWithDataSources = descriptions.filter(
    (description) =>
      description.name === CommentableDescriptionName.dataSources && description.value.dataSources !== undefined
  )
  if (Objects.isEmpty(descriptionsWithDataSources)) return

  const subSections = await SectionRedisRepository.getSubSections({ assessment, cycle })
  const dataSourceFieldValidations = descriptionsWithDataSources.reduce<RecordDescriptionValidations>(
    (acc, description) => {
      const { sectionName, value } = description
      const subSection = subSections[sectionName]
      // Skip sections that render data sources as free text.
      if (Objects.isNil(subSection?.props.descriptions?.[cycle.uuid]?.nationalData?.dataSources?.table)) {
        return acc
      }

      const sectionValidation = (acc[sectionName] ??= {})
      const dataSources = (sectionValidation.dataSources ??= {})

      value.dataSources?.forEach((dataSource) => {
        const { placeholder, uuid } = dataSource
        if (placeholder || Objects.isEmpty(uuid)) return

        const dataSourceValidation = (dataSources[uuid] ??= {})
        requiredFields.forEach((field) => {
          dataSourceValidation[field] = _getRequiredValidation(dataSource[field])
        })
      })

      return acc
    },
    {}
  )

  const sectionNames = Object.keys(dataSourceFieldValidations)
  if (Objects.isEmpty(sectionNames)) return

  // Merge the results onto the current state, so the other validations of the sections are kept.
  const currentValidations = await DescriptionValidationRedisRepository.getValidations({
    assessment,
    countryIso,
    cycle,
    sectionNames,
  })
  const descriptionValidations: RecordDescriptionValidations = {}
  sectionNames.forEach((sectionName) => {
    const current = currentValidations[sectionName] ?? {}
    const update = dataSourceFieldValidations[sectionName] ?? {}
    descriptionValidations[sectionName] = DescriptionValidations.mergeValidations({ current, update })
  })

  await DescriptionValidationRedisRepository.setValidations({ assessment, countryIso, cycle, descriptionValidations })

  if (notifyClients) {
    notifyDescriptionValidationUpdate({ assessment, countryIso, cycle, descriptionValidations, sectionNames })
  }
}
