import { useEffect } from 'react'

import { CountryIso } from 'meta/area'
import { ODPReservedYear } from 'meta/assessment'
import { Sockets } from 'meta/socket'

import { useAppDispatch } from 'client/store'
import { OriginalDataPointActions } from 'client/store/ui/originalDataPoint'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { SocketClient } from 'client/service/socket'

export const useListenReservedYearsChange = (): void => {
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()
  const props = { assessmentName, cycleName, countryIso: countryIso as CountryIso }
  const odpReservedYearsEvent = Sockets.getODPReservedYearsEvent(props)

  useEffect(() => {
    const listener = (args: [{ years: Array<ODPReservedYear> }]): void => {
      const [{ years }] = args
      dispatch(OriginalDataPointActions.setReservedYears(years))
    }

    SocketClient.on(odpReservedYearsEvent, listener)
    return () => {
      SocketClient.off(odpReservedYearsEvent, listener)
    }
  }, [dispatch, odpReservedYearsEvent])
}

export const useReservedYears = () => {
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()

  useListenReservedYearsChange()

  useEffect(() => {
    dispatch(
      OriginalDataPointActions.getOriginalDataPointReservedYears({
        countryIso: countryIso as CountryIso,
        assessmentName,
        cycleName,
      })
    )
  }, [assessmentName, countryIso, cycleName, dispatch])
}
