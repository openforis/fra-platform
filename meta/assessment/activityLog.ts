import { User } from '../user'

export enum ActivityLogMessage {
  assessmentCreate = 'assessmentCreate',
  assessmentCycleCreate = 'assessmentCycleCreate',
  originalDataPointCreate = 'originalDataPointCreate',
  userInvited = 'userInvited',
}

export interface ActivityLog<Target> {
  target: Target
  message: ActivityLogMessage
  countryIso?: string
  section: string
  user: User
  time?: string
}
