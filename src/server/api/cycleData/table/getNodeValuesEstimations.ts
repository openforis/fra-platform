import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request/cycleData/cycleData'

import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

export const getNodeValuesEstimations = async (
  req: CycleDataRequest<{ tableName: string }>,
  res: Response
): Promise<void> => {
  try {
    const { assessment, cycle } = req.context
    const { countryIso, tableName } = req.query

    const nodeValueEstimations = await CycleDataController.getNodeValuesEstimations({
      assessment,
      countryIso,
      cycle,
      tableName,
    })

    Requests.send(res, nodeValueEstimations)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
