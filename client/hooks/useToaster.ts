import { useAppDispatch } from '@client/store'
import { NotificationActions } from '@client/store/ui/notification'
import { v4 as uuidv4 } from 'uuid'

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
      dispatch(NotificationActions.addMessage({ id: uuidv4(), type: 'error', message, duration: 5000 })),
    info: (message: string) =>
      dispatch(NotificationActions.addMessage({ id: uuidv4(), type: 'info', message, duration: 5000 })),
    success: (message: string) =>
      dispatch(NotificationActions.addMessage({ id: uuidv4(), type: 'success', message, duration: 5000 })),
    warning: (message: string) =>
      dispatch(NotificationActions.addMessage({ id: uuidv4(), type: 'warning', message, duration: 5000 })),
  }

  return { toaster }
}
