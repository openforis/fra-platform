import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request/cycleData/cycleData'

import { DataValidationService } from 'server/service/dataValidation'
import Requests from 'server/utils/requests'

export const getNationalDataPointValidations = async (req: CycleDataRequest, res: Response): Promise<void> => {
  try {
    const { countryIso } = req.query
    const { assessment, cycle } = req.context

    const validations = await DataValidationService.getNationalDataPointValidations({ assessment, countryIso, cycle })

    Requests.send(res, validations)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
