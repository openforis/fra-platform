import { NextFunction, Request, Response } from 'express'

import { CountryParams } from 'meta/api/request/country'
import { MessageTopicStatus } from 'meta/messageCenter/messageTopic'
import { Users } from 'meta/user/users'

import { MessageCenterController } from 'server/controller/messageCenter'
import { _getRequestParams } from 'server/middleware/auth/_getRequestParams'
import { _next } from 'server/middleware/auth/_next'
import { Requests } from 'server/utils'

export const requireEditMessageTopic = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const { countryIso, key } = _getRequestParams<CountryParams & { key: string }>(req)
  const user = Requests.getUser(req)

  const { assessment, cycle } = req.context
  const topic = await MessageCenterController.getTopic({ countryIso, assessment, cycle, key, user })

  if (topic) {
    _next(
      topic.status === MessageTopicStatus.opened ||
        (topic.status === MessageTopicStatus.resolved && Users.hasEditorRole({ user, countryIso, cycle })),
      next
    )
  } else {
    _next(!!user, next)
  }
}
