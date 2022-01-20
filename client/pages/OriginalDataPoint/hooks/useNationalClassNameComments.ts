import { Arrays, Objects } from '@core/utils'
import { useAppSelector } from '@client/store'

export const useNationalClassNameComments = (targetRow: Array<string>): string => {
  const commentsOpen = useAppSelector((_state) => {
    const { section, target }: any = {} // TODO: ReviewState.getOpenThread(state) || {}
    return Objects.isEqual('odp', section) && Objects.isEmpty(Arrays.difference(target, targetRow))
  })

  return commentsOpen ? 'fra-row-comments__open' : ''
}
