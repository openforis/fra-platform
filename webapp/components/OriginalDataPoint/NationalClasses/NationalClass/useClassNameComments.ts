import { useSelector } from 'react-redux'

import { Arrays, Objects } from '@core/utils'
import * as ReviewState from '@webapp/app/assessment/components/review/reviewState'

export default (targetRow: Array<string>): string => {
  const commentsOpen = useSelector((state) => {
    const { section, target }: any = ReviewState.getOpenThread(state) || {}
    return Objects.isEqual('odp', section) && Objects.isEmpty(Arrays.difference(target, targetRow))
  })

  return commentsOpen ? 'fra-row-comments__open' : ''
}
