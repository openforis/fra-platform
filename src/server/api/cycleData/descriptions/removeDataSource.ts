import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request/cycleData/cycleData'
import { Sockets } from 'meta/socket/sockets'

import { DescriptionController } from 'server/controller/cycleData/description'
import { SocketServer } from 'server/service/socket'
import Requests from 'server/utils/requests'

type Request = CycleDataRequest<{ uuid: string }>

export const removeDataSource = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = Requests.getUser(req)
    const { assessmentName, cycleName, sectionName, uuid } = req.query
    const { assessment, country, cycle } = req.context
    const { countryIso } = country

    const propsDelete = { assessment, cycle, country, sectionName, uuid, user }
    await DescriptionController.removeDataSource(propsDelete)

    SocketServer.emit(Sockets.getRequestReviewSummaryEvent({ assessmentName, cycleName, countryIso }))

    Requests.sendOk(res)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
