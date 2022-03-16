import { Request, Response } from 'express'
import Requests from '@server/utils/requests'
import { MessageCenterController } from '@server/controller/messageCenter'
import { UserController } from '@server/controller/user'
import { MessageTopicStatus } from '@meta/messageCenter'
import { CountryIso } from '@core/country'
import { AssessmentController } from '@server/controller/assessment'

export const addMessage = async (req: Request, res: Response) => {
  const { email, topicId, countryIso, assessmentName, cycleName, key } = req.query
  const { message } = req.body
  try {
    const user = await UserController.read({ user: { email: String(email) } })
    let topic = null
    if (topicId) topic = await MessageCenterController.addMessage({ message, user, topicId: Number(topicId) })
    else {
      const { assessment, cycle } = await AssessmentController.getOneWithCycle({
        name: String(assessmentName),
        cycleName: String(cycleName),
      })
      topic = await MessageCenterController.addMessage({
        message,
        user,
        topic: {
          countryIso: countryIso as CountryIso,
          assessment,
          cycle,
          key: String(key),
          status: MessageTopicStatus.opened,
        },
      })
    }
    res.send(topic)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
