import { ActivityLog } from 'meta/assessment/activityLog'
import { HistoryTarget } from 'meta/cycleData/history/activities'

export type Props = {
  datum: ActivityLog<never>
  target: HistoryTarget
}
