import { useCallback } from 'react'

import { CountryIso } from 'meta/area/countryIso'
import { CommentableDescriptionName, CommentableDescriptionValue } from 'meta/assessment/descriptionValue'
import { DataSource } from 'meta/assessment/descriptionValue/dataSource'
import { SectionName } from 'meta/assessment/section'
import { UUIDs } from 'meta/uuid/uuids'

import { DescriptionsActions } from 'client/store/data/descriptions/actions'
import { useCommentableDescriptionValue } from 'client/store/data/descriptions/hooks/descriptions'
import { useAppDispatch } from 'client/store/hooks'
import { useCountryRouteParams } from 'client/hooks/routeParams'

const name: CommentableDescriptionName = CommentableDescriptionName.dataSources

type Props = {
  sectionName: SectionName
}

type Returned = () => void

export const useOnAdd = (props: Props): Returned => {
  const { sectionName } = props

  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const dispatch = useAppDispatch()
  const value = useCommentableDescriptionValue({ name, sectionName })

  return useCallback<Returned>(() => {
    const dataSource: DataSource = {
      comments: '',
      reference: '',
      type: '',
      uuid: UUIDs.getUuid(),
      variables: [],
      year: [],
    }

    const dataSources = [...(value.dataSources ?? []), dataSource]
    const valueUpdate: CommentableDescriptionValue = { ...value, dataSources }

    const updateProps = { assessmentName, cycleName, countryIso, sectionName, name, value: valueUpdate }
    dispatch(DescriptionsActions.updateDescription(updateProps))
  }, [assessmentName, countryIso, cycleName, dispatch, sectionName, value])
}
