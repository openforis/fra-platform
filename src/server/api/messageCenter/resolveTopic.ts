import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request/cycleData/cycleData'
import { MessageTopicStatus } from 'meta/messageCenter/messageTopic'
import { Sockets } from 'meta/socket/sockets'

import { MessageCenterController } from 'server/controller/messageCenter'
import { SocketServer } from 'server/service/socket'
import Requests from 'server/utils/requests'

import { sendRequestReviewUpdateEvents } from './sendRequestReviewUpdateEvents'

export const resolveTopic = async (req: CycleDataRequest<{ key: string }>, res: Response): Promise<void> => {
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

    const statusEvent = Sockets.getTopicStatusEvent({ assessment, cycle, topic })
    SocketServer.emitToMessageTopicRooms({ cycle, eventName: statusEvent, topic }, MessageTopicStatus.resolved)

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

    const messageAddEvent = Sockets.getTopicMessageAddEvent({ assessment, cycle, topic })
    SocketServer.emitToMessageTopicRooms({ cycle, eventName: messageAddEvent, topic }, message)

    sendRequestReviewUpdateEvents({ assessment, cycle, sectionName, topic })

    Requests.sendOk(res)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
