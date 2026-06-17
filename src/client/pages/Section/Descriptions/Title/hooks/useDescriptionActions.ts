import { useMemo } from 'react'

import { CountryIso } from 'meta/area/countryIso'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'
import { Topics } from 'meta/messageCenter/topics'

import { useCanEditDescription } from 'client/store/user/hooks/auth'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { DataRowAction, DataRowActionType } from 'client/components/DataGrid'

type Props = {
  name: CommentableDescriptionName
  sectionName: SectionName
  title: string
}

export const useDescriptionActions = (props: Props): Array<DataRowAction> => {
  const { name, sectionName, title } = props

  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const canEdit = useCanEditDescription({ sectionName })
  const topicKey = Topics.getCommentableDescriptionKey({ assessmentName, cycleName, countryIso, sectionName, name })

  return useMemo<Array<DataRowAction>>(() => {
    if (!canEdit) return []

    return [{ type: DataRowActionType.Review, title, topicKey }]
  }, [canEdit, title, topicKey])
}
