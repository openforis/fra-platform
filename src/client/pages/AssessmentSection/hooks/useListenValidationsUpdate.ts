import { useEffect } from 'react'

import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'
import { NodeUpdates } from '@meta/data'
import { Sockets } from '@meta/socket'

import { useAppDispatch } from '@client/store'
import { AssessmentSectionActions } from '@client/store/pages/assessmentSection'
import { SocketClient } from '@client/service/socket'

type Props = {
  countryIso: CountryIso
  assessmentName: AssessmentName
  cycleName: string
  canEditTableData: boolean
}

export const useListenValidationsUpdate = (props: Props): void => {
  const { assessmentName, canEditTableData, cycleName, countryIso } = props

  const dispatch = useAppDispatch()
  const nodeUpdateEvent = Sockets.getNodeValidationsUpdateEvent({ assessmentName, cycleName, countryIso })

  useEffect(() => {
    if (canEditTableData) {
      const listener = (args: [{ validations: NodeUpdates }]): void => {
        const [{ validations }] = args
        dispatch(AssessmentSectionActions.setNodeValues({ nodeUpdates: validations }))
      }

      SocketClient.on(nodeUpdateEvent, listener)

      return () => {
        SocketClient.off(nodeUpdateEvent, listener)
      }
    }
    return undefined
  }, [canEditTableData, dispatch, nodeUpdateEvent])
}
