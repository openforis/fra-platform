// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as FRA from '@common/assessment/fra'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

const section = FRA.sections['0'].children.a

const contactPersons = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.showTitle]: false,
  [SectionSpec.KEYS_SECTION.dataExport]: { [SectionSpec.KEYS_DATA_EXPORT.included]: false },
  [SectionSpec.KEYS_SECTION.descriptions]: {
    [SectionSpec.KEYS_SECTION_DESCRIPTIONS.nationalData]: false,
    [SectionSpec.KEYS_SECTION_DESCRIPTIONS.analysisAndProcessing]: false,
    [SectionSpec.KEYS_SECTION_DESCRIPTIONS.comments]: false,
    [SectionSpec.KEYS_SECTION_DESCRIPTIONS.introductoryText]: true,
  },
})

export default contactPersons
