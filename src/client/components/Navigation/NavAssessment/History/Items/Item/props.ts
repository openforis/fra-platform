import { ActivityLog } from 'meta/assessment'
import { HistoryTarget } from 'meta/cycleData'

export type Props = {
  datum: ActivityLog<never>
  target: HistoryTarget
}
