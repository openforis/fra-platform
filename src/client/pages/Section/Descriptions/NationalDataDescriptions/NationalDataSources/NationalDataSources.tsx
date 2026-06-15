import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { DataSourceDescription } from 'meta/assessment/description'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'

import { useHistoryLastApprovedDescriptionFetched } from 'client/store/data/history/hooks/lastApprovedDescriptions'
import { useCanEditDescription, useIsDescriptionEditable } from 'client/store/user/hooks/auth'
import DataGrid from 'client/components/DataGrid/DataGrid'
import DataSources from 'client/components/DataSources'
import { PropsDataSources } from 'client/components/DataSources/types'
import { useSectionContext } from 'client/pages/Section/context'
import Title from 'client/pages/Section/Descriptions/Title'

import { useColumns } from './hooks/useColumns'
import { useDataSourcesData } from './hooks/useDataSourcesData'
import { useDataSourcesHistoryActivities } from './hooks/useDataSourcesHistoryActivities'
import { useDataSourcesHistoryLastApproved } from './hooks/useDataSourcesHistoryLastApproved'
import { useDataSourceValidator } from './hooks/useDataSourceValidator'
import { useGetDataSourcesLinked } from './hooks/useGetDataSourcesLinked'
import { useOnChange } from './hooks/useOnChange'
import { useOnDelete } from './hooks/useOnDelete'

type Props = {
  meta: DataSourceDescription
}

const name: CommentableDescriptionName = CommentableDescriptionName.dataSources

const NationalDataSources: React.FC<Props> = (props) => {
  const { meta } = props

  const { t } = useTranslation()
  const { sectionName } = useSectionContext()
  const columns = useColumns()
  const data = useDataSourcesData({ sectionName })
  const { dataSourcesLinked } = useGetDataSourcesLinked({ meta, sectionName })
  const validator = useDataSourceValidator()
  const canReview = useCanEditDescription({ sectionName })
  const canEdit = useIsDescriptionEditable({ sectionName, name })
  const onChange = useOnChange({ sectionName })
  const onDelete = useOnDelete({ sectionName })

  const { dataSources } = data
  const historyLastApprovedCompares = useDataSourcesHistoryLastApproved({ dataSources })
  const historyLastApprovedDescriptionFetched = useHistoryLastApprovedDescriptionFetched()

  const historyActivityCompares = useDataSourcesHistoryActivities({ dataSources })
  const historyCompares = historyLastApprovedCompares ?? historyActivityCompares
  const displayHistory = Boolean(
    (historyLastApprovedCompares && historyLastApprovedDescriptionFetched) ?? historyActivityCompares
  )

  const options = useMemo<PropsDataSources['options']>(() => {
    return {
      canEdit,
      canReview,
      displayHistory,
      includeVariables: true,
      includeYears: true,
    }
  }, [canEdit, canReview, displayHistory])

  return (
    <DataGrid className="description" withActions={canEdit || canReview}>
      <Title
        canCopy={{ disabled: dataSources.length !== 1 }}
        name={name}
        sectionName={sectionName}
        title={t('description.dataSourcesPlus')}
      />
      <DataSources
        columns={columns}
        data={data}
        dataSourcesLinked={dataSourcesLinked}
        historyCompares={historyCompares}
        meta={meta}
        onChange={onChange}
        onDelete={onDelete}
        options={options}
        validator={validator}
      />
    </DataGrid>
  )
}

export default NationalDataSources
