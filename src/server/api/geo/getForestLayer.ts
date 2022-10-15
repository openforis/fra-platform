import { Request, Response } from 'express'

import { CountryIso } from '@meta/area'
import { ForestSource } from '@meta/geo'

import { GeoController } from '@server/controller/geo'
import Requests from '@server/utils/requests'

export const getForestLayer = async (
  req: Request<
    { countryIso: CountryIso; forestSource: ForestSource; gteHansenTreeCoverPerc?: number },
    never,
    never,
    { onlyProtected: boolean; opacity: number }
  >,
  res: Response
) => {
  try {
    const { countryIso, forestSource, gteHansenTreeCoverPerc } = req.params
    const { onlyProtected, opacity } = req.query

    if (
      forestSource === ForestSource.Hansen &&
      (gteHansenTreeCoverPerc === undefined ||
        Number.isNaN(Number(gteHansenTreeCoverPerc)) ||
        gteHansenTreeCoverPerc < 0 ||
        gteHansenTreeCoverPerc > 100)
    )
      throw Error(`Not valid Hansen tree cover percentage 0-100: ${gteHansenTreeCoverPerc}`)

    if (opacity !== undefined && (Number.isNaN(Number(opacity)) || opacity < 0 || opacity > 1))
      throw Error(`Not valid opacity level 0-1: ${opacity}`)

    const layer = await GeoController.getForestLayer({
      countryIso,
      forestSource,
      gteHansenTreeCoverPerc,
      onlyProtected: onlyProtected !== undefined,
      opacity,
    })

    Requests.sendOk(res, layer)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
