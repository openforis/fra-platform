import { User } from '../user'

export enum ActivityLogMessage {
  assessmentCreate = 'assessmentCreate',
  assessmentCycleCreate = 'assessmentCycleCreate',
  originalDataPointCreate = 'originalDataPointCreate',
  originalDataPointUpdate = 'originalDataPointUpdate',
  originalDataPointRemove = 'originalDataPointRemove',
  userInvited = 'userInvited',
  nodeValueUpdate = 'nodeValueUpdate',
  nodeValueCalculatedUpdate = 'nodeValueCalculatedUpdate',
}

export interface ActivityLog<Target> {
  target: Target
  message: ActivityLogMessage
  countryIso?: string
  section: string
  user: User
  time?: string
}
