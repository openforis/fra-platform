import './TreeCoverAreaPanel.scss'
import React from 'react'

import { Numbers } from 'utils/numbers'

import StatisticsTable from '../../components/StatisticsTable'

type Props = {
  data: [string, number, number][]
  countryIso: string
  year: number
}

const TreeCoverAreaPanel: React.FC<Props> = (props: Props) => {
  const columns = ['Source', 'Forest area', 'Forest area % of land area']
  const title = 'Extent of forest per source and reported on 2020 (1a)'
  const units = ['', 'ha', '%']
  const loaded = true
  const { data, countryIso, year } = props

  // Formatting the data.
  const formattedTableData: (string | number)[][] = []
  Object.entries(data).forEach((value) => {
    const rowData = value[1] // First position is the id, and the second one is the data row.
    const sourceName = rowData[0]
    const area = rowData[1]
    const percentage = rowData[2]
    const formatedArea = Numbers.format(area, 0)
    formattedTableData.push([sourceName, formatedArea, percentage])
  })

  return (
    <div>
      <h3 className="table-title">{title}</h3>
      <StatisticsTable columns={columns} units={units} loaded={loaded} tableData={formattedTableData} countryIso={countryIso} year={year} />
    </div>
  )
}

export default TreeCoverAreaPanel
