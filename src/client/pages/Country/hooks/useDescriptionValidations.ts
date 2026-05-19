import { useEffect } from 'react'

import { CountryIso } from 'meta/area/countryIso'
import { SectionName } from 'meta/assessment/section'
import { RecordDescriptionValidations } from 'meta/assessment/validation/description'
import { Sockets } from 'meta/socket/sockets'

// import { ValidationsActions } from 'client/store/data/tableData/validations/actions'
import { useAppDispatch } from 'client/store/hooks'
import { useCanEditCycleData } from 'client/store/user/hooks/auth'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { SocketClient } from 'client/service/socket/client'

export const useDescriptionValidations = (): void => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const canEditData = useCanEditCycleData()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!canEditData) return

    const eventName = Sockets.getDescriptionLinksValidationUpdateEvent({ countryIso, assessmentName, cycleName })

    const listener = (
      args: [
        {
          countryIso: CountryIso
          descriptionValidations: RecordDescriptionValidations
          sectionNames: Array<SectionName>
        },
      ]
    ): void => {
      void args
      // const [{ descriptionValidations, sectionNames }] = args
      // TODO: dispatch(ValidationsActions.setDescriptionValidations())
    }

    SocketClient.on(eventName, listener)

    return (): void => {
      SocketClient.off(eventName, listener)
    }
  }, [assessmentName, canEditData, countryIso, cycleName, dispatch])
}
