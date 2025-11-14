import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Labels } from 'meta/assessment/labels'
import { DashboardPieChart } from 'meta/dashboard/pieChart'

import Pie from 'client/components/Chart/Pie'
import ButtonDataExport from 'client/components/Dashboard/ButtonDataExport'

import { usePieChartData } from './hooks/usePieChartData'

type Props = {
  item: DashboardPieChart
}

const PieChart: React.FC<Props> = (props: Props) => {
  const {
    item: { chart, table, title },
  } = props
  const { t } = useTranslation()

  const { csvData, data } = usePieChartData(table, chart)

  const filename = useMemo(() => Labels.getLabel({ label: title, t }).toLowerCase().replace(/\s+/g, '_'), [t, title])

  return (
    <>
      <div className="table-grid-actions">
        <ButtonDataExport data={csvData} filename={filename} />
      </div>
      <Pie data={data} />
    </>
  )
}

export default PieChart
