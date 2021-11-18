import { Express } from 'express'
import { AuditGetFeed } from './getFeed'
import { AuditGetLatestLogTimestamp } from './getLatestLogTimestamp'

export const AuditApi = {
  init: (express: Express): void => {
    AuditGetFeed.init(express)
    AuditGetLatestLogTimestamp.init(express)
  },
}
