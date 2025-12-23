// @ts-ignore
import { FeatureCollection, Filter, ImageCollection } from '@google/earthengine'

import { LayerConfig } from 'meta/geo/layer/config'

const boundaryColor = '#dadada'

export const getUNBoundariesLayer = async (): Promise<LayerConfig> => {
  const fc = FeatureCollection('users/frarssuser1/GAUL_BNDL_23122025_/BNDL')

  const imgDashed = fc.filter(Filter.eq('LINE', 'dashed')).style({
    color: boundaryColor,
    fillColor: '00000000',
    lineType: 'dashed',
    width: 1,
  })

  const imgDotted = fc.filter(Filter.eq('LINE', 'dotted')).style({
    color: boundaryColor,
    fillColor: '00000000',
    lineType: 'dotted',
    width: 1,
  })

  const imgSolid = fc.filter(Filter.or(Filter.eq('LINE', 'solid'), Filter.eq('LINE', 'ANTARTICA'))).style({
    color: boundaryColor,
    fillColor: '00000000',
    lineType: 'solid',
    width: 1,
  })

  const finalImage = ImageCollection([imgDashed, imgDotted, imgSolid]).mosaic()

  const map = await finalImage.getMap({})

  return { mapId: map.mapid, palette: [boundaryColor], tileUrl: map.urlFormat }
}
