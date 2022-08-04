import React from 'react'
import { useTranslation } from 'react-i18next'

import CommentableDescription from '../CommentableDescription'

type Props = {
  section: string
  disabled: boolean
  showAlertEmptyContent?: boolean
  showDashEmptyContent?: boolean
}

const NationalDataDescriptions: React.FC<Props> = (props) => {
  const { section, disabled, showAlertEmptyContent, showDashEmptyContent } = props

  const { i18n } = useTranslation()

  return (
    <div className="fra-description__container">
      <h2 className="headline fra-description__group-header">{i18n.t<string>('description.nationalData')}</h2>
      <CommentableDescription
        title={i18n.t<string>('description.dataSourcesPlus')}
        disabled={disabled}
        section={section}
        name="dataSources"
        showAlertEmptyContent={showAlertEmptyContent}
        showDashEmptyContent={showDashEmptyContent}
      />
      <CommentableDescription
        title={i18n.t<string>('description.nationalClassificationAndDefinitions')}
        disabled={disabled}
        section={section}
        name="nationalClassificationAndDefinitions"
        showAlertEmptyContent={showAlertEmptyContent}
        showDashEmptyContent={showDashEmptyContent}
      />
      <CommentableDescription
        title={i18n.t<string>('description.originalData')}
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
