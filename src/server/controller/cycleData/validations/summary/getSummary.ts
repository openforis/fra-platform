import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { DescriptionValidations } from 'meta/assessment/validation/descriptionValidations/descriptionValidations'
import { ValidationSummary } from 'meta/assessment/validation/summary'
import { Objects } from 'utils/objects'

import { DescriptionValidationRedisRepository } from 'server/cache/repository/validation/description'
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
  const [descriptionValidations, sectionsMetadata, tableValidations] = await Promise.all([
    DescriptionValidationRedisRepository.getDescriptionValidations({ assessment, countryIso, cycle, sectionNames }),
    SectionRepository.getManyMetadata({ assessment, cycle }),
    TableValidationRedisRepository.getTableValidations({ assessment, countryIso, cycle }),
  ])
  const summary: ValidationSummary = { descriptions: {}, sections: {}, subsections: {}, tables: {} }

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

      let subsectionValid = descriptionsValid
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
