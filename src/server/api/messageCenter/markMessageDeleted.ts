import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'
import { Sockets } from 'meta/socket'

import { AssessmentController } from 'server/controller/assessment'
import { MessageCenterController } from 'server/controller/messageCenter'
import { SocketServer } from 'server/service/socket'
import Requests from 'server/utils/requests'

import { sendRequestReviewUpdateEvents } from './sendRequestReviewUpdateEvents'

export const markMessageDeleted = async (
  req: CycleDataRequest<{
    topicKey: string
    messageId: string
  }>,
  res: Response
) => {
  try {
    const { countryIso, assessmentName, cycleName, topicKey, messageId, sectionName } = req.query

    const user = Requests.getUser(req)

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    await MessageCenterController.markMessageDeleted({
      user,
      countryIso,
      assessment,
      cycle,
      sectionName,
      id: Number(messageId),
    })

    const topic = await MessageCenterController.getTopic({
      user,
      assessment,
      cycle,
      countryIso,
      includeMessages: false,
      key: topicKey,
    })
    SocketServer.emit(Sockets.getTopicMessageDeleteEvent({ assessment, cycle, topic }), {
      topicKey,
      messageId,
    })
    sendRequestReviewUpdateEvents({ topic, countryIso, assessmentName, cycleName, sectionName })

    Requests.sendOk(res)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
