import { enqueueDescriptionLinksValidation } from 'server/service/links/enqueueDescriptionLinksValidation'
import { enqueueNationalDataPointLinksValidation } from 'server/service/links/enqueueNationalDataPointLinksValidation'
import { verifyLinks } from 'server/service/links/verifyLinks'

export const LinksService = {
  enqueueDescriptionLinksValidation,
  enqueueNationalDataPointLinksValidation,
  verifyLinks,
}
