import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

export const copyOriginalDataPointNationalClasses = async (
  req: CycleRequest<{ year: string; targetYear: string }>,
  res: Response
) => {
  try {
    const { assessmentName, cycleName, year } = req.query
    const { targetYear } = req.body
    const { country } = req.context
    const user = Requests.getUser(req)

    const getOneWithCycleProps = { assessmentName, cycleName, metaCache: true }
    const { assessment, cycle } = await AssessmentController.getOneWithCycle(getOneWithCycleProps)

    const copyNationalClassesProps = { assessment, cycle, country, year, targetYear, user }
    const returnedOriginalDataPoint = await CycleDataController.copyOriginalDataPointNationalClasses(
      copyNationalClassesProps
    )

    Requests.send(res, returnedOriginalDataPoint)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
