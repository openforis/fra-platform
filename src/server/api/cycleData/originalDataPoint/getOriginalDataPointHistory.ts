import { Response } from 'express'
import { Objects } from 'utils/objects'

import { CycleDataRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import { Requests } from 'server/utils'

export const getOriginalDataPointHistory = async (req: CycleDataRequest<{ year: string }>, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName, year } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
    const info = await CycleDataController.History.LastApproved.getInfo({ assessment, cycle, countryIso })

    if (Objects.isNil(info)) {
      Requests.send(res, {})
    } else {
      const _props = { assessment, cycle, countryIso, info, year }
      const odpLastApproved = await CycleDataController.getOriginalDataPointLastApproved(_props)
      Requests.send(res, odpLastApproved)
    }
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
