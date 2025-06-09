import { CountryIso } from 'meta/area'
import { CommentableDescriptionName, CommentableDescriptionValue } from 'meta/assessment/descriptionValue'

import { DescriptionsSelectors } from 'client/store/data/descriptions/selectors'
import { useAppSelector } from 'client/store/hooks'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type Props = {
  name: CommentableDescriptionName
  sectionName: string
  template?: CommentableDescriptionValue
}

export const useCommentableDescriptionValue = (props: Props): CommentableDescriptionValue => {
  const { name, sectionName, template = { text: '' } } = props

  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  return useAppSelector<CommentableDescriptionValue>(
    (state) =>
      DescriptionsSelectors.getDescriptions(state, assessmentName, cycleName, countryIso, sectionName, name) ?? template
  )
}
