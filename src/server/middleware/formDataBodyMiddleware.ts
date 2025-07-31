import { RequestHandler } from 'express'
import { Objects } from 'utils/objects'

export const parseBody: RequestHandler = (req, _res, next) => {
  if (!Objects.isEmpty(req.body)) {
    const body = {}
    Object.entries(req.body).forEach(([key, value]) => {
      Objects.set(body, key, value)
    })
    // eslint-disable-next-line no-param-reassign
    req.body = body
  }
  next()
}

export const FormDataBodyMiddleware = {
  parseBody,
}
