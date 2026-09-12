import { LinkRepository } from 'server/db/repository/assessmentCycle/links'

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
}
