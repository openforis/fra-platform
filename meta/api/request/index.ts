import { Request } from 'express'

import { CountryIso } from '@meta/area'

// base params
export type CycleParams = {
  assessmentName: string
  countryIso: CountryIso
  cycleName: string
}

export type CycleDataParams = CycleParams & {
  // TODO: rename to sectionName
  section: string
  sectionName: string
}

// base request
export type CycleRequest<QueryParams = any, Body = any> = Request<never, never, Body, QueryParams & CycleParams>
export type CycleDataRequest<QueryParams = any, Body = any> = Request<never, never, Body, QueryParams & CycleDataParams>

// init
export type { InitRequest } from './init/init'

// auth
export type { LoginRequest } from './auth/login'

// cycleData
export type { NodesBody, NodesBodyValue } from './cycleData/table'
