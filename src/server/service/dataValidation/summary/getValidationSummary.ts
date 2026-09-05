import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Descriptions } from 'meta/assessment/descriptions'
import { SectionNames } from 'meta/assessment/section'
import { ValidationSummary } from 'meta/assessment/validation/summary'
import { ValidationSummaries } from 'meta/assessment/validation/validationSummaries'

import { AreaRedisRepository } from 'server/cache/repository/area'
import { DataRedisRepository } from 'server/cache/repository/data'
import { SectionRedisRepository } from 'server/cache/repository/section'
import { DescriptionValidationRedisRepository } from 'server/cache/repository/validation/description'
import { NationalDataPointValidationRedisRepository } from 'server/cache/repository/validation/nationalDataPoint'
import { TableValidationRedisRepository } from 'server/cache/repository/validation/table'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
}

export const getValidationSummary = async (props: Props): Promise<ValidationSummary> => {
  const { assessment, countryIso, cycle } = props
  const sections = await SectionRedisRepository.getMany({ assessment, cycle })
  const sectionNames = sections.flatMap(
    (section) => section.subSections?.map((subSection) => subSection.props.name) ?? []
  )
  const [country, descriptionValidations, nationalDataPointValidations, ndpYears, sectionsMetadata, tableValidations] =
    await Promise.all([
      AreaRedisRepository.getOneCountry({ assessment, countryIso, cycle }),
      DescriptionValidationRedisRepository.getValidations({ assessment, countryIso, cycle, sectionNames }),
      NationalDataPointValidationRedisRepository.getValidations({ assessment, countryIso, cycle }),
      DataRedisRepository.getODPYears({ assessment, countryIso, cycle }),
      SectionRedisRepository.getManyMetadata({ assessment, cycle }),
      TableValidationRedisRepository.getValidations({ assessment, countryIso, cycle }),
    ])

  const hasNationalDataPointData = ndpYears.length > 0
  const forestCharacteristicsUseOriginalDataPoint = Boolean(country?.props?.forestCharacteristics?.useOriginalDataPoint)

  // Build the summary structure; ValidationSummaries.compute evaluates all validity
  const summary: ValidationSummary = {
    descriptions: {},
    nationalDataPoints: {},
    sections: {},
    subsections: {},
    tables: {},
  }

  if (cycle.props.ndp) {
    summary.nationalDataPoints[SectionNames.extentOfForest] = { valid: true }
    if (forestCharacteristicsUseOriginalDataPoint) {
      summary.nationalDataPoints[SectionNames.forestCharacteristics] = { valid: true }
    }
  }

  sections.forEach((section) => {
    section.subSections?.forEach((subSection) => {
      const sectionUuid = section.uuid
      const sectionName = subSection.props.name
      const subsectionUuid = subSection.uuid
      const tableSections = sectionsMetadata[sectionName] ?? []
      const tableNames = tableSections.flatMap((tableSection) => tableSection.tables.map((table) => table.props.name))

      tableNames.forEach((tableName) => {
        summary.tables[tableName] = { valid: true }
      })

      // Only visible descriptions count for the summary
      const descriptionNames = Descriptions.getVisibleDescriptionNames({
        hasNationalDataPointData,
        sectionName,
        useNationalDataPoint: forestCharacteristicsUseOriginalDataPoint,
      })
      const subsection = { descriptionNames, sectionName, tableNames, valid: true }

      summary.subsections[subsectionUuid] = subsection
      summary.sections[sectionUuid] ??= { subsections: {}, valid: true }
      summary.sections[sectionUuid].subsections[subsectionUuid] = subsection
    })
  })

  return ValidationSummaries.compute({
    descriptionValidations,
    nationalDataPointValidations,
    summary,
    tableValidations,
  })
}
