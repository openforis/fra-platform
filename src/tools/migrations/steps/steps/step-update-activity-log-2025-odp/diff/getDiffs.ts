import { getDiff } from 'tools/migrations/steps/steps/step-update-activity-log-2025-odp/diff/getDiff'
import { ActivityLogEntries, Diff } from 'tools/migrations/steps/steps/step-update-activity-log-2025-odp/type'

export const getDiffs = (activityLogEntries: ActivityLogEntries): Array<Diff> => {
  const diffs: Array<Diff> = []

  activityLogEntries.forEach((activityLogEntry) => {
    const { odp_id: odpId } = activityLogEntry

    activityLogEntry.activity_log_entries_list.forEach((activityLogEntryRow, index) => {
      const { message, target: odpA } = activityLogEntryRow
      const odpB = activityLogEntry.activity_log_entries_list[index + 1]?.target

      if (!odpB) {
        return
      }

      const { diff, newMessage } = getDiff(odpA, odpB) ?? {}

      if (newMessage) {
        diffs.push({
          id: activityLogEntryRow.id,
          odpId,
          message,
          diff,
          newMessage,
        })
      }
    })
  })

  return diffs
}
