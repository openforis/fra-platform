import { useCallback } from 'react'

import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { CommentableDescriptionName, DataSource, SectionName } from 'meta/assessment'

import { useAppDispatch } from 'client/store'
import { DataActions, useCommentableDescriptionValue } from 'client/store/data'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type Returned = (field: string, fieldValue: string | Array<string>) => void

const name: CommentableDescriptionName = CommentableDescriptionName.dataSources

type Props = {
  sectionName: SectionName
  dataSource: DataSource
}

export const useOnChange = (props: Props): Returned => {
  const { dataSource, sectionName } = props

  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
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
      dispatch(DataActions.updateDescription(updateProps))
    },
    [assessmentName, countryIso, cycleName, dataSource, dispatch, sectionName, value]
  )
}
