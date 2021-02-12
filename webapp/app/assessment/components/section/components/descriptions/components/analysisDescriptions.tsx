import React from 'react'
import useI18n from '@webapp/components/hooks/useI18n'
import CommentableDescription from './commentableDescription'

type Props = {
  section: string
  disabled: boolean
  showAlertEmptyContent?: boolean
  showDashEmptyContent?: boolean
}

const AnalysisDescriptions = (props: Props) => {
  const { section, disabled, showAlertEmptyContent, showDashEmptyContent } = props
  const i18n = useI18n()
  return (
    <div className="fra-description__container">
      <h2 className="headline fra-description__group-header">{(i18n as any).t('description.analysisAndProcessing')}</h2>
      <CommentableDescription
        title={(i18n as any).t('description.estimationAndForecasting')}
        disabled={disabled}
        section={section}
        name="estimationAndForecasting"
        showAlertEmptyContent={showAlertEmptyContent}
        showDashEmptyContent={showDashEmptyContent}
      />
      <CommentableDescription
        title={(i18n as any).t('description.reclassification')}
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
