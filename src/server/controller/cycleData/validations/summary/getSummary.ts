import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { ValidationSummary } from 'meta/assessment/validation/summary'
import { Objects } from 'utils/objects'

import { SectionRedisRepository } from 'server/cache/repository/section'
import { ValidationRedisRepository } from 'server/cache/repository/validation'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
}

export const getValidationSummary = async (props: Props): Promise<ValidationSummary> => {
  const { assessment, countryIso, cycle } = props
  const [sectionsMetadata, tableValidations] = await Promise.all([
    SectionRedisRepository.getManyMetadata({ assessment, cycle }),
    ValidationRedisRepository.getTableValidations({ assessment, countryIso, cycle }),
  ])
  const summary: ValidationSummary = { sections: {}, subsections: {}, tables: {} }

  Object.values(sectionsMetadata).forEach((tableSections) => {
    const { sectionUuid } = tableSections[0]
    const subsectionUuid = tableSections[0].uuid
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
