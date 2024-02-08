import { useCallback } from 'react'

import { Objects } from 'utils/objects'
import { UUIDs } from 'utils/uuids'

import { CountryIso } from 'meta/area'
import { CommentableDescriptionName, CommentableDescriptionValue, DataSource, SectionName } from 'meta/assessment'

import { useAppDispatch } from 'client/store'
import { DataActions, useCommentableDescriptionValue } from 'client/store/data'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type OnChange = (dataSource: DataSource) => void

type OnDelete = (uuid: string) => void

type Returned = {
  onChange: OnChange
  onDelete: OnDelete
}

const name: CommentableDescriptionName = CommentableDescriptionName.dataSources
const template: CommentableDescriptionValue = { text: '' }

export const useActions = (props: { sectionName: SectionName }): Returned => {
  const { sectionName } = props

  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const dispatch = useAppDispatch()
  const value = useCommentableDescriptionValue({ name, sectionName, template })

  const onChange = useCallback<OnChange>(
    (dataSource) => {
      const { uuid } = dataSource
      const { dataSources: dataSourceValues = [] } = value

      const valueUpdate = Objects.cloneDeep({ ...value, dataSources: Objects.cloneDeep(dataSourceValues) })
      // If we don't have UUID, it's a new data source
      if (uuid) {
        const i = valueUpdate.dataSources.findIndex((dataSource) => dataSource.uuid === uuid)
        valueUpdate.dataSources[i] = dataSource
      } else {
        valueUpdate.dataSources.push({ ...dataSource, uuid: UUIDs.v4() })
      }

      const updateProps = { assessmentName, cycleName, countryIso, sectionName, name, value: valueUpdate }
      dispatch(DataActions.updateDescription(updateProps))
    },
    [assessmentName, countryIso, cycleName, dispatch, sectionName, value]
  )

  const onDelete = useCallback<OnDelete>(
    (uuid) => {
      const dataSources = value.dataSources.filter((dataSource) => dataSource.uuid !== uuid)

      const updateProps = { assessmentName, cycleName, countryIso, sectionName, name, value: { ...value, dataSources } }
      dispatch(DataActions.updateDescription(updateProps))
    },
    [assessmentName, countryIso, cycleName, dispatch, sectionName, value]
  )

  return { onChange, onDelete }
}
