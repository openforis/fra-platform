import { useMemo } from 'react'

import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { Field } from 'client/pages/Section/Contacts/types'

type Props = {
  fields: Array<Field>
}

export const useGridTemplateColumns = (props: Props): string => {
  const { fields } = props
  const { print } = useIsPrintRoute()

  return useMemo<string>(() => {
    const noCols = fields.filter((f) => !f.hidden).length - (print ? 0 : 1)

    const title = `${print ? '' : '12ch '}`
    const name = `minMax(130px, 0.8fr)`
    const contributions = `minMax(130px, 2fr)`

    return `${title} ${name} repeat(${noCols - 2}, minMax(60px, 1fr)) ${contributions}`
  }, [fields, print])
}
