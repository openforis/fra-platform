import { enqueueDescriptionLinksValidation } from 'server/service/links/enqueueDescriptionLinksValidation'
import { enqueueNationalDataPointLinksValidation } from 'server/service/links/enqueueNationalDataPointLinksValidation'
import { verifyLinks } from 'server/service/links/verifyLinks'
import { enqueueAllLinksValidation } from 'server/worker/tasks/verifyLinks/visitCycleLinks/enqueueAllLinksValidation'

export const LinksService = {
  enqueueAllLinksValidation,
  enqueueDescriptionLinksValidation,
  enqueueNationalDataPointLinksValidation,
  verifyLinks,
}
