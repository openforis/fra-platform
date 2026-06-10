import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { NationalDataDescription } from 'meta/assessment/description'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'

import DataSources from 'client/components/DataSources'
import CommentableDescription from 'client/pages/Section/Descriptions/CommentableDescription'

type Props = {
  nationalData: NationalDataDescription
}

type DataSourcesProps = {
  withTable: boolean
  withText: boolean
}

const NationalDataDescriptions: React.FC<Props> = (props) => {
  const { nationalData } = props

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
          {dataSourcesProps.withTable && <DataSources nationalData={nationalData} />}

          {!dataSourcesProps.withTable && (
            <CommentableDescription
              name={CommentableDescriptionName.dataSources}
              repository
              title={t('description.dataSourcesPlus')}
            />
          )}
        </>
      )}

      {nationalData.nationalClassification && (
        <CommentableDescription
          name={CommentableDescriptionName.nationalClassificationAndDefinitions}
          repository
          title={t('description.nationalClassificationAndDefinitions')}
        />
      )}

      {nationalData.originalData && (
        <CommentableDescription
          name={CommentableDescriptionName.originalData}
          repository
          title={t('description.originalData')}
        />
      )}
    </div>
  )
}

export default NationalDataDescriptions
