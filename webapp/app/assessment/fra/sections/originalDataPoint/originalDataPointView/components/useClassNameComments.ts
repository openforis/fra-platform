import { useSelector } from 'react-redux'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'

import * as ReviewState from '@webapp/app/assessment/components/review/reviewState'

export default (targetRow: any) => {
  const commentsOpen = useSelector((state) => {
    const { section, target } = ReviewState.getOpenThread(state) || {}
    return R.equals('odp', section) && R.isEmpty(R.difference(target, targetRow))
  })

  return commentsOpen ? 'fra-row-comments__open' : ''
}
