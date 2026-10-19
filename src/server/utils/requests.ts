import { Request, Response } from 'express'

import { User } from 'meta/user/user'
import { Objects } from 'utils/objects'

import { Logger } from 'server/utils/logger'
import { ProcessEnv } from 'server/utils/processEnv'

import { AccessControlException } from './accessControl'

/* Response Utils */

export const sendErr = (res: any, err?: any, statusCode = err.statusCode ?? 500): void => {
  Logger.error(err.toString())
  if (err instanceof AccessControlException) {
    // @ts-ignore
    res.status(403).json({ error: err.error })
  } else if (typeof err === 'string') {
    res.status(statusCode).json({ error: err })
  } else {
    res.status(statusCode).json({
      error: err.message ?? 'Could not serve',
    })
  }
}

// Response helper functions
// Sends an empty JSON message with status 200
const send = (res: Response, data: any = {}): void => {
  res.send(data)
}
export const sendOk = (res: any, value = {}): void => {
  res.json(value)
}
export const send404 = (res: any): void => {
  res.status(404).send('404 / Page not found')
}
export const send400 = (res: any, err?: any): void => {
  sendErr(res, err, 400)
}

/* Request Utils  */
export const methods = {
  GET: 'GET',
}

export const getMethod = (req: Request): string => req.method
export const isGet = (req: Request): boolean => getMethod(req) === methods.GET

const parseStringBoolean = (str: any): any => ((str ?? ['true', 'false'].includes(str)) ? JSON.parse(str) : str)
export const getParams = (req: Request): any =>
  Object.entries({
    ...(req.query ?? {}),
    ...(req.params ?? {}),
    ...(req.body ?? {}),
  }).map(([key, value]) => ({ [key]: parseStringBoolean(value) }))

export const serverUrl = (req: Request): string =>
  Objects.isEmpty(ProcessEnv.appUri) ? `${req.protocol}://${req.get('host')}` : ProcessEnv.appUri

const getUser = (req: Request): User => {
  return req.user as User
}

const getContentLanguage = (req: Request): string => {
  return req.headers['content-language'] as string
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
  getContentLanguage,
}

export default Requests
