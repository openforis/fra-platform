import { useMemo } from 'react'

import { CountryIso } from 'meta/area'
import { CommentableDescriptionName, DataSource, SectionName } from 'meta/assessment'

import { useAppDispatch } from 'client/store'
import { DataActions, useCommentableDescriptionValue } from 'client/store/data'
import { useCanEditDescription, useIsDescriptionEditable } from 'client/store/user/hooks'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { DataRowAction, DataRowActionType } from 'client/components/DataGrid'

type Props = {
  dataSource: DataSource
  readOnly: boolean
  sectionName: SectionName
}

const name: CommentableDescriptionName = CommentableDescriptionName.dataSources

export const useDataSourceActions = (props: Props): Array<DataRowAction> => {
  const { dataSource, readOnly, sectionName } = props

  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const canEdit = useCanEditDescription({ sectionName })
  const editable = useIsDescriptionEditable({ sectionName, name: CommentableDescriptionName.dataSources })
  const dataSourcesValue = useCommentableDescriptionValue({ name, sectionName })
  const dispatch = useAppDispatch()

  return useMemo<Array<DataRowAction>>(() => {
    const actions: Array<DataRowAction> = []

    if (readOnly || !canEdit || dataSource.placeholder) return actions

    if (editable) {
      const onDelete = () => {
        const dataSources = dataSourcesValue.dataSources.filter((_dataSource) => _dataSource.uuid !== dataSource.uuid)
        const valueUpdate = { ...dataSourcesValue, dataSources }
        const updateProps = { assessmentName, cycleName, countryIso, sectionName, name, value: valueUpdate }
        dispatch(DataActions.updateDescription(updateProps))
      }
      actions.push({ type: DataRowActionType.Delete, onClick: onDelete })
    }

    const title = `${dataSource.variables?.join(', ')} | ${dataSource.year}`
    const topicKey = dataSource.uuid
    actions.push({ type: DataRowActionType.Review, title, topicKey })

    return actions
  }, [
    assessmentName,
    canEdit,
    countryIso,
    cycleName,
    dataSource.placeholder,
    dataSource.uuid,
    dataSource.variables,
    dataSource.year,
    dataSourcesValue,
    dispatch,
    editable,
    readOnly,
    sectionName,
  ])
}
