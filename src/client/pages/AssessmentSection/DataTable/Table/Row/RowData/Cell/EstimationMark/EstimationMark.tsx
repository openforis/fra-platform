import './EstimationMark.scss'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { TFunction, useTranslation } from 'react-i18next'

import { NodeValuesEstimation } from 'meta/assessment'
import { TooltipId } from 'meta/tooltip'

import { useNodeValuesEstimations } from 'client/store/data'

type Props = {
  estimationUuid: string
  variableName: string
}

const getEstimationDetails = (tableEstimation: NodeValuesEstimation, variableName: string, t: TFunction) => {
  if (!tableEstimation) return null

  const { method, variables } = tableEstimation

  const variableOptions = variables[variableName]

  const { changeRates } = variableOptions

  return ReactDOMServer.renderToStaticMarkup(
    <div>
      {t(`tableWithOdp.${method}Extrapolation`)}
      {changeRates && (
        <>
          <div>{`${t('tableWithOdp.placeholderPast')}: ${changeRates.ratePast}`}</div>
          <div>{`${t('tableWithOdp.placeholderFuture')}: ${changeRates.rateFuture}`}</div>
        </>
      )}
    </div>
  )
}

const EstimationMark: React.FC<Props> = (props) => {
  const { estimationUuid, variableName } = props

  const tableEstimations = useNodeValuesEstimations()
  const { t } = useTranslation()

  const tableEstimation = tableEstimations[estimationUuid]

  return (
    <div
      className="estimation-mark"
      data-tooltip-id={TooltipId.info}
      data-tooltip-html={getEstimationDetails(tableEstimation, variableName, t)}
    >
      E
    </div>
  )
}

export default EstimationMark
