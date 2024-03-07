import React from 'react'
import { useTranslation } from 'react-i18next'

import { CommentableDescriptionName } from 'meta/assessment'
import { AnalysisAndProcessingDescription } from 'meta/assessment/description'

import { useCycleRouteParams } from 'client/hooks/useRouteParams'
import CommentableDescription from 'client/pages/Section/Descriptions/CommentableDescription'

type Props = {
  showDashEmptyContent?: boolean
  analysisAndProcessing: AnalysisAndProcessingDescription
}

const AnalysisDescriptions: React.FC<Props> = (props) => {
  const { analysisAndProcessing, showDashEmptyContent } = props

  const { t } = useTranslation()
  const { cycleName } = useCycleRouteParams()

  return (
    <div className="descriptions__group">
      <h2 className="headline">{t('description.analysisAndProcessing')}</h2>
      {analysisAndProcessing.estimationAndForecasting && (
        <CommentableDescription
          name={CommentableDescriptionName.estimationAndForecasting}
          showDashEmptyContent={showDashEmptyContent}
          title={t('description.estimationAndForecasting')}
        />
      )}

      {analysisAndProcessing.reclassification && (
        <CommentableDescription
          name={CommentableDescriptionName.reclassification}
          showDashEmptyContent={showDashEmptyContent}
          title={t('description.reclassification', { cycleName })}
        />
      )}
    </div>
  )
}

AnalysisDescriptions.defaultProps = {
  showDashEmptyContent: false,
}

export default AnalysisDescriptions
