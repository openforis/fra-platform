import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'
import { MessageTopicStatus, MessageTopicType } from 'meta/messageCenter'
import { Sockets } from 'meta/socket'

import { AssessmentController } from 'server/controller/assessment'
import { MessageCenterController } from 'server/controller/messageCenter'
import { SocketServer } from 'server/service/socket'
import Requests from 'server/utils/requests'

import { sendRequestReviewUpdateEvents } from './sendRequestReviewUpdateEvents'

export const addMessage = async (req: CycleDataRequest<{ key: string; type: MessageTopicType }>, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName, key, type, sectionName } = req.query
    const user = Requests.getUser(req)
    const { message } = req.body

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const { topic, message: messageCreated } = await MessageCenterController.addMessage({
      message,
      user,
      countryIso,
      assessment,
      cycle,
      sectionName,
      key,
      type,
    })

    SocketServer.emit(Sockets.getTopicMessageAddEvent({ assessment, cycle, topic }), messageCreated)

    if (topic.status === MessageTopicStatus.resolved) {
      const topicUpdated = await MessageCenterController.updateTopicStatus({
        user,
        countryIso,
        assessment,
        cycle,
        sectionName,
        key,
        status: MessageTopicStatus.opened,
      })

      SocketServer.emit(Sockets.getTopicStatusEvent({ assessment, cycle, topic: topicUpdated }), MessageTopicStatus.opened)
    }

    sendRequestReviewUpdateEvents({ countryIso, assessmentName, cycleName, sectionName, topic })

    Requests.sendOk(res)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
