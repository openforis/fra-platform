import { Request, Response } from 'express'

import { TablePaginatedOrderByDirection } from 'meta/tablePaginated/orderBy'

import { AnalyticsController } from 'server/controller/analytics'
import Requests from 'server/utils/requests'

type QueryParams = {
  limit?: string
  offset?: string
  orderBy?: string
  orderByDirection?: TablePaginatedOrderByDirection
}
type GetTrackingEventsRequest = Request<never, never, never, QueryParams>

export const getTrackingEvents = async (req: GetTrackingEventsRequest, res: Response): Promise<void> => {
  try {
    const { limit: limitReq, offset: offsetReq, orderBy, orderByDirection } = req.query

    const limit = limitReq ? Number(limitReq) : undefined
    const offset = offsetReq ? Number(offsetReq) : undefined

    const events = await AnalyticsController.findAll({ limit, offset, orderBy, orderByDirection })

    Requests.sendOk(res, events)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
