import { useMemo } from 'react'

import { CountryIso } from 'meta/area'
import { CommentableDescriptionName } from 'meta/assessment'
import { Topics } from 'meta/messageCenter'

import { useCanEditDescription } from 'client/store/user/hooks'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { DataRowAction, DataRowActionType } from 'client/components/DataGrid'
import { useSectionContext } from 'client/pages/Section/context'

type Props = {
  name: CommentableDescriptionName
  title: string
}

export const useDescriptionActions = (props: Props): Array<DataRowAction> => {
  const { name, title } = props

  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const { sectionName } = useSectionContext()
  const canEdit = useCanEditDescription({ sectionName })
  const topicKey = Topics.getCommentableDescriptionKey({ assessmentName, cycleName, countryIso, sectionName, name })

  return useMemo<Array<DataRowAction>>(() => {
    if (!canEdit) return []

    return [{ type: DataRowActionType.Review, title, topicKey }]
  }, [canEdit, title, topicKey])
}
