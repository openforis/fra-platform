import { useMemo } from 'react'

import { CountryIso } from 'meta/area'
import { CommentableDescriptionName, DataSource } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'
import { Topics } from 'meta/messageCenter'

import { DescriptionsActions } from 'client/store/data/descriptions/actions'
import { useAppDispatch } from 'client/store/hooks'
import { useCanEditDescription, useIsDescriptionEditable } from 'client/store/user/hooks/auth'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { DataRowAction, DataRowActionType } from 'client/components/DataGrid'

type Props = {
  dataSource: DataSource
  readOnly: boolean
  sectionName: SectionName
}

export const useDataSourceActions = (props: Props): Array<DataRowAction> => {
  const { dataSource, readOnly, sectionName } = props

  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const canEdit = useCanEditDescription({ sectionName })
  const editable = useIsDescriptionEditable({ sectionName, name: CommentableDescriptionName.dataSources })
  const dispatch = useAppDispatch()

  return useMemo<Array<DataRowAction>>(() => {
    const actions: Array<DataRowAction> = []

    if (readOnly || !canEdit || dataSource.placeholder) return actions

    if (editable) {
      const onDelete = () => {
        const deleteProps = { assessmentName, cycleName, countryIso, sectionName, uuid: dataSource.uuid }
        dispatch(DescriptionsActions.deleteDataSource(deleteProps))
      }
      actions.push({ type: DataRowActionType.Delete, onClick: onDelete })
    }

    const title = `${dataSource.variables?.join(', ')} | ${dataSource.year}`
    const topicKey = Topics.getDataSourceReviewTopicKey(dataSource)
    actions.push({ type: DataRowActionType.Review, title, topicKey })

    return actions
  }, [assessmentName, canEdit, countryIso, cycleName, dataSource, dispatch, editable, readOnly, sectionName])
}
