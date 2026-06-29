import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { NationalDataPointValidations } from 'meta/assessment/validation/nationalDataPointValidations'
import { TooltipId } from 'meta/tooltip/id'

import { useHistoryLastApprovedIsActive } from 'client/store/data/history/hooks/lastApproved'
import { useOriginalDataPointReservedYears } from 'client/store/data/originalDataPoint/hooks/originalDataPoint'
import { useNationalDataPointValidation } from 'client/store/data/tableData/validations/hooks/nationalDataPoints'

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
  const reservedYears = useOriginalDataPointReservedYears() ?? []
  const uuid = reservedYears.find((reservedYear) => reservedYear.id === odpId)?.uuid
  const validation = useNationalDataPointValidation({ uuid })
  const hasError = !historyLastApprovedIsActive && Boolean(uuid) && NationalDataPointValidations.hasError(validation)

  return useMemo<OdpHeaderTooltip>(() => {
    if (hasError) {
      return { content: t('nationalDataPoint.clickOnNDPWithErrors'), id: TooltipId.error }
    }

    return { content: t('nationalDataPoint.clickOnNDP'), id: TooltipId.info }
  }, [hasError, t])
}
