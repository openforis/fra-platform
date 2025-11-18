import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request/cycleData/cycleData'
import { Sockets } from 'meta/socket/sockets'

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
): Promise<void> => {
  try {
    const user = Requests.getUser(req)
    const { assessment, cycle } = req.context
    const { countryIso, messageId, sectionName, topicKey } = req.query

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

    const assessmentName = assessment.props.name
    const cycleName = cycle.name

    sendRequestReviewUpdateEvents({ topic, countryIso, assessmentName, cycleName, sectionName })

    Requests.sendOk(res)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
