import { NextFunction, Request, Response } from 'express'

import { CountryIso } from 'meta/area/countryIso'

import { MessageCenterController } from 'server/controller/messageCenter'
import { _getRequestParams } from 'server/middleware/auth/_getRequestParams'
import { _next } from 'server/middleware/auth/_next'
import { Requests } from 'server/utils'

type RequestParams = {
  countryIso: CountryIso
  id: string
  topicKey: string
}

export const requireDeleteTopicMessage = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const { countryIso, id, topicKey: key } = _getRequestParams<RequestParams>(req)
  const user = Requests.getUser(req)
  const { assessment, cycle } = req.context

  const includeMessages = true
  const topic = await MessageCenterController.getTopic({ countryIso, assessment, cycle, includeMessages, key, user })

  if (topic && topic.messages.length > 0) {
    const message = topic.messages.filter((message) => message.id === Number(id))
    _next(!!message, next)
  } else {
    next(new Error(`messageNotFound`))
  }
}
