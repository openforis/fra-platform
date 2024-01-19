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
    const actions = canEdit ? `${3 * 32}px` : '0px'
    const noCols = fields.filter((f) => !f.hidden).length - (print ? 0 : 1)

    const title = `${print ? '' : '12ch '}`
    const name = `minMax(130px, 0.8fr)`
    const contributions = `minMax(130px, 2fr)`

    return `${title} ${name} repeat(${noCols - 2}, minMax(60px, 1fr)) ${contributions} ${actions}`
  }, [canEdit, fields, print])
}
