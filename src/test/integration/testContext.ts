import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { Section, SubSection } from 'meta/assessment/section'
import { TableSection } from 'meta/assessment/tableSection'
import { User } from 'meta/user/user'

type TestContext = {
  activityLog?: {
    assessment: Assessment
    country: Country
    cycle: Cycle
    user: User
  }
  activityLogSection?: Section
  activityLogSubSection?: SubSection
  activityLogTableSection?: TableSection
  nationalDataPoint?: OriginalDataPoint
  section?: Section
  tableSection?: TableSection
}

export const testContext: TestContext = {}
