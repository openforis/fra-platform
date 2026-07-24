import { enqueueDescriptionLinksValidation } from 'server/service/links/enqueueDescriptionLinksValidation'
import { verifyLinks } from 'server/service/links/verifyLinks'

export const LinksService = {
  enqueueDescriptionLinksValidation,
  verifyLinks,
}
