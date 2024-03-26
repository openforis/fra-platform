import { Objects } from 'utils/objects'

import { useHistory } from './useHistory'

export const useHistoryActive = (): boolean => {
  const history = useHistory()
  return !Objects.isEmpty(history.items)
}
