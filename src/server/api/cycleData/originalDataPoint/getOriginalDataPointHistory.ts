import { Response } from 'express'
import { Objects } from 'utils/objects'

import { CycleDataRequest } from 'meta/api/request'

import { CycleDataController } from 'server/controller/cycleData'
import { Requests } from 'server/utils'

type Request = CycleDataRequest<{ year: string }>

export const getOriginalDataPointHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { countryIso, year } = req.query
    const { assessment, cycle } = req.context

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
