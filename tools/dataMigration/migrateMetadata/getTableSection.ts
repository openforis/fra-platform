import { SubSection } from '../../../meta/assessment/section'
import { TableSection } from '../../../meta/assessment/tableSection'
import { SectionTableSpec } from '../../../webapp/sectionSpec'

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
