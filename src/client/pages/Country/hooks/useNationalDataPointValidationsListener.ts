import { useEffect } from 'react'

import { CountryIso } from 'meta/area/countryIso'
import { RecordNDPValidations } from 'meta/assessment/validation/nationalDataPoint'
import { Sockets } from 'meta/socket/sockets'

import { ValidationsActions } from 'client/store/data/validations/actions'
import { useAppDispatch } from 'client/store/hooks'
import { useCanEditCycleData } from 'client/store/user/hooks/auth'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { SocketClient } from 'client/service/socket/client'

type NationalDataPointValidationsListenerArgs = [{ validations: RecordNDPValidations }]

export const useNationalDataPointValidationsListener = (): void => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const canEditData = useCanEditCycleData()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!canEditData) return

    const eventName = Sockets.getNationalDataPointValidationsUpdateEvent({ countryIso, assessmentName, cycleName })

    const listener = (args: NationalDataPointValidationsListenerArgs): void => {
      const [{ validations }] = args
      dispatch(
        ValidationsActions.updateNationalDataPointValidations({ assessmentName, cycleName, countryIso, validations })
      )
    }

    SocketClient.on(eventName, listener)

    return (): void => {
      SocketClient.off(eventName, listener)
    }
  }, [assessmentName, canEditData, countryIso, cycleName, dispatch])
}
