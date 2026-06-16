import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request/cycleData/cycleData'
import { Sockets } from 'meta/socket/sockets'

import { ContactController } from 'server/controller/cycleData/contact'
import { SocketServer } from 'server/service/socket'
import Requests from 'server/utils/requests'

type Body = {
  uuid: string
}

export const removeContact = async (req: CycleDataRequest<never, Body>, res: Response): Promise<void> => {
  try {
    const user = Requests.getUser(req)
    const { assessment, cycle } = req.context
    const { assessmentName, countryIso, cycleName, sectionName, uuid } = req.query

    const props = { assessment, cycle, countryIso, sectionName, user, uuid }
    await ContactController.remove(props)

    SocketServer.emit(Sockets.getRequestReviewSummaryEvent({ assessmentName, cycleName, countryIso }))

    Requests.sendOk(res)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
