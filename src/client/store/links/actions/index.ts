import { getIsVerificationInProgress } from 'client/store/links/actions/getIsVerificationInProgress'
import { reset } from 'client/store/links/actions/reset'
import { setIsVerificationInProgress } from 'client/store/links/actions/setIsVerificationInProgress'
import { updateLink } from 'client/store/links/actions/updateLink'
import { verifyLinks } from 'client/store/links/actions/verifyLinks'

export const LinksActions = {
  getIsVerificationInProgress,
  reset,
  setIsVerificationInProgress,
  updateLink,
  verifyLinks,
}
