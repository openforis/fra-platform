import { useCallback } from 'react'

import { CountryIso } from 'meta/area/countryIso'
import { CommentableDescriptionName, CommentableDescriptionValue } from 'meta/assessment/descriptionValue'
import { DataSources } from 'meta/assessment/descriptionValue/dataSources'
import { SectionName } from 'meta/assessment/section'

import { DescriptionsActions } from 'client/store/data/descriptions/actions'
import { useCommentableDescriptionValue } from 'client/store/data/descriptions/hooks/descriptions'
import { useAppDispatch } from 'client/store/hooks'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { DataSourceOnChange } from 'client/components/DataSources/types'

const name: CommentableDescriptionName = CommentableDescriptionName.dataSources

type Props = {
  sectionName: SectionName
}

export const useOnChange = (props: Props): DataSourceOnChange => {
  const { sectionName } = props

  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const dispatch = useAppDispatch()
  const value = useCommentableDescriptionValue({ name, sectionName })

  return useCallback<DataSourceOnChange>(
    (dataSource, fieldName, fieldValue) => {
      const { dataSources = [] } = value

      const dataSourcesUpdate = DataSources.updateFieldValue({ dataSources, dataSource, fieldName, fieldValue })
      const valueUpdate: CommentableDescriptionValue = { ...value, dataSources: dataSourcesUpdate }

      const updateProps = { assessmentName, cycleName, countryIso, sectionName, name, value: valueUpdate }
      dispatch(DescriptionsActions.updateDescription(updateProps))
    },
    [assessmentName, countryIso, cycleName, dispatch, sectionName, value]
  )
}
