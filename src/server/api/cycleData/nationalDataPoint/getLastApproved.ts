import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request/cycleData/cycleData'
import { Objects } from 'utils/objects'

import { HistoryController } from 'server/controller/cycleData/history'
import { NationalDataPointController } from 'server/controller/cycleData/nationalDataPoint'
import { Requests } from 'server/utils'

type Request = CycleDataRequest<{ year: string }>

export const getLastApproved = async (req: Request, res: Response): Promise<void> => {
  try {
    const { countryIso, year } = req.query
    const { assessment, cycle } = req.context

    const info = await HistoryController.LastApproved.getInfo({ assessment, cycle, countryIso })

    if (Objects.isNil(info)) {
      Requests.send(res, {})
    } else {
      const _props = { assessment, cycle, countryIso, info, year }
      const ndpLastApproved = await NationalDataPointController.getLastApproved(_props)
      Requests.send(res, ndpLastApproved)
    }
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
