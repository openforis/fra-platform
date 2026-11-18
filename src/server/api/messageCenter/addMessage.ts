import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request/cycleData/cycleData'
import { MessageTopicStatus, MessageTopicType } from 'meta/messageCenter/messageTopic'
import { Sockets } from 'meta/socket/sockets'

import { MessageCenterController } from 'server/controller/messageCenter'
import { SocketServer } from 'server/service/socket'
import Requests from 'server/utils/requests'

import { sendRequestReviewUpdateEvents } from './sendRequestReviewUpdateEvents'

type Request = CycleDataRequest<{ key: string; type: MessageTopicType }, { message: string }>

export const addMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { countryIso, key, sectionName, type } = req.query
    const user = Requests.getUser(req)
    const { message } = req.body

    const { assessment, cycle } = req.context

    const { message: messageCreated, topic } = await MessageCenterController.addMessage({
      message,
      user,
      countryIso,
      assessment,
      cycle,
      sectionName,
      key,
      type,
    })

    const messageAddEvent = Sockets.getTopicMessageAddEvent({ assessment, cycle, topic })
    SocketServer.emitToMessageTopicRooms({ cycle, eventName: messageAddEvent, topic }, messageCreated)

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

      const statusEvent = Sockets.getTopicStatusEvent({ assessment, cycle, topic: topicUpdated })
      SocketServer.emitToMessageTopicRooms(
        { cycle, eventName: statusEvent, topic: topicUpdated },
        MessageTopicStatus.opened
      )
    }

    sendRequestReviewUpdateEvents({ assessment, cycle, sectionName, topic })

    Requests.sendOk(res)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
