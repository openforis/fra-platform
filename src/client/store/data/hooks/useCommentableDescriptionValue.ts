import { CountryIso } from 'meta/area'
import { CommentableDescriptionName, CommentableDescriptionValue } from 'meta/assessment'

import { useAppSelector } from 'client/store'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type Props = {
  name: CommentableDescriptionName
  sectionName: string
  template: CommentableDescriptionValue
}

export const useCommentableDescriptionValue = (props: Props): CommentableDescriptionValue => {
  const { name, sectionName, template } = props

  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()

  return useAppSelector(
    (state) => state.data.descriptions[assessmentName]?.[cycleName]?.[countryIso]?.[sectionName]?.[name] ?? template
  )
}
