import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Numbers } from 'utils/numbers'

import { ExtraEstimation, extraEstimationsMetadata, ForestKey, forestLayersMetadata } from 'meta/geo'

import { useGeoProtectedAreas, useGeoStatistics } from 'client/store/geo/statistics/hooks/statistics'
import { StatisticsTableData } from 'client/pages/Geo/StatisticsSidePanel/StatisticsTable/types'

type Returned = {
  columns: Array<string>
  errorKey?: string
  loading: boolean
  tableData: StatisticsTableData
  units: Array<string>
}

// refactor
const sourceNameKey: Record<string, string> = {
  faCopernicusProtected: forestLayersMetadata[ForestKey.Copernicus].titleKey,
  faEsa2009Protected: forestLayersMetadata[ForestKey.ESAGlobCover].titleKey,
  faEsa2020Protected: forestLayersMetadata[ForestKey.ESAWorldCover].titleKey,
  faEsriProtected: forestLayersMetadata[ForestKey.ESRI].titleKey,
  faGlobelandProtected: forestLayersMetadata[ForestKey.GlobeLand].titleKey,
  faHansen10Protected: 'geo.statistics.protectedArea.allGfc10',
  faHansen20Protected: 'geo.statistics.protectedArea.allGfc20',
  faHansen30Protected: 'geo.statistics.protectedArea.allGfc30',
  faJaxaProtected: forestLayersMetadata[ForestKey.JAXA].titleKey,
  faTandemxProtected: forestLayersMetadata[ForestKey.TandemX].titleKey,
  fra3bProtected: extraEstimationsMetadata[ExtraEstimation.ReportedToFRA2020].titleKey,
  faJrc2020Protected: forestLayersMetadata[ForestKey.JRC2020].titleKey,
}

export const useProtectedAreaData = (): Returned => {
  const { t } = useTranslation()
  const geoProtectedAreas = useGeoProtectedAreas()

  const { errorKey, loading } = useGeoStatistics()

  return useMemo<Returned>(() => {
    if (loading) {
      return {
        columns: [],
        errorKey,
        loading,
        tableData: [],
        units: [],
        title: '',
      }
    }

    const columns = [t('common.source'), t('geo.treeCoverProtectedAreasWithUnit', { unit: t('unit.haThousand') })]
    const units = ['', '']

    const formattedTableData: StatisticsTableData = []
    Object.entries(geoProtectedAreas).forEach(([source, value]) => {
      const formatedArea = Numbers.format(value / 1000, 0)
      const label = t(sourceNameKey[source])
      formattedTableData.push([{ value: label }, { value: formatedArea }])
    })

    return {
      columns,
      errorKey,
      loading,
      tableData: formattedTableData,
      units,
    }
  }, [errorKey, geoProtectedAreas, loading, t])
}
