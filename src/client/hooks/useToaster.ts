import { useMemo } from 'react'

import { UUIDs } from 'meta/uuid'

import { useAppDispatch } from 'client/store/hooks'
import { NotificationActions } from 'client/store/ui/notification'

export type ToasterHook = {
  toaster: {
    error: (message: string) => void
    info: (message: string) => void
    success: (message: string) => void
    warning: (message: string) => void
  }
}

export const useToaster = (): ToasterHook => {
  const dispatch = useAppDispatch()

  const toaster = useMemo(() => {
    const notify = (type: string, message: string, duration?: number) =>
      dispatch(NotificationActions.addMessage({ id: UUIDs.getUuid(), type, message, duration }))

    return {
      error: (message: string, duration?: number) => notify('error', message, duration),
      info: (message: string, duration?: number) => notify('info', message, duration || 5000),
      success: (message: string, duration?: number) => notify('success', message, duration || 5000),
      warning: (message: string, duration?: number) => notify('warning', message, duration || 5000),
    }
  }, [dispatch])

  return { toaster }
}
