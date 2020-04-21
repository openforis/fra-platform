import { useSelector } from 'react-redux'
import * as R from 'ramda'

import * as ReviewState from '@webapp/app/assessment/components/review/reviewState'

export default (target) => {
  const commentsOpen = useSelector((state) => {
    const openThreadTarget = ReviewState.getOpenThreadTarget(state)
    return !R.isEmpty(openThreadTarget) && R.isEmpty(R.difference(openThreadTarget, target))
  })

  return commentsOpen ? 'fra-row-comments__open' : ''
}
