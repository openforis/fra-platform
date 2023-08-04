import { useEffect } from 'react'

import { useIsAppInitialized } from 'client/store/assessment'
import { SocketClient } from 'client/service/socket'

export const useOpenSocket = (): void => {
  const isAppInitialized = useIsAppInitialized()

  useEffect(() => {
    if (isAppInitialized) {
      SocketClient.open()

      return () => {
        SocketClient.close()
      }
    }

    return undefined
  }, [isAppInitialized])
}
