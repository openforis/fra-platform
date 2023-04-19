import { Response } from 'express'

import { CycleDataRequest } from '@meta/api/request'

import { AssessmentController } from '@server/controller/assessment'
import { CycleDataController } from '@server/controller/cycleData'
import Requests from '@server/utils/requests'

export const getDataSources = async (req: CycleDataRequest<{ variableNames: Array<string> }>, res: Response) => {
  try {
    const { assessmentName, countryIso, cycleName, sectionName, variableNames } = req.query

    const { cycle, assessment } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const dataSources = await CycleDataController.getDataSources({
      assessment,
      countryIso,
      cycle,
      sectionName,
      variableNames,
    })

    Requests.send(res, dataSources)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
