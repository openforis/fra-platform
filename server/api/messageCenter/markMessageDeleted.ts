import { Request, Response } from 'express'

import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'
import { Sockets } from '@meta/socket/sockets'

import { AssessmentController } from '@server/controller/assessment'
import { MessageCenterController } from '@server/controller/messageCenter'
import { SocketServer } from '@server/service/socket'
import Requests from '@server/utils/requests'

import { sendRequestReviewUpdateEvents } from './sendRequestReviewUpdateEvents'

export const markMessageDeleted = async (req: Request, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName, topicKey, messageId, section } = req.query as {
      countryIso: CountryIso
      assessmentName: AssessmentName
      section: string
      cycleName: string
      topicKey: string
      messageId: string
    }
    const user = Requests.getRequestUser(req)

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ name: assessmentName, cycleName })

    await MessageCenterController.markMessageDeleted({ user, assessment, cycle, id: Number(messageId) })

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
    sendRequestReviewUpdateEvents({ topic, countryIso, assessmentName, cycleName, sectionName: section })

    Requests.sendOk(res)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
