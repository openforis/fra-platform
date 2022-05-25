import { Request, Response } from 'express'

import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'
import { MessageTopicStatus } from '@meta/messageCenter'
import { Sockets } from '@meta/socket/sockets'

import { AssessmentController } from '@server/controller/assessment'
import { MessageCenterController } from '@server/controller/messageCenter'
import { SocketServer } from '@server/service/socket'
import Requests from '@server/utils/requests'

import { sendRequestReviewUpdateEvents } from './sendRequestReviewUpdateEvents'

export const resolveTopic = async (req: Request, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName, key } = req.query as {
      countryIso: CountryIso
      assessmentName: AssessmentName
      cycleName: string
      key: string
    }
    const user = Requests.getRequestUser(req)

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ name: assessmentName, cycleName })

    const {
      topic: topicUpdated,
      topic: { type },
    } = await MessageCenterController.updateTopicStatus({
      user,
      countryIso,
      assessment,
      cycle,
      key,
      status: MessageTopicStatus.resolved,
    })

    SocketServer.emit(
      Sockets.getTopicStatusEvent({ assessment, cycle, topic: topicUpdated }),
      MessageTopicStatus.resolved
    )

    const { topic, message: messageCreated } = await MessageCenterController.addMessage({
      message: 'Marked as resolved',
      user,
      countryIso,
      assessment,
      cycle,
      key,
      type,
    })

    SocketServer.emit(Sockets.getTopicMessageAddEvent({ assessment, cycle, topic }), messageCreated)

    sendRequestReviewUpdateEvents({ countryIso, assessmentName, cycleName, topicKey: key })

    Requests.sendOk(res)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
