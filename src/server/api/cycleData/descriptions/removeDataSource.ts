import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'
import { Sockets } from 'meta/socket'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import { SocketServer } from 'server/service/socket'
import Requests from 'server/utils/requests'

type Request = CycleDataRequest<{ uuid: string }>

export const removeDataSource = async (req: Request, res: Response) => {
  try {
    const { assessmentName, sectionName, cycleName, countryIso, uuid } = req.query

    const user = Requests.getUser(req)
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const propsDelete = { assessment, cycle, countryIso, sectionName, uuid, user }
    await CycleDataController.removeDataSource(propsDelete)

    SocketServer.emit(Sockets.getRequestReviewSummaryEvent({ assessmentName, cycleName, countryIso }))

    Requests.sendOk(res)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
