import { IncomingMessage, ServerResponse } from 'http'
import { Request, RequestHandler, Response } from 'express'

// engine.io adds the parsed query string to the request as _query
type HandshakeRequest = IncomingMessage & { _query: Record<string, string> }

type HandshakeMiddleware = (req: HandshakeRequest, res: ServerResponse, next: (err?: unknown) => void) => void

// Runs the middleware once per connection, on the handshake request
export const onlyHandshake = (middleware: RequestHandler): HandshakeMiddleware => {
  return (req, res, next) => {
    // Requests after the handshake have the connection id (sid) in the query
    const isHandshake = req._query.sid === undefined
    if (!isHandshake) return next()

    // Express middleware works on Node's request and response, only the types differ
    return middleware(req as unknown as Request, res as unknown as Response, next)
  }
}
