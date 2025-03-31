import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Table } from 'meta/assessment/table'
import { Tables } from 'meta/assessment/tables'

import { useCycle } from 'client/store/assessment'
import { Trends } from 'client/pages/Section/DataTable/Chart/types'

type Props = {
  table: Table
}

export const useTrends = (props: Props): Trends => {
  const { table } = props

  const { t } = useTranslation()
  const cycle = useCycle()

  return useMemo<Trends>(() => {
    return Tables.getChartRows({ table, cycle }).map((row) => ({
      name: row.props.variableName,
      label: t(row.props.chart[cycle.uuid].labelKey),
      color: row.props.chart[cycle.uuid].color,
    }))
  }, [cycle, t, table])
}
