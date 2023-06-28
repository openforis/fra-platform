import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { useTranslation } from 'react-i18next'

import { useNodeValuesEstimation } from 'client/store/data'

import { Props } from '../props'

export const useEstimationDetails = (props: Props): string | undefined => {
  const { estimationUuid, variableName } = props

  const { t } = useTranslation()
  const tableEstimation = useNodeValuesEstimation({ estimationUuid })

  if (!tableEstimation) {
    return undefined
  }

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
