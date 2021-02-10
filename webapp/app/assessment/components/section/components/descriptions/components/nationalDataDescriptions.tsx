import React from 'react'
import useI18n from '@webapp/components/hooks/useI18n'
import CommentableDescription from './commentableDescription'

type Props = {
  section: string
  disabled: boolean
  showAlertEmptyContent?: boolean
  showDashEmptyContent?: boolean
}

const NationalDataDescriptions = (props: Props) => {
  const { section, disabled, showAlertEmptyContent, showDashEmptyContent } = props
  const i18n = useI18n()
  return (
    <div className="fra-description__container">
      <h2 className="headline fra-description__group-header">{(i18n as any).t('description.nationalData')}</h2>
      <CommentableDescription
        title={(i18n as any).t('description.dataSourcesPlus')}
        disabled={disabled}
        section={section}
        name="dataSources"
        showAlertEmptyContent={showAlertEmptyContent}
        showDashEmptyContent={showDashEmptyContent}
      />
      <CommentableDescription
        title={(i18n as any).t('description.nationalClassificationAndDefinitions')}
        disabled={disabled}
        section={section}
        name="nationalClassificationAndDefinitions"
        showAlertEmptyContent={showAlertEmptyContent}
        showDashEmptyContent={showDashEmptyContent}
      />
      <CommentableDescription
        title={(i18n as any).t('description.originalData')}
        disabled={disabled}
        section={section}
        name="originalData"
        showAlertEmptyContent={showAlertEmptyContent}
        showDashEmptyContent={showDashEmptyContent}
      />
    </div>
  )
}
NationalDataDescriptions.defaultProps = {
  showAlertEmptyContent: false,
  showDashEmptyContent: false,
}
export default NationalDataDescriptions
