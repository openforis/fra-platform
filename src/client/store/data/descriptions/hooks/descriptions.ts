import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area/countryIso'
import { CommentableDescriptionName, CommentableDescriptionValue } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'

import { DescriptionsSelectors } from 'client/store/data/descriptions/selectors'
import { useAppSelector } from 'client/store/hooks'
import { useCountryRouteParams } from 'client/hooks/routeParams'

type Props = {
  name: CommentableDescriptionName
  sectionName: SectionName
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

export const useAreDescriptionsFetched = (props: Pick<Props, 'sectionName'>): boolean => {
  const { sectionName } = props

  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  const value = useAppSelector((state) =>
    DescriptionsSelectors.getSectionDescriptions(state, assessmentName, cycleName, countryIso, sectionName)
  )
  return useMemo<boolean>(() => !Objects.isNil(value), [value])
}
