import { useEffect } from 'react'

import { Country, CountryIso } from 'meta/area'
import { Sockets } from 'meta/socket'

import { AreaActions } from 'client/store/area/actions'
import { useAppDispatch } from 'client/store/hooks'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { SocketClient } from 'client/service/socket'

export const useCountryUpdateListener = (): void => {
  const dispatch = useAppDispatch()
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  useEffect(() => {
    const eventName = Sockets.getCountryUpdateEvent({ assessmentName, cycleName, countryIso })

    const handleUpdate = (args: [{ country: Country }]): void => {
      const [{ country }] = args
      dispatch(AreaActions.setCountry({ assessmentName, cycleName, country }))
    }

    SocketClient.on(eventName, handleUpdate)
    return () => {
      SocketClient.off(eventName, handleUpdate)
    }
  }, [assessmentName, countryIso, cycleName, dispatch])
}
