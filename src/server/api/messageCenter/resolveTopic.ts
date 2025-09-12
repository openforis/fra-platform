import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'
import { MessageTopicStatus } from 'meta/messageCenter'
import { Sockets } from 'meta/socket'

import { MessageCenterController } from 'server/controller/messageCenter'
import { SocketServer } from 'server/service/socket'
import Requests from 'server/utils/requests'

import { sendRequestReviewUpdateEvents } from './sendRequestReviewUpdateEvents'

export const resolveTopic = async (req: CycleDataRequest, res: Response): Promise<void> => {
  try {
    const { countryIso, key, sectionName } = req.query
    const user = Requests.getUser(req)

    const { assessment, cycle } = req.context

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

    const assessmentName = assessment.props.name
    const cycleName = cycle.name

    sendRequestReviewUpdateEvents({ topic, countryIso, assessmentName, cycleName, sectionName })

    Requests.sendOk(res)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
