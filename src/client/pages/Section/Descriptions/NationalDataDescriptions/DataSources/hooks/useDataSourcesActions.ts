import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area'
import { CommentableDescriptionName, SectionName } from 'meta/assessment'
import { Topics } from 'meta/messageCenter'

import { useCanEditDescription } from 'client/store/user/hooks'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { DataRowAction, DataRowActionType } from 'client/components/DataGrid'

type Props = {
  sectionName: SectionName
}

const name: CommentableDescriptionName = CommentableDescriptionName.dataSources

export const useDataSourcesActions = (props: Props): Array<DataRowAction> => {
  const { sectionName } = props

  const { t } = useTranslation()
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const canEdit = useCanEditDescription({ sectionName })
  const topicKey = Topics.getCommentableDescriptionKey({ assessmentName, cycleName, countryIso, sectionName, name })

  return useMemo<Array<DataRowAction>>(() => {
    if (!canEdit) return []

    return [{ type: DataRowActionType.Review, title: t('description.dataSourcesPlus'), topicKey }]
  }, [canEdit, t, topicKey])
}
