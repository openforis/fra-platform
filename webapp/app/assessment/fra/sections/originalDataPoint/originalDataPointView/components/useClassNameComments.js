import { useSelector } from 'react-redux'
import * as R from 'ramda'

import * as ReviewState from '@webapp/app/assessment/components/review/reviewState'

export default (targetRow) => {
  const commentsOpen = useSelector((state) => {
    const { section, target } = ReviewState.getOpenThread(state) || {}
    return R.equals('odp', section) && R.isEmpty(R.difference(target, targetRow))
  })

  return commentsOpen ? 'fra-row-comments__open' : ''
}
