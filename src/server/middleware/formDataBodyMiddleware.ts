import { RequestHandler } from 'express'
import { Objects } from 'utils/objects'

export const parseBody: RequestHandler = (req, _res, next) => {
  if (!Objects.isEmpty(req.body)) {
    const body = {}
    Object.entries(req.body).forEach(([key, value]) => {
      let parsedValue = value
      if (value === 'true') parsedValue = true
      if (value === 'false') parsedValue = false
      Objects.set(body, key, parsedValue)
    })
    // eslint-disable-next-line no-param-reassign
    req.body = body
  }
  next()
}

export const FormDataBodyMiddleware = {
  parseBody,
}
