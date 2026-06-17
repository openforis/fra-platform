import { useMemo } from 'react'

import { PropsDataSources } from 'client/components/DataSources/types'

export const useGridTemplateColumns = (props: Pick<PropsDataSources, 'options'>): string => {
  const { options } = props
  const { includeVariables, includeYears } = options

  return useMemo<string>(() => {
    const columns = ['minmax(200px, 1fr)', 'minmax(200px, 1fr)', 'minmax(200px, 1fr)']
    if (includeVariables) columns.push('minmax(150px, 1fr)')
    if (includeYears) columns.push('minmax(150px, 1fr)')

    return columns.join(' ')
  }, [includeVariables, includeYears])
}
