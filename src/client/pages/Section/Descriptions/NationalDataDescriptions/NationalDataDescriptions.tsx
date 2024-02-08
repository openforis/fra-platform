import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { CommentableDescriptionName } from 'meta/assessment'
import { NationalDataDescription } from 'meta/assessment/description'

import DataSources from 'client/pages/Section/Descriptions/NationalDataDescriptions/DataSources/DataSources'

import CommentableDescription from '../CommentableDescription'

type Props = {
  sectionName: string
  disabled: boolean
  showAlertEmptyContent?: boolean
  showDashEmptyContent?: boolean
  nationalData: NationalDataDescription
}

type DataSourcesProps = {
  withTable: boolean
  withText: boolean
}

const NationalDataDescriptions: React.FC<Props> = (props) => {
  const { sectionName, disabled, nationalData, showAlertEmptyContent, showDashEmptyContent } = props

  const { t } = useTranslation()

  const dataSourcesProps = useMemo<DataSourcesProps>(() => {
    const withTable = Boolean(nationalData.dataSources?.table)
    const withText = Boolean(nationalData.dataSources?.text)
    return { withTable, withText }
  }, [nationalData.dataSources?.table, nationalData.dataSources?.text])

  return (
    <div className="fra-description__container">
      <h2 className="headline fra-description__group-header">{t('description.nationalData')}</h2>

      {nationalData.dataSources && (
        <CommentableDescription
          title={t<string>('description.dataSourcesPlus')}
          disabled={disabled}
          sectionName={sectionName}
          name={CommentableDescriptionName.dataSources}
          showAlertEmptyContent={showAlertEmptyContent}
          showDashEmptyContent={showDashEmptyContent}
        >
          {dataSourcesProps.withTable && <DataSources nationalData={nationalData} sectionName={sectionName} />}
        </CommentableDescription>
      )}

      {nationalData.nationalClassification && (
        <CommentableDescription
          title={t('description.nationalClassificationAndDefinitions')}
          disabled={disabled}
          sectionName={sectionName}
          name={CommentableDescriptionName.nationalClassificationAndDefinitions}
          showAlertEmptyContent={showAlertEmptyContent}
          showDashEmptyContent={showDashEmptyContent}
        />
      )}

      {nationalData.originalData && (
        <CommentableDescription
          title={t('description.originalData')}
          disabled={disabled}
          sectionName={sectionName}
          name={CommentableDescriptionName.originalData}
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
