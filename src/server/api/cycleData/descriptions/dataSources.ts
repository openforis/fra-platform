import { Response } from 'express'

import { CycleDataRequest } from '@meta/api/request'

import { AssessmentController } from '@server/controller/assessment'
import { CycleDataController } from '@server/controller/cycleData'
import Requests from '@server/utils/requests'

export const getDataSources = async (req: CycleDataRequest<{ variableNames: string }>, res: Response) => {
  try {
    const {
      assessmentName,
      sectionName,
      cycleName,
      variableNames, // Is his a JSON string??
    } = req.query

    // TODO: Check if variableNames is a JSON string and fix accordingly
    // Parse the variableNames JSON string into an array
    const variableNamesArray = JSON.parse(variableNames)

    const { cycle, assessment } = await AssessmentController.getOneWithCycle({
      assessmentName,
      cycleName,
    })

    // TODO: Implement getDataSources on CycleDataController
    const dataSources = await CycleDataController.getDataSources({
      assessment,
      cycle,
      sectionName,
      variableNames: variableNamesArray,
    })

    Requests.send(res, dataSources)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
