import { NextFunction, Request, RequestHandler, Response } from 'express'

import { Objects } from 'utils/objects'

type HandshakeRequest = Request & { _query: Record<string, string> }

type HandshakeMiddleware = (req: HandshakeRequest, res: Response, next: NextFunction) => void

export const onlyHandshake = (middleware: RequestHandler): HandshakeMiddleware => {
  return (req, res, next) => {
    // Requests after the handshake have the connection id (sid) in the query
    const isHandshake = Objects.isEmpty(req._query.sid)
    if (!isHandshake) return next()

    return middleware(req, res, next)
  }
}
