import { useAppSelector } from 'client/store/hooks'
import { NotificationState } from 'client/store/ui/notification/stateType'

export const useNotification = (): NotificationState => useAppSelector((state) => state.ui.notification)
