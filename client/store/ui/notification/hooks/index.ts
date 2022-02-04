import { useAppSelector } from '@client/store'
import { NotificationState } from '../stateType'

export const useNotification = (): NotificationState | undefined => useAppSelector((state) => state.ui.notification)
