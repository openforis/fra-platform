import React from 'react'
import { useTranslation } from 'react-i18next'

import { NationalDataDescription } from 'meta/assessment/description'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'

import CommentableDescription from 'client/pages/Section/Descriptions/CommentableDescription'
import NationalDataSources from 'client/pages/Section/Descriptions/NationalDataDescriptions/NationalDataSources'

type Props = {
  nationalData: NationalDataDescription
}

const NationalDataDescriptions: React.FC<Props> = (props) => {
  const { nationalData } = props
  const dataSourcesMeta = nationalData.dataSources
  const withTable = Boolean(dataSourcesMeta?.table)

  const { t } = useTranslation()

  return (
    <div className="descriptions__group">
      <h2 className="headline">{t('description.nationalData')}</h2>

      {dataSourcesMeta && (
        <>
          {withTable && <NationalDataSources meta={dataSourcesMeta} />}

          {!withTable && (
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
