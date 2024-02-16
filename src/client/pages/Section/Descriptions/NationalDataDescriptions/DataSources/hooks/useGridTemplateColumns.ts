import { useMemo } from 'react'

import { CommentableDescriptionName, SectionName } from 'meta/assessment'

import { useIsDescriptionEditable } from 'client/store/user/hooks'

type Props = {
  sectionName: SectionName
}

export const useGridTemplateColumns = (props: Props): string => {
  const { sectionName } = props

  const editable = useIsDescriptionEditable({ sectionName, name: CommentableDescriptionName.dataSources })

  return useMemo<string>(() => {
    const actions = editable ? ` 64px` : ''
    return `minmax(200px, 1fr) minmax(200px, 1fr) minmax(250px, 1fr) minmax(150px, 300px) minmax(100px, 1fr)${actions}`
  }, [editable])
}
