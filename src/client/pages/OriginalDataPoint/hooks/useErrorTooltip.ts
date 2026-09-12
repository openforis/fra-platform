import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Validation } from 'meta/assessment/validation/validation'
import { TooltipId } from 'meta/tooltip/id'
import { MessageParser } from 'meta/validations/messageParser'
import { Objects } from 'utils/objects'

import { useCanEditCycleData } from 'client/store/user/hooks/auth'
import { useIsPrintRoute } from 'client/hooks/routes'
import { useODPDisplayHistory } from 'client/pages/OriginalDataPoint/components/hooks/useODPDisplayHistory'

type Props = {
  validation?: Validation
}

export type ErrorTooltip = {
  content: string
  id: TooltipId.error
}

export const useErrorTooltip = (props: Props): ErrorTooltip | undefined => {
  const { validation } = props

  const { t } = useTranslation()
  const canEditCycleData = useCanEditCycleData()
  const displayHistory = useODPDisplayHistory()
  const { print } = useIsPrintRoute()

  return useMemo<ErrorTooltip | undefined>(() => {
    if (!canEditCycleData || displayHistory || print) return undefined

    const message = MessageParser.getMessages(t, validation).join('\n')
    return Objects.isEmpty(message) ? undefined : { content: message, id: TooltipId.error }
  }, [canEditCycleData, displayHistory, print, t, validation])
}
