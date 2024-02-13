import { useCallback } from 'react'

import { CountryIso } from 'meta/area'
import { CommentableDescriptionName, CommentableDescriptionValue, SectionName } from 'meta/assessment'

import { useAppDispatch } from 'client/store'
import { DataActions } from 'client/store/data'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type Props = {
  name: CommentableDescriptionName
  sectionName: SectionName
}

type Returned = (value: CommentableDescriptionValue) => void

export const useOnChange = (props: Props): Returned => {
  const { name, sectionName } = props

  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const dispatch = useAppDispatch()

  return useCallback<Returned>(
    (value: CommentableDescriptionValue) => {
      dispatch(DataActions.updateDescription({ assessmentName, cycleName, countryIso, sectionName, name, value }))
    },
    [assessmentName, countryIso, cycleName, dispatch, name, sectionName]
  )
}
