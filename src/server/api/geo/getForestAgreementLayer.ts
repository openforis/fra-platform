import { Request, Response } from 'express'

import { CountryIso } from '@meta/area'
import { ForestSource } from '@meta/geo'

import { GeoController } from '@server/controller/geo'
import Requests from '@server/utils/requests'

export const getForestAgreementLayer = async (
  req: Request<
    { countryIso: CountryIso },
    never,
    never,
    { gteAgreementLevel: number; gteHansenTreeCoverPerc: number; layer: Array<ForestSource>; opacity: number }
  >,
  res: Response
) => {
  try {
    const { countryIso } = req.params
    const { gteAgreementLevel, gteHansenTreeCoverPerc, layer, opacity } = req.query
    const sourceOptions = Object.values(ForestSource)

    if (Array.isArray(layer) && layer.length > 1) {
      const sourceLayersSet: Set<ForestSource> = new Set([])

      layer.forEach((layerId) => {
        if (sourceOptions.includes(layerId)) {
          if (
            layerId === ForestSource.Hansen &&
            (gteHansenTreeCoverPerc === undefined ||
              Number.isNaN(Number(gteHansenTreeCoverPerc)) ||
              gteHansenTreeCoverPerc < 0 ||
              gteHansenTreeCoverPerc > 100)
          )
            throw Error(`Not valid Hansen tree cover percentage 0-100: ${gteHansenTreeCoverPerc}`)

          sourceLayersSet.add(ForestSource[layerId as unknown as ForestSource])
        } else throw Error(`Not valid forest source for agreement: ${layerId}`)
      })
      if (sourceLayersSet.size < 2) throw Error(`Not valid forest agreement sources (2 minimum)`)

      if (Number.isNaN(Number(gteAgreementLevel)) || gteAgreementLevel < 1 || gteAgreementLevel > sourceLayersSet.size)
        throw Error(`Not valid forest agreement level 1-${sourceLayersSet.size}: ${gteAgreementLevel}`)

      if (opacity !== undefined && (Number.isNaN(Number(opacity)) || opacity < 0 || opacity > 1))
        throw Error(`Not valid opacity level 0-1: ${opacity}`)

      const agreementLayer = await GeoController.getForestAgreementLayer({
        countryIso,
        sourceLayers: Array.from(sourceLayersSet),
        gteHansenTreeCoverPerc,
        gteAgreementLevel,
        opacity,
      })

      Requests.sendOk(res, agreementLayer)
    } else throw Error(`Not forest agreement sources provided`)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
