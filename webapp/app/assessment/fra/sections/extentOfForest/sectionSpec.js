import * as FRA from '@common/assessment/fra'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'
import * as ExtentOfForestState from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestState'

const section = FRA.sections['1'].children.a

const tableSpecs = [
  SectionSpec.newTableSpec(section.tables.extentOfForest, [], ExtentOfForestState.getSectionData, true),
]
const tableSection = SectionSpec.newTableSection(tableSpecs)

const extentOfForest = SectionSpec.newSectionSpec(section.name, section.anchor, [tableSection])

export default extentOfForest
