import { Request, Response } from 'express'

import { CountryIso } from 'meta/area'
import { MessageTopicStatus } from 'meta/messageCenter'
import { Sockets } from 'meta/socket'

import { AssessmentController } from 'server/controller/assessment'
import { MessageCenterController } from 'server/controller/messageCenter'
import { SocketServer } from 'server/service/socket'
import Requests from 'server/utils/requests'

import { sendRequestReviewUpdateEvents } from './sendRequestReviewUpdateEvents'

export const resolveTopic = async (req: Request, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName, key, sectionName } = req.query as {
      countryIso: CountryIso
      assessmentName: string
      sectionName: string
      cycleName: string
      key: string
    }
    const user = Requests.getUser(req)

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const topic = await MessageCenterController.updateTopicStatus({
      user,
      countryIso,
      assessment,
      cycle,
      sectionName,
      key,
      status: MessageTopicStatus.resolved,
    })

    SocketServer.emit(Sockets.getTopicStatusEvent({ assessment, cycle, topic }), MessageTopicStatus.resolved)

    const { message } = await MessageCenterController.addMessage({
      message: 'Marked as resolved',
      user,
      countryIso,
      assessment,
      cycle,
      sectionName,
      key,
      type: topic.type,
    })

    SocketServer.emit(Sockets.getTopicMessageAddEvent({ assessment, cycle, topic }), message)

    sendRequestReviewUpdateEvents({ topic, countryIso, assessmentName, cycleName, sectionName })

    Requests.sendOk(res)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
