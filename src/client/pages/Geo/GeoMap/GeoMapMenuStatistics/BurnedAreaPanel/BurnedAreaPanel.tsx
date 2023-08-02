import './BurnedAreaPanel.scss'
import React from 'react'

import { Numbers } from 'utils/numbers'

import { BurnedAreaModis } from 'meta/geo/forest'

import StatisticsTable from '../../components/StatisticsTable'

type Props = {
  geoBurnedAreaMODIS: BurnedAreaModis
  countryIso: string
}

const BurnedAreaPanel: React.FC<Props> = (props: Props) => {
  const columns = ['Source', 'Year', 'Burned area']
  const title = 'Burned area per year'
  const units = ['', '', 'ha']
  const loaded = true
  const { geoBurnedAreaMODIS, countryIso } = props

  // Formatting the data.
  const formattedTableData: (string | number)[][] = []
  geoBurnedAreaMODIS.forEach(({ ba: area, year }) => {
    const sourceName = 'MODIS'
    const formatedArea = Numbers.format(area, 0)
    formattedTableData.push([sourceName, year, formatedArea])
  })

  return (
    <div>
      <h3 className="table-title">{title}</h3>
      <StatisticsTable
        columns={columns}
        units={units}
        loaded={loaded}
        tableData={formattedTableData}
        countryIso={countryIso}
      />
    </div>
  )
}

export default BurnedAreaPanel
