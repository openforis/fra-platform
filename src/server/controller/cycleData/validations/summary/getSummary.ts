import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { ValidationSummary } from 'meta/assessment/validation/summary'
import { Objects } from 'utils/objects'

import { ValidationRedisRepository } from 'server/cache/repository/validation'
import { SectionRepository } from 'server/db/repository/assessment/section'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
}

export const getValidationSummary = async (props: Props): Promise<ValidationSummary> => {
  const { assessment, countryIso, cycle } = props
  const [sections, sectionsMetadata, tableValidations] = await Promise.all([
    SectionRepository.getMany({ assessment, cycle }),
    SectionRepository.getManyMetadata({ assessment, cycle }),
    ValidationRedisRepository.getTableValidations({ assessment, countryIso, cycle }),
  ])
  const summary: ValidationSummary = { sections: {}, subsections: {}, tables: {} }
  const subSections = sections.flatMap((section) => section.subSections ?? [])

  Object.entries(sectionsMetadata).forEach(([subSectionName, tableSections]) => {
    const subSection = subSections.find((_subSection) => _subSection.props.name === subSectionName)
    const sectionUuid = subSection.parentUuid
    const subsectionUuid = subSection.uuid
    const tableNames = tableSections.flatMap((tableSection) => tableSection.tables.map((table) => table.props.name))
    let subsectionValid = true

    tableNames.forEach((tableName) => {
      const valid = Objects.isEmpty(tableValidations[tableName] ?? {})
      summary.tables[tableName] = { valid }
      subsectionValid = subsectionValid && valid
    })

    const subsection = { tableNames, valid: subsectionValid }
    summary.sections[sectionUuid] ??= { subsections: {}, valid: true }
    const section = summary.sections[sectionUuid]

    summary.subsections[subsectionUuid] = subsection
    section.subsections[subsectionUuid] = subsection
    section.valid = section.valid && subsectionValid
  })

  return summary
}
