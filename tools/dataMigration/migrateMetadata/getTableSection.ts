import { SectionTableSpec } from '../../../.src.legacy/webapp/sectionSpec'
import { SubSection } from '../../../src/meta/assessment/section'
import { TableSection } from '../../../src/meta/assessment/tableSection'

export const getTableSection = (props: {
  cycles: Array<string>
  tableSectionSpec: SectionTableSpec
  section: SubSection
}): TableSection => {
  const { cycles, tableSectionSpec, section } = props

  const tableSection: TableSection = {
    props: {
      cycles,
      descriptionKey: tableSectionSpec.descriptionKey,
      labelKey: tableSectionSpec.titleKey,
    },
    sectionId: section.id || -1,
    sectionName: section.props.name,
    tables: [],
  }
  return tableSection
}
