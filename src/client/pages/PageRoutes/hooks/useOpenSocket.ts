import { useEffect } from 'react'

import { SocketClient } from 'client/service/socket/client'

export const useOpenSocket = (): void => {
  useEffect(() => {
    SocketClient.open()

    return () => {
      SocketClient.close()
    }
  }, [])
}
