import { CSSProperties, useMemo } from 'react'

import { Objects } from 'utils/objects'

import { Table } from 'meta/assessment'

import { useCycle } from 'client/store/assessment'
import { ColHeader } from 'client/pages/Section/DataTable/Table/types'

type Props = {
  headers: Array<ColHeader>
  table: Table
}

type Returned = CSSProperties['gridTemplateColumns']

export const useGridTemplateColumns = (props: Props): Returned => {
  const { headers, table } = props

  const cycle = useCycle()

  return useMemo<Returned>(() => {
    const gridTemplateColumnsFromTable = table.props.style?.[cycle.uuid]?.gridTemplateColumns
    if (!Objects.isEmpty(gridTemplateColumnsFromTable)) return gridTemplateColumnsFromTable

    return `minmax(100px, auto) repeat(${headers.length}, minmax(min-content, 1fr))`
  }, [cycle.uuid, headers.length, table.props.style])
}
