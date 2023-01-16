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
  const { assessmentName, cycleName, countryIso } = props
  const { canEditTableData } = props
  const dispatch = useAppDispatch()

  useEffect(() => {
    const nodeUpdateEvent = Sockets.getNodeValidationsUpdateEvent({ assessmentName, cycleName, countryIso })

    const listener = (args: [{ validations: NodeUpdates }]): void => {
      const [{ validations }] = args
      dispatch(AssessmentSectionActions.setNodeValues({ countryIso, nodeUpdates: validations }))
    }

    if (canEditTableData) {
      SocketClient.on(nodeUpdateEvent, listener)
    }

    return () => {
      SocketClient.off(nodeUpdateEvent, listener)
    }
  }, [assessmentName, cycleName, countryIso, canEditTableData, dispatch])
}
