import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { CommentableDescriptionName } from 'meta/assessment'
import { NationalDataDescription } from 'meta/assessment/description'

import CommentableDescription from 'client/pages/Section/Descriptions/CommentableDescription'
import DataSources from 'client/pages/Section/Descriptions/NationalDataDescriptions/DataSources/DataSources'

type Props = {
  nationalData: NationalDataDescription
  sectionName: string
  showAlertEmptyContent?: boolean
  showDashEmptyContent?: boolean
}

type DataSourcesProps = {
  withTable: boolean
  withText: boolean
}

const NationalDataDescriptions: React.FC<Props> = (props) => {
  const { sectionName, nationalData, showAlertEmptyContent, showDashEmptyContent } = props

  const { t } = useTranslation()

  const dataSourcesProps = useMemo<DataSourcesProps>(() => {
    const withTable = Boolean(nationalData.dataSources?.table)
    const withText = Boolean(nationalData.dataSources?.text)
    return { withTable, withText }
  }, [nationalData.dataSources?.table, nationalData.dataSources?.text])

  return (
    <div className="descriptions__group">
      <h2 className="headline">{t('description.nationalData')}</h2>

      {nationalData.dataSources && (
        <CommentableDescription
          title={t<string>('description.dataSourcesPlus')}
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
          sectionName={sectionName}
          name={CommentableDescriptionName.nationalClassificationAndDefinitions}
          showAlertEmptyContent={showAlertEmptyContent}
          showDashEmptyContent={showDashEmptyContent}
        />
      )}

      {nationalData.originalData && (
        <CommentableDescription
          title={t('description.originalData')}
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
