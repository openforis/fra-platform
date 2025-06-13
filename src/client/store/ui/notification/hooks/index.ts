import { useAppSelector } from 'client/store/hooks'
import { NotificationSelectors } from 'client/store/ui/notification/selectors'
import { NotificationState } from 'client/store/ui/notification/state'

export const useNotification = (): NotificationState => useAppSelector(NotificationSelectors.getState)
