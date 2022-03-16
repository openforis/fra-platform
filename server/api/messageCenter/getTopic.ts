import { Request, Response } from 'express'
import Requests from '@server/utils/requests'
import { MessageCenterController } from '@server/controller/messageCenter'

export const getTopic = async (req: Request, res: Response) => {
  const { topicId } = req.query
  try {
    const topic = await MessageCenterController.getTopic({ topicId: Number(topicId) })
    res.send(topic)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
