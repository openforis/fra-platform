import React from 'react'
import { useTranslation } from 'react-i18next'

import { Cycles } from 'meta/assessment/cycles'
import { AnalysisAndProcessingDescription } from 'meta/assessment/description'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'

import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useCycle } from 'client/store/meta/hooks/cycles'
import CommentableDescription from 'client/pages/Section/Descriptions/CommentableDescription'

type Props = {
  analysisAndProcessing: AnalysisAndProcessingDescription
}

const AnalysisDescriptions: React.FC<Props> = (props) => {
  const { analysisAndProcessing } = props

  const { t } = useTranslation()
  const assessment = useAssessment()
  const cycle = useCycle()
  const { name: cycleName } = Cycles.getFirstYearlyCycle({ assessment, cycle })

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
