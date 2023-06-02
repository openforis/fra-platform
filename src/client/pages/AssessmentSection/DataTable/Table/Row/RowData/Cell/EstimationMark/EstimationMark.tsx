import './EstimationMark.scss'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { TFunction, useTranslation } from 'react-i18next'

import { NodeValuesEstimation } from '@meta/assessment'
import { TooltipId } from '@meta/tooltip'

import { useTableEstimations } from '@client/store/data'

type Props = {
  estimationUuid: string
}

const getEstimationDetails = (tableEstimation: NodeValuesEstimation, t: TFunction) => {
  if (!tableEstimation) return null

  const { method } = tableEstimation

  return ReactDOMServer.renderToStaticMarkup(
    <div>
      <div>
        {t('common.method')}: {t(`tableWithOdp.${method}Extrapolation`)}
      </div>
    </div>
  )
}

const EstimationMark: React.FC<Props> = (props) => {
  const { estimationUuid } = props

  const tableEstimations = useTableEstimations()
  const { t } = useTranslation()

  const tableEstimation = tableEstimations[estimationUuid]

  return (
    <div
      className="estimation-mark"
      data-tooltip-id={TooltipId.info}
      data-tooltip-html={getEstimationDetails(tableEstimation, t)}
    >
      E
    </div>
  )
}

export default EstimationMark
