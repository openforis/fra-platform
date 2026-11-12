import { Country } from 'meta/area/country'
import { Assessment, AssessmentBase } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { Section, SubSection } from 'meta/assessment/section'
import { Table } from 'meta/assessment/table'
import { TableSection } from 'meta/assessment/tableSection'
import { User } from 'meta/user/user'

type TestContext = {
  activityLog?: {
    assessment: Assessment
    country: Country
    cycle: Cycle
    user: User
  }
  activityLogCycle?: Cycle
  assessmentCreated?: AssessmentBase
  activityLogSection?: Section
  activityLogSubSection?: SubSection
  activityLogTable?: Table
  activityLogTableSection?: TableSection
  nationalDataPoint?: OriginalDataPoint
  section?: Section
  tableSection?: TableSection
}

export const testContext: TestContext = {}
