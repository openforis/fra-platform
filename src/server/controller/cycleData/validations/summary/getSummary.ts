import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { SectionName, SectionNames } from 'meta/assessment/section'
import { DescriptionValidations } from 'meta/assessment/validation/descriptionValidations'
import { NationalDataPointValidations } from 'meta/assessment/validation/nationalDataPointValidations'
import { ValidationSummary } from 'meta/assessment/validation/summary'
import { Objects } from 'utils/objects'

import { AreaRedisRepository } from 'server/cache/repository/area'
import { DataRedisRepository } from 'server/cache/repository/data'
import { SectionRedisRepository } from 'server/cache/repository/section'
import { DescriptionValidationRedisRepository } from 'server/cache/repository/validation/description'
import { NationalDataPointValidationRedisRepository } from 'server/cache/repository/validation/nationalDataPoint'
import { TableValidationRedisRepository } from 'server/cache/repository/validation/table'
import { calculateSubsection } from 'server/controller/cycleData/validations/summary/calculateSubsection'

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
  const nationalDataPointSectionNames: Array<SectionName> = []
  if (cycle.props.ndp) {
    nationalDataPointSectionNames.push(SectionNames.extentOfForest)
    if (forestCharacteristicsUseOriginalDataPoint) {
      nationalDataPointSectionNames.push(SectionNames.forestCharacteristics)
    }
  }
  const nationalDataPointSummary = NationalDataPointValidations.calculateSummary({
    nationalDataPointValidations,
    sectionNames: nationalDataPointSectionNames,
  })
  const summary: ValidationSummary = {
    descriptions: {},
    nationalDataPoints: nationalDataPointSummary,
    sections: {},
    subsections: {},
    tables: {},
  }

  sections.forEach((section) => {
    section.subSections?.forEach((subSection) => {
      const sectionUuid = section.uuid
      const sectionName = subSection.props.name
      const subsectionUuid = subSection.uuid
      const tableSections = sectionsMetadata[sectionName] ?? []
      const tableNames = tableSections.flatMap((tableSection) => tableSection.tables.map((table) => table.props.name))
      summary.descriptions[sectionName] = DescriptionValidations.calculateSummary({
        sectionValidations: descriptionValidations[sectionName],
      })

      tableNames.forEach((tableName) => {
        summary.tables[tableName] = { valid: Objects.isEmpty(tableValidations[tableName] ?? {}) }
      })

      const subsection = calculateSubsection({
        hasNationalDataPointData,
        sectionName,
        summary,
        tableNames,
        useNationalDataPoint: forestCharacteristicsUseOriginalDataPoint,
      })
      summary.sections[sectionUuid] ??= { subsections: {}, valid: true }
      const summarySection = summary.sections[sectionUuid]

      summary.subsections[subsectionUuid] = subsection
      summarySection.subsections[subsectionUuid] = subsection
      summarySection.valid = summarySection.valid && subsection.valid
    })
  })

  return summary
}
