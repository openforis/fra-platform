import { getIsVerificationInProgress } from 'client/store/links/actions/getIsVerificationInProgress'
import { updateLink } from 'client/store/links/actions/updateLink'
import { verifyLinks } from 'client/store/links/actions/verifyLinks'
import { LinksSlice } from 'client/store/links/slice'

export const LinksActions = {
  ...LinksSlice.actions,
  getIsVerificationInProgress,
  updateLink,
  verifyLinks,
}
