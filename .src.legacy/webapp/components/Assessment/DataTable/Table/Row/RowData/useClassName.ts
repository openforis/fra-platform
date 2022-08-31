import { useSelector } from 'react-redux'

import { Arrays, Objects } from '@core/utils'
import * as ReviewState from '@webapp/app/assessment/components/review/reviewState'

export default (target: Array<string>): string => {
  const commentsOpen = useSelector((state) => {
    const openThreadTarget: Array<string> = ReviewState.getOpenThreadTarget(state) as Array<string>
    return !Objects.isEmpty(openThreadTarget) && Objects.isEmpty(Arrays.difference(openThreadTarget, target))
  })

  return commentsOpen ? 'fra-row-comments__open' : ''
}
