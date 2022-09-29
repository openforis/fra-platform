import { SectionTableSpec } from '../../../.src.legacy/webapp/sectionSpec'
import { Assessment, SubSection, TableSection } from '../../../src/meta/assessment'
import { getCycleUuids } from './utils'

export const getTableSection = (props: {
  assessment: Assessment
  subSection: SubSection
  tableSectionSpec: SectionTableSpec
}): TableSection => {
  const { assessment, subSection, tableSectionSpec } = props

  const tableSection: TableSection = {
    props: {
      cycles: getCycleUuids({ assessment, parentCycleUuids: subSection.props.cycles }),
      descriptionKey: tableSectionSpec.descriptionKey,
      labelKey: tableSectionSpec.titleKey,
    },
    tables: [],
  }
  return tableSection
}
