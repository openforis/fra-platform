import { useEffect } from 'react'

import { CountryIso } from 'meta/area/countryIso'
import { Sockets } from 'meta/socket/sockets'
import { UUID } from 'meta/uuid/uuid'

import { ValidationsActions } from 'client/store/data/tableData/validations/actions'
import { useAppDispatch } from 'client/store/hooks'
import { useCanEditCycleData } from 'client/store/user/hooks/auth'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { SocketClient } from 'client/service/socket/client'

type NationalDataPointValidationDeleteListenerArgs = [{ uuid: UUID }]

export const useNationalDataPointValidationDeleteListener = (): void => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const canEditData = useCanEditCycleData()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!canEditData) return

    const eventName = Sockets.getNationalDataPointValidationDeleteEvent({ countryIso, assessmentName, cycleName })

    const listener = (args: NationalDataPointValidationDeleteListenerArgs): void => {
      const [{ uuid }] = args
      dispatch(
        ValidationsActions.deleteNationalDataPointValidation({
          assessmentName,
          cycleName,
          countryIso,
          uuid,
        })
      )
    }

    SocketClient.on(eventName, listener)

    return (): void => {
      SocketClient.off(eventName, listener)
    }
  }, [assessmentName, canEditData, countryIso, cycleName, dispatch])
}
