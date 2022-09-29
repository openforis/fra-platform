import { SectionTableSpec } from '../../../.src.legacy/webapp/sectionSpec'
import { TableSection } from '../../../src/meta/assessment/tableSection'

export const getTableSection = (props: { cycles: Array<string>; tableSectionSpec: SectionTableSpec }): TableSection => {
  const { cycles, tableSectionSpec } = props

  const tableSection: TableSection = {
    props: {
      cycles,
      descriptionKey: tableSectionSpec.descriptionKey,
      labelKey: tableSectionSpec.titleKey,
    },
    tables: [],
  }
  return tableSection
}
