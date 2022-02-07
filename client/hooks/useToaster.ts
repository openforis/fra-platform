import { useAppDispatch } from '@client/store'
import { NotificationActions } from '@client/store/ui/notification'

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

  const toaster = {
    error: (message: string) =>
      dispatch(NotificationActions.addMessage({ id: Date.now(), type: 'error', message, duration: 5000 })),
    info: (message: string) =>
      dispatch(NotificationActions.addMessage({ id: Date.now(), type: 'info', message, duration: 5000 })),
    success: (message: string) =>
      dispatch(NotificationActions.addMessage({ id: Date.now(), type: 'success', message, duration: 5000 })),
    warning: (message: string) =>
      dispatch(NotificationActions.addMessage({ id: Date.now(), type: 'warning', message, duration: 5000 })),
  }

  return { toaster }
}
