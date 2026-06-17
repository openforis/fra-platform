import { Response } from 'express'

import { CountryRequest } from 'meta/api/request/country'

import { ValidationsController } from 'server/controller/cycleData/validations'
import Requests from 'server/utils/requests'

export const getValidationSummary = async (req: CountryRequest, res: Response): Promise<void> => {
  try {
    const { countryIso } = req.query
    const { assessment, cycle } = req.context

    const summary = await ValidationsController.getValidationSummary({ assessment, countryIso, cycle })

    Requests.send(res, summary)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
