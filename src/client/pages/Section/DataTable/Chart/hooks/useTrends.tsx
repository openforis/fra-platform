import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Table } from 'meta/assessment'

import { useCycle } from 'client/store/assessment'

type Props = {
  table: Table
}

export type Trend = {
  color: string
  label: string
  name: string
}

type Returned = Array<Trend>

export const useTrends = (props: Props): Returned => {
  const { table } = props

  const { t } = useTranslation()
  const cycle = useCycle()

  return useMemo<Returned>(() => {
    return table.rows
      .filter((row) => !!row.props.chart?.[cycle.uuid])
      .map((row) => ({
        name: row.props.variableName,
        label: t(row.props.chart[cycle.uuid].labelKey),
        color: row.props.chart[cycle.uuid].color,
      }))
  }, [cycle.uuid, t, table.rows])
}
