import { NextFunction, Request, RequestHandler, Response } from 'express'

import { Objects } from 'utils/objects'

// engine.io adds the parsed query string to the request as _query
type HandshakeRequest = Request & { _query: Record<string, string> }

// Express middleware works on Node's request and response, only the types differ
type HandshakeMiddleware = (req: HandshakeRequest, res: Response, next: NextFunction) => void

// Runs the middleware once per connection, on the handshake request
export const onlyHandshake = (middleware: RequestHandler): HandshakeMiddleware => {
  return (req, res, next) => {
    // Requests after the handshake have the connection id (sid) in the query
    const isHandshake = Objects.isEmpty(req._query.sid)
    if (!isHandshake) return next()

    return middleware(req, res, next)
  }
}
