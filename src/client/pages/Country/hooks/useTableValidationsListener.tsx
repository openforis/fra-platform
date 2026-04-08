import { useEffect } from 'react'

import { CountryIso } from 'meta/area/countryIso'
import { Sockets } from 'meta/socket/sockets'

import { ValidationsActions } from 'client/store/data/tableData/validations/actions'
import { RecordTableValidationsState } from 'client/store/data/tableData/validations/state'
import { useAppDispatch } from 'client/store/hooks'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { SocketClient } from 'client/service/socket/client'

export const useTableValidationsListener = (): void => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const eventName = Sockets.getNodeValidationsUpdateEvent({ countryIso, assessmentName, cycleName })

    const listener = (args: [{ tableValidations: RecordTableValidationsState }]): void => {
      const [{ tableValidations }] = args
      dispatch(ValidationsActions.setNodeValueValidations({ assessmentName, cycleName, countryIso, tableValidations }))
    }

    SocketClient.on(eventName, listener)

    return (): void => {
      SocketClient.off(eventName, listener)
    }
  }, [assessmentName, countryIso, cycleName, dispatch])
}
