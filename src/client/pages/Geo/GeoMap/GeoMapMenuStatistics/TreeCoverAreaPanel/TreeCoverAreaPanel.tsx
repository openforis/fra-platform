import React from 'react'

import { Numbers } from 'utils/numbers'

import { useGeoFra1aLandArea } from 'client/store/ui/geo/hooks'
import StatisticsTable from 'client/pages/Geo/GeoMap/components/StatisticsTable'

type Props = {
  data: [string, number, number, string][]
  countryIso: string
  year: number
}

const TreeCoverAreaPanel: React.FC<Props> = (props: Props) => {
  const fra1aLandArea = useGeoFra1aLandArea()
  const columns = ['Source', 'Forest area', 'Forest area % of land area']

  const csvHeaders = [
    { label: 'Source', key: 'source' },
    { label: 'Land area', key: 'landArea' },
    { label: 'Forest area, ha', key: 'forestAreaHa' },
    { label: 'Forest area % of land area', key: 'forestAreaPercentage' },
  ]
  const csvData: { source: string; landArea: string; forestAreaHa: string; forestAreaPercentage: string }[] = []

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

    csvData.push({
      source: sourceName,
      landArea: fra1aLandArea.toString(),
      forestAreaHa: formatedArea,
      forestAreaPercentage: `${percentage} %`,
    })
  })
  const customCsvDownload = {
    headers: csvHeaders,
    data: csvData,
  }

  return (
    <div>
      <StatisticsTable
        columns={columns}
        units={units}
        loaded={loaded}
        tableData={formattedTableData}
        countryIso={countryIso}
        year={year}
        customCsvDownload={customCsvDownload}
      />
    </div>
  )
}

export default TreeCoverAreaPanel
