import { useEffect } from 'react'

import { CountryIso } from 'meta/area/countryIso'
import { CommentableDescriptionName, CommentableDescriptionValue } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'
import { Sockets } from 'meta/socket/sockets'

import { DescriptionsActions } from 'client/store/data/descriptions/actions'
import { useAppDispatch } from 'client/store/hooks'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { SocketClient } from 'client/service/socket/client'

type DescriptionUpdateListenerArgs = [
  {
    name: CommentableDescriptionName
    sectionName: SectionName
    value: CommentableDescriptionValue
  },
]

export const useDescriptionUpdateListener = (): void => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const eventName = Sockets.getDescriptionUpdateEvent({ assessmentName, countryIso, cycleName })

    const listener = (args: DescriptionUpdateListenerArgs): void => {
      const [{ name, sectionName, value }] = args
      dispatch(DescriptionsActions.setDescription({ assessmentName, countryIso, cycleName, name, sectionName, value }))
    }

    SocketClient.on(eventName, listener)

    return (): void => {
      SocketClient.off(eventName, listener)
    }
  }, [assessmentName, countryIso, cycleName, dispatch])
}
