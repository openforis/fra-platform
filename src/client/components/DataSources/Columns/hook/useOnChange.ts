import { useCallback } from 'react'

import { CountryIso } from 'meta/area/countryIso'
import { CommentableDescriptionName, DataSource } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'
import { Objects } from 'utils/objects'

import { DescriptionsActions } from 'client/store/data/descriptions/actions'
import { useCommentableDescriptionValue } from 'client/store/data/descriptions/hooks/descriptions'
import { useAppDispatch } from 'client/store/hooks'
import { useCountryRouteParams } from 'client/hooks/routeParams'

type Returned = (field: string, fieldValue: string | Array<string>) => void

const name: CommentableDescriptionName = CommentableDescriptionName.dataSources

type Props = {
  sectionName: SectionName
  dataSource: DataSource
}

export const useOnChange = (props: Props): Returned => {
  const { dataSource, sectionName } = props

  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const dispatch = useAppDispatch()
  const value = useCommentableDescriptionValue({ name, sectionName })

  return useCallback<Returned>(
    (field, fieldValue) => {
      if (dataSource[field as keyof DataSource] === fieldValue) {
        return
      }

      const dataSourceUpdate: DataSource = { ...dataSource, [field]: fieldValue }
      const { placeholder, uuid } = dataSourceUpdate

      const { dataSources: dataSourceValues = [] } = value

      const valueUpdate = Objects.cloneDeep({ ...value, dataSources: Objects.cloneDeep(dataSourceValues) })
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
    [assessmentName, countryIso, cycleName, dataSource, dispatch, sectionName, value]
  )
}
