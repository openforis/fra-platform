// @ts-ignore
import { FeatureCollection } from '@google/earthengine'

import { LayerConfig } from 'meta/geo/layer/config'

const unBlue = '#5B92E5'

export const getUNBoundariesLayer = async (): Promise<LayerConfig> => {
  const gaul2024Level0 = FeatureCollection('projects/sat-io/open-datasets/FAO/GAUL/GAUL_2024_L0').style({
    color: unBlue,
    fillColor: `${unBlue.replace('#', '')}00`,
    width: 1.5,
  })

  const map = await gaul2024Level0.getMap({})

  return { mapId: map.mapid, palette: [unBlue], tileUrl: map.urlFormat }
}
