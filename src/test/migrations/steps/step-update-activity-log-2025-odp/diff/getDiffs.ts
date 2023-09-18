import { getDiff } from 'test/migrations/steps/step-update-activity-log-2025-odp/diff/getDiff'

import { ActivityLogEntries, Diff } from '../type'

export const getDiffs = (activityLogEntries: ActivityLogEntries): Array<Diff> => {
  const diffs: Array<Diff> = []

  activityLogEntries.forEach((activityLogEntry) => {
    const { odp_id: odpId } = activityLogEntry

    activityLogEntry.activity_log_entries_list.forEach((activityLogEntryRow, index) => {
      const { target: odpA, message } = activityLogEntryRow
      const odpB = activityLogEntry.activity_log_entries_list[index + 1]?.target

      if (!odpB) {
        return
      }

      const { diff, newMessage } = getDiff(odpA, odpB) ?? {}

      diffs.push({
        activityLogEntryId: activityLogEntryRow.id,
        odpId,
        message,
        diff,
        newMessage,
      })
    })
  })

  return diffs
}
