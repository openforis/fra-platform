import React from 'react'
import { useTranslation } from 'react-i18next'

import { AnalysisAndProcessingDescription } from 'meta/assessment/description'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'

import { useCycleRouteParams } from 'client/hooks/routeParams'
import CommentableDescription from 'client/pages/Section/Descriptions/CommentableDescription'

type Props = {
  analysisAndProcessing: AnalysisAndProcessingDescription
}

const AnalysisDescriptions: React.FC<Props> = (props) => {
  const { analysisAndProcessing } = props

  const { t } = useTranslation()
  const { cycleName } = useCycleRouteParams()

  return (
    <div className="descriptions__group">
      <h2 className="headline">{t('description.analysisAndProcessing')}</h2>
      {analysisAndProcessing.estimationAndForecasting && (
        <CommentableDescription
          name={CommentableDescriptionName.estimationAndForecasting}
          repository
          title={t('description.estimationAndForecasting')}
        />
      )}

      {analysisAndProcessing.reclassification && (
        <CommentableDescription
          name={CommentableDescriptionName.reclassification}
          repository
          title={t('description.reclassification', { cycleName })}
        />
      )}
    </div>
  )
}

export default AnalysisDescriptions
