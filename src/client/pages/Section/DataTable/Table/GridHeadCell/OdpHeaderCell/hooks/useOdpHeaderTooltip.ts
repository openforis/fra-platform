import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { NationalDataPointValidations } from 'meta/assessment/validation/nationalDataPointValidations'
import { TooltipId } from 'meta/tooltip/id'

import { useHistoryLastApprovedIsActive } from 'client/store/data/history/hooks/lastApproved'
import { useNationalDataPointValidation } from 'client/store/data/validations/hooks/nationalDataPoints'

type Props = {
  odpId?: number
}

type OdpHeaderTooltip = {
  content: string
  id: TooltipId
}

export const useOdpHeaderTooltip = (props: Props): OdpHeaderTooltip => {
  const { odpId } = props

  const { t } = useTranslation()
  const historyLastApprovedIsActive = useHistoryLastApprovedIsActive()
  const validation = useNationalDataPointValidation({ odpId })
  const hasError = !historyLastApprovedIsActive && NationalDataPointValidations.hasError(validation)

  return useMemo<OdpHeaderTooltip>(() => {
    const content = t('nationalDataPoint.clickOnNDP')
    if (hasError) {
      return { content, id: TooltipId.error }
    }

    return { content, id: TooltipId.info }
  }, [hasError, t])
}
