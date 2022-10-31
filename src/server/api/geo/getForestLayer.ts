import { Response } from 'express'

import { ForestLayerRequest } from '@meta/api/request'
import { ForestSource } from '@meta/geo'

import { GeoController } from '@server/controller/geo'
import Requests from '@server/utils/requests'

export const getForestLayer = async (req: ForestLayerRequest, res: Response) => {
  try {
    const { onlyProtected, opacity, countryIso, forestSource, gteHansenTreeCoverPerc } = req.query

    if (
      forestSource === ForestSource.Hansen &&
      (gteHansenTreeCoverPerc === undefined ||
        Number.isNaN(Number(gteHansenTreeCoverPerc)) ||
        Number(gteHansenTreeCoverPerc) < 0 ||
        Number(gteHansenTreeCoverPerc) > 100)
    )
      throw Error(`Not valid Hansen tree cover percentage 0-100: ${gteHansenTreeCoverPerc}`)

    if (opacity !== undefined && (Number.isNaN(Number(opacity)) || Number(opacity) < 0 || Number(opacity) > 1))
      throw Error(`Not valid opacity level 0-1: ${opacity}`)

    const layer = await GeoController.getForestLayer({
      countryIso,
      forestSource,
      gteHansenTreeCoverPerc: Number(gteHansenTreeCoverPerc),
      onlyProtected: onlyProtected !== undefined,
      opacity: Number(opacity),
    })

    Requests.sendOk(res, layer)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
