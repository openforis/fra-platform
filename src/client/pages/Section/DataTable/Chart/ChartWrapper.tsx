import './ChartWrapper.scss'
import React, { useRef } from 'react'

import { Objects } from 'utils/objects'

import { Table } from 'meta/assessment/table'
import { RecordAssessmentData } from 'meta/data/recordData'

import Chart from 'client/pages/Section/DataTable/Chart/Chart'

import { useChartWidth } from './hooks/useChartWidth'

type Props = {
  data: RecordAssessmentData
  table: Table
}

const ChartWrapper: React.FC<Props> = (props) => {
  const { data, table } = props

  const containerRef = useRef<HTMLDivElement>(null)
  const width = useChartWidth({ containerRef })

  return (
    <div ref={containerRef} className="chart-wrapper print-break-after">
      {!Objects.isNil(width) && <Chart data={data} table={table} width={width} />}
    </div>
  )
}

export default ChartWrapper
