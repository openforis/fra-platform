import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { CommentableDescriptionName } from 'meta/assessment'
import { NationalDataDescription } from 'meta/assessment/description'

import CommentableDescription from 'client/pages/Section/Descriptions/CommentableDescription'
import DataSources from 'client/pages/Section/Descriptions/NationalDataDescriptions/DataSources/DataSources'

type Props = {
  nationalData: NationalDataDescription
  sectionName: string
  showDashEmptyContent?: boolean
}

type DataSourcesProps = {
  withTable: boolean
  withText: boolean
}

const NationalDataDescriptions: React.FC<Props> = (props) => {
  const { sectionName, nationalData, showDashEmptyContent } = props

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
        <>
          {dataSourcesProps.withTable && <DataSources nationalData={nationalData} sectionName={sectionName} />}

          {!dataSourcesProps.withTable && (
            <CommentableDescription
              name={CommentableDescriptionName.dataSources}
              sectionName={sectionName}
              showDashEmptyContent={showDashEmptyContent}
              title={t('description.dataSourcesPlus')}
            />
          )}
        </>
      )}

      {nationalData.nationalClassification && (
        <CommentableDescription
          name={CommentableDescriptionName.nationalClassificationAndDefinitions}
          sectionName={sectionName}
          showDashEmptyContent={showDashEmptyContent}
          title={t('description.nationalClassificationAndDefinitions')}
        />
      )}

      {nationalData.originalData && (
        <CommentableDescription
          name={CommentableDescriptionName.originalData}
          sectionName={sectionName}
          showDashEmptyContent={showDashEmptyContent}
          title={t('description.originalData')}
        />
      )}
    </div>
  )
}

NationalDataDescriptions.defaultProps = {
  showDashEmptyContent: false,
}

export default NationalDataDescriptions
