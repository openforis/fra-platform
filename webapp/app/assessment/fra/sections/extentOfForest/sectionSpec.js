import * as FRA from '@common/assessment/fra'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

const section = FRA.sections['1'].children.a

const extentOfForest = SectionSpec.newSectionSpec(section.name, section.anchor)

export default extentOfForest
