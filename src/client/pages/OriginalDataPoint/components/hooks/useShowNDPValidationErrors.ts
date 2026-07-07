import { useODPDisplayHistory } from './useODPDisplayHistory'

type Props = {
  canEdit: boolean
}

export const useShowNDPValidationErrors = (props: Props): boolean => {
  const { canEdit } = props
  const displayHistory = useODPDisplayHistory()

  return canEdit && !displayHistory
}
