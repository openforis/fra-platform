import { useSelector } from 'react-redux'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'

import * as ReviewState from '@webapp/app/assessment/components/review/reviewState'

export default (target: any) => {
  const commentsOpen = useSelector((state) => {
    const openThreadTarget = ReviewState.getOpenThreadTarget(state)
    return !R.isEmpty(openThreadTarget) && R.isEmpty(R.difference(openThreadTarget, target))
  })

  return commentsOpen ? 'fra-row-comments__open' : ''
}
