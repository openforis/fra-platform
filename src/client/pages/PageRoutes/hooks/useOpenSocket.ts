import { useEffect } from 'react'

import { SocketClient } from 'client/service/socket'

export const useOpenSocket = (): void => {
  useEffect(() => {
    SocketClient.open()

    return () => {
      SocketClient.close()
    }
  }, [])
}
