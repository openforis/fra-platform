import { useMemo } from 'react'

import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { Field } from 'client/pages/Section/Contacts/types'

type Props = {
  canEdit: boolean
  fields: Array<Field>
}

export const useGridTemplateColumns = (props: Props): string => {
  const { canEdit, fields } = props
  const { print } = useIsPrintRoute()

  return useMemo<string>(() => {
    const deleteButton = canEdit ? '32px' : ''
    const noCols = fields.filter((f) => !f.hidden).length - (print ? 0 : 1)
    const title = `${print ? '' : '12ch '}`

    return `${title} repeat(${noCols}, 1fr) ${deleteButton}`
  }, [canEdit, fields, print])
}
