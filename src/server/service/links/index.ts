import { enqueueDescriptionLinksValidation } from 'server/service/links/enqueueDescriptionLinksValidation'
import { enqueueNationalDataPointLinksValidation } from 'server/service/links/enqueueNationalDataPointLinksValidation'
import { verifyLinks } from 'server/service/links/verifyLinks'
import { scheduleVerifyAllLinks } from 'server/worker/tasks/verifyLinks/visitCycleLinks/scheduleVerifyAllLinks'

export const LinksService = {
  enqueueAllLinksValidation: scheduleVerifyAllLinks,
  enqueueDescriptionLinksValidation,
  enqueueNationalDataPointLinksValidation,
  verifyLinks,
}
