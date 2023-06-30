import React, { ReactNode } from 'react'
import ReactDOMServer from 'react-dom/server'
import { useTranslation } from 'react-i18next'

import { Dates } from 'utils/dates'

import { useNodeValuesEstimation, useOdpLastUpdatedTimestamp } from 'client/store/data'
import Icon from 'client/components/Icon'

import { Props } from '../props'

type Returned = {
  node: ReactNode
  tooltipContent?: string
}

export const useEstimationDetails = (props: Props): Returned => {
  const { estimationUuid, variableName } = props

  const { t } = useTranslation()
  const tableEstimation = useNodeValuesEstimation({ estimationUuid })
  const { time: odpLastUpdatedTimestamp } = useOdpLastUpdatedTimestamp()
  if (!tableEstimation) {
    return { node: '', tooltipContent: undefined }
  }

  const { createdAt, method, variables } = tableEstimation
  const variableOptions = variables[variableName]
  const { changeRates } = variableOptions
  const executedBeforeOdpUpdate = Dates.isBefore(Dates.parseISO(createdAt), Dates.parseISO(odpLastUpdatedTimestamp))

  const node = (
    <div className="data-cell__flag-estimate">
      {executedBeforeOdpUpdate && <Icon name="alert" className="icon-middle" />}E
    </div>
  )

  const tooltipContent = ReactDOMServer.renderToStaticMarkup(
    <div>
      {t(`tableWithOdp.${method}Extrapolation`)}
      {changeRates && (
        <>
          <div>{`${t('tableWithOdp.placeholderPast')}: ${changeRates.ratePast}`}</div>
          <div>{`${t('tableWithOdp.placeholderFuture')}: ${changeRates.rateFuture}`}</div>
        </>
      )}
      {executedBeforeOdpUpdate && (
        <div className="data-cell__flag-estimate tooltipMessage">
          <Icon name="alert" className="icon-middle" /> {t('page.assessmentSection.odpUpdatedAfterEstimatingThisCell')}
        </div>
      )}
    </div>
  )

  return { node, tooltipContent }
}
