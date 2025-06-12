import { getIsVerificationInProgress } from 'client/store/admin/links/actions/getIsVerificationInProgress'
import { updateLink } from 'client/store/admin/links/actions/updateLink'
import { verifyLinks } from 'client/store/admin/links/actions/verifyLinks'
import { LinksSlice } from 'client/store/admin/links/slice'

export const LinksActions = {
  ...LinksSlice.actions,
  getIsVerificationInProgress,
  updateLink,
  verifyLinks,
}
