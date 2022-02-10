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

  const notify = (type: string, message: string) =>
    dispatch(NotificationActions.addMessage({ id: UUIDs.v4(), type, message, duration: 5000 }))

  const toaster = {
    error: (message: string) => notify('error', message),
    info: (message: string) => notify('info', message),
    success: (message: string) => notify('success', message),
    warning: (message: string) => notify('warning', message),
  }

  return { toaster }
}
