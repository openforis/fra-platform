import { Country } from 'meta/area/country'
import { Assessment, AssessmentBase } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { Section, SubSection } from 'meta/assessment/section'
import { Table } from 'meta/assessment/table'
import { TableSection } from 'meta/assessment/tableSection'
import { Contact } from 'meta/cycleData/contact/contact'
import { RepositoryItem } from 'meta/cycleData/repository/item'
import { Message } from 'meta/messageCenter/message'
import { UserInvitation } from 'meta/user/invitation'
import { User } from 'meta/user/user'

type TestContext = {
  activityLog?: {
    assessment: Assessment
    country: Country
    cycle: Cycle
    user: User
  }
  activityLogContact?: Contact
  activityLogCycle?: Cycle
  activityLogInvitedUser?: User
  activityLogMessage?: Message
  activityLogRepositoryItem?: RepositoryItem
  assessmentCreated?: AssessmentBase
  activityLogSection?: Section
  activityLogSubSection?: SubSection
  activityLogTable?: Table
  activityLogTableSection?: TableSection
  activityLogUserInvitation?: UserInvitation
  nationalDataPoint?: OriginalDataPoint
  section?: Section
  tableSection?: TableSection
}

export const testContext: TestContext = {}
