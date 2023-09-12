import React from 'react'
import { useTranslation } from 'react-i18next'

import { NationalDataDescription } from 'meta/assessment/description'

import CommentableDescription from '../CommentableDescription'

type Props = {
  sectionName: string
  disabled: boolean
  showAlertEmptyContent?: boolean
  showDashEmptyContent?: boolean
  nationalData: NationalDataDescription
}

const NationalDataDescriptions: React.FC<Props> = (props) => {
  const { sectionName, disabled, nationalData, showAlertEmptyContent, showDashEmptyContent } = props

  const { i18n } = useTranslation()

  return (
    <div className="fra-description__container">
      <h2 className="headline fra-description__group-header">{i18n.t<string>('description.nationalData')}</h2>
      {nationalData.dataSources && (
        <CommentableDescription
          title={i18n.t<string>('description.dataSourcesPlus')}
          disabled={disabled}
          sectionName={sectionName}
          name="dataSources"
          showAlertEmptyContent={showAlertEmptyContent}
          showDashEmptyContent={showDashEmptyContent}
        />
      )}
      {nationalData.nationalClassification && (
        <CommentableDescription
          title={i18n.t<string>('description.nationalClassificationAndDefinitions')}
          disabled={disabled}
          sectionName={sectionName}
          name="nationalClassificationAndDefinitions"
          showAlertEmptyContent={showAlertEmptyContent}
          showDashEmptyContent={showDashEmptyContent}
        />
      )}
      {nationalData.originalData && (
        <CommentableDescription
          title={i18n.t<string>('description.originalData')}
          disabled={disabled}
          sectionName={sectionName}
          name="originalData"
          showAlertEmptyContent={showAlertEmptyContent}
          showDashEmptyContent={showDashEmptyContent}
        />
      )}
    </div>
  )
}

NationalDataDescriptions.defaultProps = {
  showAlertEmptyContent: false,
  showDashEmptyContent: false,
}

export default NationalDataDescriptions
