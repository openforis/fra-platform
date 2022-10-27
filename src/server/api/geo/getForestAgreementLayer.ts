import { Response } from 'express'

import { ForestAgreementLayerRequest } from '@meta/api/request'
import { ForestSource } from '@meta/geo'

import { GeoController } from '@server/controller/geo'
import Requests from '@server/utils/requests'

export const getForestAgreementLayer = async (req: ForestAgreementLayerRequest, res: Response) => {
  try {
    const { countryIso, gteAgreementLevel, gteHansenTreeCoverPerc, layer, opacity } = req.query
    const sourceOptions = Object.values(ForestSource)

    if (Array.isArray(layer) && layer.length > 1) {
      const sourceLayersSet: Set<ForestSource> = new Set([])

      layer.forEach((layerId) => {
        if (sourceOptions.includes(layerId)) {
          if (
            layerId === ForestSource.Hansen &&
            (gteHansenTreeCoverPerc === undefined ||
              Number.isNaN(Number(gteHansenTreeCoverPerc)) ||
              Number(gteHansenTreeCoverPerc) < 0 ||
              Number(gteHansenTreeCoverPerc) > 100)
          )
            throw Error(`Not valid Hansen tree cover percentage 0-100: ${gteHansenTreeCoverPerc}`)

          sourceLayersSet.add(layerId)
        } else throw Error(`Not valid forest source for agreement: ${layerId}`)
      })
      if (sourceLayersSet.size < 2) throw Error(`Not valid forest agreement sources (2 minimum)`)

      if (
        Number.isNaN(Number(gteAgreementLevel)) ||
        Number(gteAgreementLevel) < 1 ||
        Number(gteAgreementLevel) > sourceLayersSet.size
      )
        throw Error(`Not valid forest agreement level 1-${sourceLayersSet.size}: ${gteAgreementLevel}`)

      if (opacity !== undefined && (Number.isNaN(Number(opacity)) || Number(opacity) < 0 || Number(opacity) > 1))
        throw Error(`Not valid opacity level 0-1: ${opacity}`)

      const agreementLayer = await GeoController.getForestAgreementLayer({
        countryIso,
        sourceLayers: Array.from(sourceLayersSet),
        gteHansenTreeCoverPerc: Number(gteHansenTreeCoverPerc),
        gteAgreementLevel: Number(gteAgreementLevel),
        opacity: Number(opacity),
      })

      Requests.sendOk(res, agreementLayer)
    } else throw Error(`Not forest agreement sources provided`)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
