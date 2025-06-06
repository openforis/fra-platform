import { useCallback } from 'react'

import { CountryIso } from 'meta/area'
import { CommentableDescriptionName, CommentableDescriptionValue } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'

import { DescriptionsActions } from 'client/store/data/descriptions/actions'
import { useAppDispatch } from 'client/store/hooks'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type Props = {
  name: CommentableDescriptionName
  sectionName: SectionName
}

type Returned = (value: CommentableDescriptionValue) => void

export const useOnChange = (props: Props): Returned => {
  const { name, sectionName } = props

  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const dispatch = useAppDispatch()

  return useCallback<Returned>(
    (value: CommentableDescriptionValue) => {
      dispatch(
        DescriptionsActions.updateDescription({ assessmentName, cycleName, countryIso, sectionName, name, value })
      )
    },
    [assessmentName, countryIso, cycleName, dispatch, name, sectionName]
  )
}
