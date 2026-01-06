import { ExtraEstimation } from 'meta/geo/extraEstimation/extraEstimation'
import { extraEstimationsMetadata } from 'meta/geo/extraEstimation/metadata'
import { ForestKey } from 'meta/geo/forest/key'
import { forestLayersMetadata } from 'meta/geo/forest/layersMetadata'
import { ProtectedAreaEstimations } from 'meta/geo/protectedArea/estimations'

export const protectedAreaSources: Record<keyof ProtectedAreaEstimations, { titleKey: string }> = {
  faCopernicusProtected: { titleKey: forestLayersMetadata[ForestKey.Copernicus].titleKey },
  faEsa2009Protected: { titleKey: forestLayersMetadata[ForestKey.ESAGlobCover].titleKey },
  faEsa2020Protected: { titleKey: forestLayersMetadata[ForestKey.ESAWorldCover].titleKey },
  faEsriProtected: { titleKey: forestLayersMetadata[ForestKey.ESRI].titleKey },
  faGlobelandProtected: { titleKey: forestLayersMetadata[ForestKey.GlobeLand].titleKey },
  faHansen10Protected: { titleKey: 'geo.statistics.protectedArea.allGfc10' },
  faHansen20Protected: { titleKey: 'geo.statistics.protectedArea.allGfc20' },
  faHansen30Protected: { titleKey: 'geo.statistics.protectedArea.allGfc30' },
  faJaxaProtected: { titleKey: forestLayersMetadata[ForestKey.JAXA].titleKey },
  faTandemxProtected: { titleKey: forestLayersMetadata[ForestKey.TandemX].titleKey },
  fra3bProtected: { titleKey: extraEstimationsMetadata[ExtraEstimation.ReportedToFRA].titleKey },
  faJrc2020Protected: { titleKey: forestLayersMetadata[ForestKey.JRC2020].titleKey },
}

export const protectedAreaKeys = Object.keys(protectedAreaSources) as Array<keyof ProtectedAreaEstimations>
