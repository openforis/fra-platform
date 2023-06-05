import { useAppSelector } from 'client/store'
import { NotificationState } from 'client/store/ui/notification/stateType'

export const useNotification = (): NotificationState => useAppSelector((state) => state.ui.notification)
