import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { DescriptionValidations } from 'meta/assessment/validation/descriptionValidations'
import { NationalDataPointValidations } from 'meta/assessment/validation/nationalDataPointValidations'
import { ValidationSummary } from 'meta/assessment/validation/summary'
import { Objects } from 'utils/objects'

import { DescriptionValidationRedisRepository } from 'server/cache/repository/validation/description'
import { NationalDataPointValidationRedisRepository } from 'server/cache/repository/validation/nationalDataPoint'
import { TableValidationRedisRepository } from 'server/cache/repository/validation/table'
import { SectionRepository } from 'server/db/repository/assessment/section'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
}

export const getValidationSummary = async (props: Props): Promise<ValidationSummary> => {
  const { assessment, countryIso, cycle } = props
  const sections = await SectionRepository.getMany({ assessment, cycle })
  const sectionNames = sections.flatMap(
    (section) => section.subSections?.map((subSection) => subSection.props.name) ?? []
  )
  const [descriptionValidations, nationalDataPointValidations, sectionsMetadata, tableValidations] = await Promise.all([
    DescriptionValidationRedisRepository.getDescriptionValidations({ assessment, countryIso, cycle, sectionNames }),
    NationalDataPointValidationRedisRepository.getNationalDataPointValidations({ assessment, countryIso, cycle }),
    SectionRepository.getManyMetadata({ assessment, cycle }),
    TableValidationRedisRepository.getTableValidations({ assessment, countryIso, cycle }),
  ])
  const nationalDataPointSummary = NationalDataPointValidations.calculateSummary({
    nationalDataPointValidations,
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
      const subsectionUuid = subSection.uuid
      const tableSections = sectionsMetadata[subSection.props.name] ?? []
      const tableNames = tableSections.flatMap((tableSection) => tableSection.tables.map((table) => table.props.name))
      const descriptionSummary = DescriptionValidations.calculateSummary({
        sectionValidations: descriptionValidations[subSection.props.name],
      })
      const descriptionsValid = Object.values(descriptionSummary).every((description) => description?.valid ?? true)

      summary.descriptions[subSection.props.name] = descriptionSummary

      const nationalDataPointValid = nationalDataPointSummary[subSection.props.name]?.valid ?? true
      let subsectionValid = descriptionsValid && nationalDataPointValid
      tableNames.forEach((tableName) => {
        const valid = Objects.isEmpty(tableValidations[tableName] ?? {})
        summary.tables[tableName] = { valid }
        subsectionValid = subsectionValid && valid
      })

      const subsection = { sectionName: subSection.props.name, tableNames, valid: subsectionValid }
      summary.sections[sectionUuid] ??= { subsections: {}, valid: true }
      const summarySection = summary.sections[sectionUuid]

      summary.subsections[subsectionUuid] = subsection
      summarySection.subsections[subsectionUuid] = subsection
      summarySection.valid = summarySection.valid && subsectionValid
    })
  })

  return summary
}
