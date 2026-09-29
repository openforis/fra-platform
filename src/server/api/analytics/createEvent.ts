import { Request, Response } from 'express'

import { AnalyticsController } from 'server/controller/analytics'
import Requests from 'server/utils/requests'

type Body = {
  eventType: string
  payload: Record<string, unknown>
  sessionId: string
}

type CreateEventRequest = Request<never, never, Body>

export const createEvent = async (req: CreateEventRequest, res: Response): Promise<void> => {
  try {
    const { eventType, payload, sessionId } = req.body
    await AnalyticsController.create({ eventType, payload, sessionId })
    Requests.sendOk(res)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
