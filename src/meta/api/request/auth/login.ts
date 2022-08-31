import { Request } from 'express'

export type LoginRequest = Request<unknown, unknown, unknown, { invitationUuid: string; state: string }>
