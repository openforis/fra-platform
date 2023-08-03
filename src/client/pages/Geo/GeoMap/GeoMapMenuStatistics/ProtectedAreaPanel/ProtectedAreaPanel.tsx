import React from 'react'

import { Numbers } from 'utils/numbers'

import { ExtraEstimation, ForestSource } from 'meta/geo'

import StatisticsTable from '../../components/StatisticsTable'

type Props = {
  geoProtectedAreas: Record<string, number>
  countryIso: string
  year: number
}

// refactor
const sourceName: Record<string, string> = {
  faCopernicusProtected: ForestSource.Copernicus,
  faEsa2009Protected: ForestSource.ESAGlobCover,
  faEsa2020Protected: ForestSource.ESAWorldCover,
  faEsriProtected: ForestSource.ESRI,
  faGlobelandProtected: ForestSource.GlobeLand,
  faHansen10Protected: 'All (GFC Hansen >=10%)',
  faHansen20Protected: 'All (GFC Hansen >=20%)',
  faHansen30Protected: 'All (GFC Hansen >=30%)',
  faJaxaProtected: ForestSource.JAXA,
  faTandemxProtected: ForestSource.TandemX,
  fra3bProtected: ExtraEstimation.ReportedToFRA,
}

const ProtectedAreaPanel: React.FC<Props> = (props: Props) => {
  const columns = ['Source', 'Protected area']
  const title = 'Protected area by year'
  const units = ['', 'ha']
  const loaded = true
  const { geoProtectedAreas, countryIso, year } = props

  // Formatting the data.
  const formattedTableData: (string | number)[][] = []
  Object.entries(geoProtectedAreas).forEach(([source, value]) => {
    const formatedArea = Numbers.format(value, 0)
    formattedTableData.push([sourceName[source], formatedArea])
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
        year={year}
      />
    </div>
  )
}

export default ProtectedAreaPanel
