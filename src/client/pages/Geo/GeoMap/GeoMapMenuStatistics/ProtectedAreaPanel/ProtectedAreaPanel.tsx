import React from 'react'

import { Numbers } from 'utils/numbers'

import { ExtraEstimation, ForestKey, forestLayersMetadata } from 'meta/geo'

import StatisticsTable from 'client/pages/Geo/GeoMap/components/StatisticsTable'

type Props = {
  geoProtectedAreas: Record<string, number>
  countryIso: string
  year: number
}

// refactor
const sourceName: Record<string, string> = {
  faCopernicusProtected: forestLayersMetadata[ForestKey.Copernicus].title,
  faEsa2009Protected: forestLayersMetadata[ForestKey.ESAGlobCover].title,
  faEsa2020Protected: forestLayersMetadata[ForestKey.ESAWorldCover].title,
  faEsriProtected: forestLayersMetadata[ForestKey.ESRI].title,
  faGlobelandProtected: forestLayersMetadata[ForestKey.GlobeLand].title,
  faHansen10Protected: 'All (GFC Hansen >=10%)',
  faHansen20Protected: 'All (GFC Hansen >=20%)',
  faHansen30Protected: 'All (GFC Hansen >=30%)',
  faJaxaProtected: forestLayersMetadata[ForestKey.JAXA].title,
  faTandemxProtected: forestLayersMetadata[ForestKey.TandemX].title,
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
