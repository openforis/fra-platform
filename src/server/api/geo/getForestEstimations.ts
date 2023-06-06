import { Request, Response } from 'express'

import { ForestAgreementAreaEstimationRequest, ForestEstimationsRequest } from 'meta/api/request/geo/layer'
import { CountryIso } from 'meta/area'
import { ForestSource, LayerSource } from 'meta/geo'

import { GeoController } from 'server/controller/geo'
import Requests from 'server/utils/requests'

export const getForestEstimations = async (req: ForestEstimationsRequest, res: Response) => {
  try {
    const layer = await GeoController.getForestEstimations(req.query)
    Requests.sendOk(res, layer)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}

export const estimateImageArea = async (req: ForestAgreementAreaEstimationRequest, res: Response) => {
  try {
    const agreementLayer = {
      countryIso: req.body.countryIso,
      layer: {
        key: ForestSource.Agreement,
        options: {
          agreement: {
            layers: req.body.layers,
            gteAgreementLevel: req.body.gteAgreementLevel,
          },
        },
      },
      scale: req.body.scale,
    }
    const areaHa = await GeoController.estimateImageArea(agreementLayer)
    Requests.sendOk(res, areaHa)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}

export const estimateIntersectionArea = async (
  req: Request<
    never,
    never,
    {
      countryIso: CountryIso
      baseSource: LayerSource
      maskSource: LayerSource
      scale?: number
    },
    never
  >,
  res: Response
) => {
  try {
    const areaHa = await GeoController.estimateIntersectionArea(req.body)
    Requests.sendOk(res, areaHa)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
