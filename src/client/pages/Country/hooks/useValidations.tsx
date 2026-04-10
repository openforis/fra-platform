import { useEffect } from 'react'

import { CountryIso } from 'meta/area/countryIso'
import { Sockets } from 'meta/socket/sockets'

import { ValidationsActions } from 'client/store/data/tableData/validations/actions'
import { RecordTableValidationsState } from 'client/store/data/tableData/validations/state'
import { useAppDispatch } from 'client/store/hooks'
import { useCanEditCycleData } from 'client/store/user/hooks/auth'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { SocketClient } from 'client/service/socket/client'

export const useValidations = (): void => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const canEditData = useCanEditCycleData()
  const dispatch = useAppDispatch()

  // Init validations summary
  useEffect(() => {
    if (!canEditData) return

    dispatch(ValidationsActions.getSummary({ assessmentName, cycleName, countryIso }))
  }, [assessmentName, canEditData, countryIso, cycleName, dispatch])

  // Susbscribe to validation updates
  useEffect(() => {
    if (!canEditData) return

    const eventName = Sockets.getTableValidationsUpdateEvent({ countryIso, assessmentName, cycleName })

    const listener = (args: [{ tableValidations: RecordTableValidationsState }]): void => {
      const [{ tableValidations }] = args
      dispatch(ValidationsActions.setNodeValueValidations({ assessmentName, cycleName, countryIso, tableValidations }))
    }

    SocketClient.on(eventName, listener)

    return (): void => {
      SocketClient.off(eventName, listener)
    }
  }, [assessmentName, canEditData, countryIso, cycleName, dispatch])

  // Cleanup validations on unmount
  useEffect(() => {
    return (): void => {
      dispatch(ValidationsActions.removeValidations({ assessmentName, cycleName, countryIso }))
    }
  }, [assessmentName, countryIso, cycleName, dispatch])
}
