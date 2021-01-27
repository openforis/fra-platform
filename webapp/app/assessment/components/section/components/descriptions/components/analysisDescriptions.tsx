import React from 'react'
import useI18n from '@webapp/components/hooks/useI18n'
import CommentableDescription from './commentableDescription'

type OwnProps = {
  section: string
  disabled: boolean
  showAlertEmptyContent?: boolean
  showDashEmptyContent?: boolean
}
// @ts-expect-error ts-migrate(2456) FIXME: Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof AnalysisDescriptions.defaultProps
// @ts-expect-error ts-migrate(7022) FIXME: 'AnalysisDescriptions' implicitly has type 'any' b... Remove this comment to see the full error message
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
