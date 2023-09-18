import { CountryIso } from 'meta/area'
import { ActivityLogMessage, OriginalDataPoint } from 'meta/assessment'

export type ActivityLogEntries = Array<{
  country_iso: CountryIso
  odp_id: string
  activity_log_entries_list: Array<{
    id: string
    time: string
    target: OriginalDataPoint
    message: ActivityLogMessage
    section: string
    user_id: string
    cycle_uuid: string
    country_iso: string
    assessment_uuid: string
  }>
}>

export type Diff = {
  activityLogEntryId: string
  odpId: string
  message: ActivityLogMessage
  newMessage: ActivityLogMessage
  diff: {
    field: string
    before: string | number
    after: string | number
  }
}
