import { useCallback } from 'react'

import { CountryIso } from 'meta/area/countryIso'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { DataSource } from 'meta/assessment/descriptionValue/dataSource'
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
    (dataSource, field, fieldValue) => {
      const dataSourceUpdate: DataSource = { ...dataSource, [field]: fieldValue }
      const { placeholder, uuid } = dataSourceUpdate

      const { dataSources: dataSourceValues = [] } = value

      const valueUpdate = { ...value, dataSources: [...dataSourceValues] }
      // If placeholder, it's a new data source
      if (!placeholder) {
        const i = valueUpdate.dataSources.findIndex((dataSource) => dataSource.uuid === uuid)
        valueUpdate.dataSources[i] = dataSourceUpdate
      } else {
        delete dataSourceUpdate.placeholder
        valueUpdate.dataSources.push(dataSourceUpdate)
      }

      const updateProps = { assessmentName, cycleName, countryIso, sectionName, name, value: valueUpdate }
      dispatch(DescriptionsActions.updateDescription(updateProps))
    },
    [assessmentName, countryIso, cycleName, dispatch, sectionName, value]
  )
}
