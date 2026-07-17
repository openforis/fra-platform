import { useEffect } from 'react'

import { CountryIso } from 'meta/area/countryIso'
import { RecordTableValidationsState } from 'meta/assessment/validation/table'
import { Sockets } from 'meta/socket/sockets'

import { SummaryValidationActions } from 'client/store/data/validations/summary/actions'
import { TableValidationActions } from 'client/store/data/validations/tables/actions'
import { useAppDispatch } from 'client/store/hooks'
import { useCanEditCycleData } from 'client/store/user/hooks/auth'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { SocketClient } from 'client/service/socket/client'

type TableValidationsListenerArgs = [{ tableValidations: RecordTableValidationsState }]

export const useTableValidationsListener = (): void => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const canEditData = useCanEditCycleData()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!canEditData) return

    const eventName = Sockets.getTableValidationsUpdateEvent({ countryIso, assessmentName, cycleName })

    const listener = (args: TableValidationsListenerArgs): void => {
      const [{ tableValidations }] = args
      dispatch(
        TableValidationActions.setNodeValueValidations({ assessmentName, cycleName, countryIso, tableValidations })
      )
      dispatch(
        SummaryValidationActions.updateValidationSummary({ assessmentName, countryIso, cycleName, tableValidations })
      )
    }

    SocketClient.on(eventName, listener)

    return (): void => {
      SocketClient.off(eventName, listener)
    }
  }, [assessmentName, canEditData, countryIso, cycleName, dispatch])
}
