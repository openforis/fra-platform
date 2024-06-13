import { getIsVerificationInProgress } from 'client/store/ui/links/actions/getIsVerificationInProgress'
import { LinksSlice } from 'client/store/ui/links/slice'

import { updateLink } from './updateLink'
import { verifyLinks } from './verifyLinks'

export const LinksActions = {
  ...LinksSlice.actions,
  getIsVerificationInProgress,
  updateLink,
  verifyLinks,
}
