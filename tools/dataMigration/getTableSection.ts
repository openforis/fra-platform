import { SectionTableSpec } from '../../webapp/sectionSpec'
import { Section } from '../../core/meta/section'
import { TableSection } from '../../core/meta/tableSection'

export const getTableSection = (props: {
  cycles: Array<string>
  tableSectionSpec: SectionTableSpec
  section: Section
}): TableSection => {
  const { cycles, tableSectionSpec, section } = props

  const tableSection: TableSection = {
    props: {
      cycles,
      descriptionKey: tableSectionSpec.descriptionKey,
      labelKey: tableSectionSpec.titleKey,
    },
    sectionId: section.id,
    tables: [],
  }
  return tableSection
}
