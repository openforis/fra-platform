import { useMemo } from 'react'

import { CountryIso } from 'meta/area'
import { CommentableDescriptionName, DataSource, SectionName } from 'meta/assessment'

import { useAppDispatch } from 'client/store'
import { DataActions, useCommentableDescriptionValue } from 'client/store/data'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { DataRowAction, DataRowActionType } from 'client/components/DataGrid'

type Props = {
  disabled: boolean
  sectionName: SectionName
  dataSource: DataSource
}

const name: CommentableDescriptionName = CommentableDescriptionName.dataSources

export const useDataSourceActions = (props: Props): Array<DataRowAction> => {
  const { disabled, sectionName, dataSource } = props

  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const dataSourcesValue = useCommentableDescriptionValue({ name, sectionName })
  const dispatch = useAppDispatch()

  return useMemo<Array<DataRowAction>>(() => {
    if (disabled || dataSource.placeholder) return []

    const onDelete = () => {
      const dataSources = dataSourcesValue.dataSources.filter((_dataSource) => _dataSource.uuid !== dataSource.uuid)
      const valueUpdate = { ...dataSourcesValue, dataSources }
      const updateProps = { assessmentName, cycleName, countryIso, sectionName, name, value: valueUpdate }
      dispatch(DataActions.updateDescription(updateProps))
    }
    const buttonDelete = { type: DataRowActionType.Delete, onClick: onDelete }

    const title = `${dataSource.variables?.join(', ')} | ${dataSource.year}`
    const topicKey = dataSource.uuid
    const buttonReview = { type: DataRowActionType.Review, title, topicKey }

    return [buttonDelete, buttonReview]
  }, [
    assessmentName,
    countryIso,
    cycleName,
    dataSource.placeholder,
    dataSource.uuid,
    dataSource.variables,
    dataSource.year,
    dataSourcesValue,
    disabled,
    dispatch,
    sectionName,
  ])
}
