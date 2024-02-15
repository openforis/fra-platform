import { useMemo } from 'react'

import { CommentableDescriptionName, SectionName } from 'meta/assessment'

import { useCanEditDescription, useIsDescriptionEditable } from 'client/store/user/hooks'

type Props = {
  sectionName: SectionName
}

export const useGridTemplateColumns = (props: Props): string => {
  const { sectionName } = props

  const canEdit = useCanEditDescription({ sectionName })
  const editable = useIsDescriptionEditable({ sectionName, name: CommentableDescriptionName.dataSources })

  return useMemo<string>(() => {
    const actions = editable ? ` 64px` : `${canEdit ? ` 32px` : ''}`
    return `minmax(200px, 1fr) minmax(200px, 1fr) minmax(250px, 1fr) minmax(150px, 300px) minmax(100px, 1fr)${actions}`
  }, [canEdit, editable])
}
