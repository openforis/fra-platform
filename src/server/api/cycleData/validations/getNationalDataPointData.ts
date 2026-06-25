import { Response } from 'express'

import { CountryRequest } from 'meta/api/request/country'

import { ValidationsController } from 'server/controller/cycleData/validations'
import Requests from 'server/utils/requests'

export const getNationalDataPointValidations = async (req: CountryRequest, res: Response): Promise<void> => {
  try {
    const { countryIso } = req.query
    const { assessment, cycle } = req.context

    const validations = await ValidationsController.getNationalDataPointValidations({ assessment, countryIso, cycle })

    Requests.send(res, validations)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
