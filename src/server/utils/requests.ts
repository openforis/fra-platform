import { Request, Response } from 'express'
import { Objects } from 'utils/objects'

import { User } from 'meta/user'

import { ProcessEnv } from 'server/utils/processEnv'

import { AccessControlException } from './accessControl'

/* Response Utils */

export const sendErr = (res: any, err?: any, statusCode = 500) => {
  if (err instanceof AccessControlException) {
    // @ts-ignore
    res.status(403).json({ error: err.error })
  } else if (typeof err === 'string') {
    res.status(statusCode).json({ error: err })
  } else {
    res.status(statusCode).json({ error: err.message ? err.message : 'Could not serve' })
  }
}

// Response helper functions
// Sends an empty JSON message with status 200
const send = (res: Response, data: any = {}) => res.send(data)
export const sendOk = (res: any, value = {}) => res.json(value)
export const send404 = (res: any) => res.status(404).send('404 / Page not found')
export const send400 = (res: any, err?: any) => sendErr(res, err, 400)

/* Request Utils  */
export const methods = {
  GET: 'GET',
}

export const getMethod = (req: Request) => req.method
export const isGet = (req: Request) => getMethod(req) === methods.GET

const parseStringBoolean = (str: any) => (str ?? ['true', 'false'].includes(str) ? JSON.parse(str) : str)
export const getParams = (req: Request) =>
  Object.entries({
    ...(req.query ?? {}),
    ...(req.params ?? {}),
    ...(req.body ?? {}),
  }).map(([key, value]) => ({ [key]: parseStringBoolean(value) }))

export const serverUrl = (req: Request) =>
  Objects.isEmpty(ProcessEnv.appUri) ? `${req.protocol}://${req.get('host')}` : ProcessEnv.appUri

const getUser = (req: Request) => {
  return req.user as User
}

export const Requests = {
  isGet,
  getMethod,
  getParams,

  send,
  send404,
  send400,
  sendErr,
  sendOk,
  serverUrl,

  // User
  getUser,
}

export default Requests
