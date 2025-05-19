import { useMemo } from 'react'

import { CommentableDescriptionName, DataSource } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'
import { UUIDs } from 'meta/uuids'

import { useCommentableDescriptionValue } from 'client/store/data'
import { useIsDescriptionEditable } from 'client/store/user/hooks'

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
  year: '',
})
const name = CommentableDescriptionName.dataSources

export const useDataSourcesData = (props: Props): Returned => {
  const { sectionName } = props

  const value = useCommentableDescriptionValue({ sectionName, name })
  const editable = useIsDescriptionEditable({ sectionName, name })

  return useMemo<Returned>(() => {
    const _dataSources = value.dataSources ?? []
    const dataSources = editable ? [..._dataSources, newPlaceholder()] : _dataSources

    return { dataSources, text: value.text }
  }, [editable, value.dataSources, value.text])
}
