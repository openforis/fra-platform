import { Request } from 'express'

export type InitRequest = Request<never, never, never, { assessmentName: string; cycleName?: string }>
