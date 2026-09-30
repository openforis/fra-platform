import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request/cycleData/cycleData'
import { SectionName } from 'meta/assessment/section'

import { DataValidationService } from 'server/service/dataValidation'
import Requests from 'server/utils/requests'

type Request = CycleDataRequest<{
  sectionName: SectionName
}>

export const getDescriptionValidations = async (req: Request, res: Response): Promise<void> => {
  try {
    const { countryIso, sectionName } = req.query
    const { assessment, cycle } = req.context

    const descriptionValidations = await DataValidationService.getDescriptionValidations({
      assessment,
      countryIso,
      cycle,
      sectionNames: [sectionName],
    })

    Requests.send(res, descriptionValidations)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
