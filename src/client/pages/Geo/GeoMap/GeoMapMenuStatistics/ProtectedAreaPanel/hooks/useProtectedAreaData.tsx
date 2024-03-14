import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Numbers } from 'utils/numbers'

import { ExtraEstimation, ForestKey, forestLayersMetadata } from 'meta/geo'

import { useGeoProtectedAreas, useGeoStatistics } from 'client/store/ui/geo/hooks'

type Returned = {
  columns: Array<string>
  error?: string
  isLoading: boolean
  tableData: (string | number)[][]
  title: string
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
  fra3bProtected: ExtraEstimation.ReportedToFRA,
}

export const useProtectedAreaData = (): Returned => {
  const { t } = useTranslation()
  const geoProtectedAreas = useGeoProtectedAreas()

  const { isLoading, error } = useGeoStatistics()

  return useMemo<Returned>(() => {
    if (isLoading) {
      return {
        columns: [],
        error,
        isLoading,
        tableData: [],
        units: [],
        title: '',
      }
    }

    const columns = [t('common.source'), t('geo.protectedArea')]
    const title = t('geo.statistics.protectedArea.protectedAreaByYear')
    const units = ['', t('unit.ha')]

    const formattedTableData: (string | number)[][] = []
    Object.entries(geoProtectedAreas).forEach(([source, value]) => {
      const formatedArea = Numbers.format(value, 0)
      const label = t(sourceNameKey[source])
      formattedTableData.push([label, formatedArea])
    })

    return {
      columns,
      error,
      isLoading,
      tableData: formattedTableData,
      title,
      units,
    }
  }, [error, geoProtectedAreas, isLoading, t])
}
