import React from 'react'
import { useTranslation } from 'react-i18next'

import { CommentableDescriptionName } from 'meta/assessment'
import { AnalysisAndProcessingDescription } from 'meta/assessment/description'

import { useCycle } from 'client/store/assessment'
import CommentableDescription from 'client/pages/Section/Descriptions/CommentableDescription'

type Props = {
  sectionName: string
  showAlertEmptyContent?: boolean
  showDashEmptyContent?: boolean
  analysisAndProcessing: AnalysisAndProcessingDescription
}

const AnalysisDescriptions: React.FC<Props> = (props) => {
  const { analysisAndProcessing, sectionName, showAlertEmptyContent, showDashEmptyContent } = props
  const cycle = useCycle()

  const { t } = useTranslation()

  return (
    <div className="descriptions__group">
      <h2 className="headline">{t('description.analysisAndProcessing')}</h2>
      {analysisAndProcessing.estimationAndForecasting && (
        <CommentableDescription
          title={t('description.estimationAndForecasting')}
          sectionName={sectionName}
          name={CommentableDescriptionName.estimationAndForecasting}
          showAlertEmptyContent={showAlertEmptyContent}
          showDashEmptyContent={showDashEmptyContent}
        />
      )}

      {analysisAndProcessing.reclassification && (
        <CommentableDescription
          title={t('description.reclassification', { cycleName: cycle.name })}
          sectionName={sectionName}
          name={CommentableDescriptionName.reclassification}
          showAlertEmptyContent={showAlertEmptyContent}
          showDashEmptyContent={showDashEmptyContent}
        />
      )}
    </div>
  )
}

AnalysisDescriptions.defaultProps = {
  showAlertEmptyContent: false,
  showDashEmptyContent: false,
}

export default AnalysisDescriptions
