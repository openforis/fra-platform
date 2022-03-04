import { useAppDispatch } from '@client/store'
import { NotificationActions } from '@client/store/ui/notification'
import { UUIDs } from '@core/utils'

type Toaster = {
  toaster: {
    error: (message: string) => void
    info: (message: string) => void
    success: (message: string) => void
    warning: (message: string) => void
  }
}

export const useToaster = (): Toaster => {
  const dispatch = useAppDispatch()

  const notify = (type: string, message: string, duration?: number) =>
    dispatch(NotificationActions.addMessage({ id: UUIDs.v4(), type, message, duration }))

  const toaster = {
    error: (message: string, duration?: number) => notify('error', message, duration),
    info: (message: string, duration?: number) => notify('info', message, duration),
    success: (message: string, duration?: number) => notify('success', message, duration),
    warning: (message: string, duration?: number) => notify('warning', message, duration),
  }

  return { toaster }
}
