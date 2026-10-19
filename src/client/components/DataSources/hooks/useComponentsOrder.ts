import { useMemo } from 'react'

import { DataSource } from 'meta/assessment/descriptionValue/dataSource'

import { PropsDataSources } from 'client/components/DataSources/types'

type Returned = Array<keyof DataSource>

export const useComponentsOrder = (props: Pick<PropsDataSources, 'options'>): Returned => {
  const { options } = props
  const { includeVariables, includeYears } = options

  return useMemo<Returned>(() => {
    const componentsOrder: Returned = ['reference', 'type']

    if (includeVariables) componentsOrder.push('variables')
    if (includeYears) componentsOrder.push('year')

    componentsOrder.push('comments')

    return componentsOrder
  }, [includeVariables, includeYears])
}
