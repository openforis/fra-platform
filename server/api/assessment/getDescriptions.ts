import { Request, Response } from 'express'

import { CountryIso } from '@meta/area'

import { AssessmentController } from '@server/controller/assessment'
import { CycleDataController } from '@server/controller/cycleData'
import Requests from '@server/utils/requests'

export const getDescriptions = async (req: Request, res: Response) => {
  try {
    const { assessmentName, sectionName, cycleName, countryIso } = <
      Record<string, string> & { countryIso: CountryIso }
    >req.query

    const { cycle, assessment } = await AssessmentController.getOneWithCycle({ name: assessmentName, cycleName })
    const descriptions = await CycleDataController.getDescriptions({
      countryIso,
      assessment,
      cycle,
      sectionName,
    })

    Requests.send(res, descriptions)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
