import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Labels } from 'meta/assessment/labels'
import { DashboardBarChart } from 'meta/dashboard/dashboard'

import Bar from 'client/components/Chart/Bar'
import ButtonDataExport from 'client/components/Dashboard/ButtonDataExport'

import { useBarChartData } from './hooks/useBarChartData'

type Props = {
  item: DashboardBarChart
}

const BarChart: React.FC<Props> = (props: Props) => {
  const {
    item: { chart, table, title },
  } = props
  const { t } = useTranslation()

  const { csvData, data } = useBarChartData(table, chart)

  const filename = useMemo(() => Labels.getLabel({ label: title, t }).toLowerCase().replace(/\s+/g, '_'), [t, title])

  return (
    <>
      <div className="table-grid-actions">
        <ButtonDataExport data={csvData} filename={filename} />
      </div>
      <Bar chart={chart} data={data} showLabels={false} stacked />
    </>
  )
}

export default BarChart
