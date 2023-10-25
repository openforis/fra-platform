import React from 'react'
import { useTranslation } from 'react-i18next'

import { CommentableDescriptionName } from 'meta/assessment'
import { AnalysisAndProcessingDescription } from 'meta/assessment/description'

import { useCycle } from 'client/store/assessment'

import CommentableDescription from '../CommentableDescription'

type Props = {
  sectionName: string
  disabled: boolean
  showAlertEmptyContent?: boolean
  showDashEmptyContent?: boolean
  analysisAndProcessing: AnalysisAndProcessingDescription
}

const AnalysisDescriptions: React.FC<Props> = (props) => {
  const { analysisAndProcessing, sectionName, disabled, showAlertEmptyContent, showDashEmptyContent } = props
  const cycle = useCycle()

  const { t } = useTranslation()

  return (
    <div className="fra-description__container">
      <h2 className="headline fra-description__group-header">{t('description.analysisAndProcessing')}</h2>
      {analysisAndProcessing.estimationAndForecasting && (
        <CommentableDescription
          title={t('description.estimationAndForecasting')}
          disabled={disabled}
          sectionName={sectionName}
          name={CommentableDescriptionName.estimationAndForecasting}
          showAlertEmptyContent={showAlertEmptyContent}
          showDashEmptyContent={showDashEmptyContent}
        />
      )}
      {analysisAndProcessing.reclassification && (
        <CommentableDescription
          title={t('description.reclassification', { cycleName: cycle.name })}
          disabled={disabled}
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
