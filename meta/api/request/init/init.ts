import { Request } from 'express'

export type InitRequest = Request<never, never, never, { name: string }>
