import { useMemo } from 'react'

import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { DataSource } from 'meta/assessment/descriptionValue/dataSource'
import { SectionName } from 'meta/assessment/section'
import { UUIDs } from 'meta/uuid/uuids'

import { useCommentableDescriptionValue } from 'client/store/data/descriptions/hooks/descriptions'

type Props = {
  sectionName: SectionName
}

type Returned = {
  dataSources: Array<DataSource>
  text: string
}

const newPlaceholder = (): DataSource => ({
  comments: '',
  placeholder: true,
  reference: '',
  type: '',
  uuid: UUIDs.getUuid(),
  variables: [],
  year: [],
})

const name = CommentableDescriptionName.dataSources

export const useDataSourcesData = (props: Props): Returned => {
  const { sectionName } = props

  const value = useCommentableDescriptionValue({ sectionName, name })

  return useMemo<Returned>(() => {
    const _dataSources = value.dataSources ?? []
    const dataSources = [..._dataSources, newPlaceholder()]

    return { dataSources, text: value.text }
  }, [value.dataSources, value.text])
}
