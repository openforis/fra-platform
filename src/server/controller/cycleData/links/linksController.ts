import { LinkRepository } from 'server/db/repository/assessmentCycle/links'
import { scheduleVerifyAllLinks } from 'server/worker/tasks/verifyLinks/visitCycleLinks/scheduleVerifyAllLinks'

import { getActiveVerifyJob } from './getActiveVerifyJob'
import { getManyExport } from './getManyExport'
import { getVerificationSummary } from './getVerificationSummary'
import { update } from './update'

export const LinksController = {
  getActiveVerifyJob,
  getCount: LinkRepository.getCount,
  getMany: LinkRepository.getMany,
  getManyExport,
  getVerificationSummary,
  update,
  verify: scheduleVerifyAllLinks,
}
