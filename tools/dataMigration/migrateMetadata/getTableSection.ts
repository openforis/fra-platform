import { Assessment, SubSection, TableSection } from '../../../src/meta/assessment'
import { SectionTableSpec } from '../../../src/test/sectionSpec'
import { getCycleUuids, getLabels } from './utils'

export const getTableSection = (props: {
  assessment: Assessment
  subSection: SubSection
  tableSectionSpec: SectionTableSpec
}): TableSection => {
  const { assessment, subSection, tableSectionSpec } = props

  const tableSection: TableSection = {
    props: {
      cycles: getCycleUuids({
        assessment,
        parentCycleUuids: subSection.props.cycles,
        migration: tableSectionSpec.migration,
      }),
      descriptions: getLabels({
        assessment,
        label: { key: tableSectionSpec.descriptionKey },
        migration: {},
      }),
      labels: getLabels({
        assessment,
        label: { key: tableSectionSpec.titleKey },
        migration: tableSectionSpec.migration,
      }),
    },
    tables: [],
  }
  return tableSection
}
