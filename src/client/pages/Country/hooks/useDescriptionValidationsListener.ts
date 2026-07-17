import { useEffect } from 'react'

import { CountryIso } from 'meta/area/countryIso'
import { SectionName } from 'meta/assessment/section'
import { RecordDescriptionValidations } from 'meta/assessment/validation/description'
import { Sockets } from 'meta/socket/sockets'

import { DescriptionValidationActions } from 'client/store/data/validations/descriptions/actions'
import { SummaryValidationActions } from 'client/store/data/validations/summary/actions'
import { useAppDispatch } from 'client/store/hooks'
import { useCanEditCycleData } from 'client/store/user/hooks/auth'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { SocketClient } from 'client/service/socket/client'

type DescriptionValidationsListenerArgs = [
  {
    descriptionValidations: RecordDescriptionValidations
    sectionNames?: Array<SectionName>
  },
]

export const useDescriptionValidationsListener = (): void => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const canEditData = useCanEditCycleData()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!canEditData) return

    const eventName = Sockets.getDescriptionValidationsUpdateEvent({ countryIso, assessmentName, cycleName })

    // This event covers two flows:
    // - when we verify links for a whole assessment/country, the server sends the full
    //   description validations snapshot, so the client can replace everything
    // - when a user edits a single description, the server sends only the affected sections
    //   plus sectionNames, so the client knows what to patch
    const listener = (args: DescriptionValidationsListenerArgs): void => {
      const [{ descriptionValidations, sectionNames }] = args
      dispatch(
        DescriptionValidationActions.setDescriptionValidations({
          assessmentName,
          countryIso,
          cycleName,
          descriptionValidations,
          sectionNames,
        })
      )
      dispatch(
        SummaryValidationActions.updateValidationSummary({
          assessmentName,
          countryIso,
          cycleName,
          descriptionSectionNames: sectionNames,
          updateDescriptions: true,
        })
      )
    }

    SocketClient.on(eventName, listener)

    return (): void => {
      SocketClient.off(eventName, listener)
    }
  }, [assessmentName, canEditData, countryIso, cycleName, dispatch])
}
