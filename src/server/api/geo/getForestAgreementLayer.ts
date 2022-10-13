import { Request, Response } from 'express'

import { CountryIso } from '@meta/area'
import { ForestSource } from '@meta/geo'

import { GeoController } from '@server/controller/geo'
import Requests from '@server/utils/requests'

export const getForestAgreementLayer = async (req: Request, res: Response) => {
  try {
    const countryIso: CountryIso = req.params.countryIso as CountryIso
    const gteAgreementLevel = Number(req.query.gteAgreementLevel)
    const gteHansenTreeCoverPerc = Number(req.query.gteHansenTreeCoverPerc)

    const sourceOptions = Object.values(ForestSource)

    if (Array.isArray(req.query.layer) && req.query.layer.length > 1) {
      const sourceLayersSet: Set<ForestSource> = new Set([])
      req.query.layer.forEach((layer) => {
        if (sourceOptions.includes(layer as unknown as ForestSource))
          sourceLayersSet.add(ForestSource[layer as unknown as ForestSource])
        else throw Error(`Not valid forest source for agreement-${layer}`)
      })
      if (sourceLayersSet.size < 2) throw Error(`Not valid forest agreement sources (2 minimum)`)

      if (Number.isNaN(gteAgreementLevel) || gteAgreementLevel < 1 || gteAgreementLevel > sourceLayersSet.size)
        throw Error(`Not valid forest agreement level 1-${sourceLayersSet.size}: ${gteAgreementLevel}`)

      const layer = await GeoController.getForestAgreementLayer({
        countryIso,
        sourceLayers: Array.from(sourceLayersSet),
        gteHansenTreeCoverPerc,
        gteAgreementLevel,
      })
      Requests.sendOk(res, layer)
    } else throw Error(`Not forest agreement sources provided`)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
