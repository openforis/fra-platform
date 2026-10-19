import React, { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { Dates } from 'utils/dates'

import { useAssessmentCountry } from 'client/store/area/hooks/country'
import { useNodeValuesEstimation } from 'client/store/data/tableData/estimations/hooks/useNodeValuesEstimation'
import Icon from 'client/components/Icon'
import { TooltipProps } from 'client/components/Tooltips/type'

import { Props } from '../props'

type Returned = {
  node: ReactNode
  tooltip: TooltipProps
}

export const useEstimationDetails = (props: Props): Returned => {
  const { estimationUuid, variableName } = props

  const { t } = useTranslation()
  const tableEstimation = useNodeValuesEstimation({ estimationUuid })
  const country = useAssessmentCountry()
  const odpLastUpdatedTimestamp = country.lastEditOdp

  if (!tableEstimation) {
    return { node: '', tooltip: undefined }
  }

  const { createdAt, method, variables } = tableEstimation
  const variableOptions = variables[variableName]
  const { changeRates } = variableOptions
  const executedBeforeOdpUpdate =
    createdAt &&
    odpLastUpdatedTimestamp &&
    Dates.isBefore(Dates.parseISO(createdAt), Dates.parseISO(odpLastUpdatedTimestamp))

  const node = (
    <div className="table-grid__data-cell-flag-estimate">
      {executedBeforeOdpUpdate && <Icon className="icon-middle" name="alert" />}E
    </div>
  )

  const content: ReactNode = (
    <div>
      {t(`tableWithOdp.${method}Extrapolation`)}
      {changeRates && (
        <>
          <div>{`${t('tableWithOdp.placeholderPast')}: ${changeRates.ratePast}`}</div>
          <div>{`${t('tableWithOdp.placeholderFuture')}: ${changeRates.rateFuture}`}</div>
        </>
      )}
      {executedBeforeOdpUpdate && (
        <div className="table-grid__data-cell-flag-estimate tooltipMessage">
          <Icon className="icon-middle" name="alert" /> {t('page.assessmentSection.odpUpdatedAfterEstimatingThisCell')}
        </div>
      )}
    </div>
  )

  return { node, tooltip: { content } }
}
