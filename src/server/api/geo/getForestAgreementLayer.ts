import { Response } from 'express'

import { ForestAgreementLayerRequest } from 'meta/api/request'
import { ForestKey } from 'meta/geo'

import { GeoController } from 'server/controller/geo'
import Requests from 'server/utils/requests'

export const getForestAgreementLayer = async (req: ForestAgreementLayerRequest, res: Response) => {
  try {
    const agreementLayer = {
      countryIso: req.body.countryIso,
      layer: {
        key: ForestKey.Agreement,
        options: {
          agreement: {
            layers: req.body.layers,
            gteAgreementLevel: req.body.gteAgreementLevel,
          },
        },
      },
    }

    const layer = await GeoController.getForestLayer(agreementLayer)

    Requests.sendOk(res, layer)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
