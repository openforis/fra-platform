import React from 'react'

import { useI18n } from '@webapp/hooks'

import CommentableDescription from '../CommentableDescription'

type Props = {
  section: string
  disabled: boolean
  showAlertEmptyContent?: boolean
  showDashEmptyContent?: boolean
}

const AnalysisDescriptions: React.FC<Props> = (props) => {
  const { section, disabled, showAlertEmptyContent, showDashEmptyContent } = props

  const i18n = useI18n()

  return (
    <div className="fra-description__container">
      <h2 className="headline fra-description__group-header">{i18n.t('description.analysisAndProcessing')}</h2>
      <CommentableDescription
        title={i18n.t('description.estimationAndForecasting')}
        disabled={disabled}
        section={section}
        name="estimationAndForecasting"
        showAlertEmptyContent={showAlertEmptyContent}
        showDashEmptyContent={showDashEmptyContent}
      />
      <CommentableDescription
        title={i18n.t('description.reclassification')}
        disabled={disabled}
        section={section}
        name="reclassification"
        showAlertEmptyContent={showAlertEmptyContent}
        showDashEmptyContent={showDashEmptyContent}
      />
    </div>
  )
}

AnalysisDescriptions.defaultProps = {
  showAlertEmptyContent: false,
  showDashEmptyContent: false,
}

export default AnalysisDescriptions
