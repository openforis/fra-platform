import { ActivityLog, ActivityLogMessage } from 'meta/assessment/activityLog'
import { ActivityLogTarget } from 'meta/assessment/activityLog/target'
import { Section, SubSection } from 'meta/assessment/section'
import { Table } from 'meta/assessment/table'
import { TableSection } from 'meta/assessment/tableSection'

export type MetadataTargets = {
  [ActivityLogMessage.sectionCreate]: Section | SubSection
  [ActivityLogMessage.sectionDelete]: { deletedSection: Section }
  [ActivityLogMessage.sectionUpdate]: Section | SubSection
  [ActivityLogMessage.tableCreate]: Table
  [ActivityLogMessage.tableDelete]: { deletedTable: Table }
  [ActivityLogMessage.tableSectionCreate]: TableSection
  [ActivityLogMessage.tableSectionDelete]: { deletedTableSection: TableSection }
  [ActivityLogMessage.tableSectionUpdate]: TableSection
  [ActivityLogMessage.tableUpdate]: Table
}

export type ActivityLogTableUpdate = ActivityLog<
  ActivityLogTarget<ActivityLogMessage.tableUpdate>,
  ActivityLogMessage.tableUpdate
>
