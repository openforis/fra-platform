import { Request } from 'express'

import { CountryIso } from 'meta/area'

// base params
export type CycleParams = {
  assessmentName: string
  countryIso: CountryIso
  cycleName: string
}

export type CycleDataParams = CycleParams & {
  sectionName: string
}

// base requests
export type CycleRequest<QueryParams = any, Body = any> = Request<never, never, Body, QueryParams & CycleParams>

export type CycleDataRequest<QueryParams = any, Body = any> = Request<never, never, Body, QueryParams & CycleDataParams>

// init
export type { InitRequest } from './init/init'

// auth
export type { LoginRequest } from './auth/login'

// cycleData
export type { EstimateBody, NodesBody, NodesBodyValue } from './cycleData/table'

// assessmentFile
export type { AssessmentFileBody } from './file/assessmentFile'

// layers
export type { ForestAgreementLayerRequest, LayerRequest } from './geo/layer'

// user
export type { UsersRequest } from './admin/users'

// file
export type { BiomassStockFileRequest } from './file/biomassStockFile'
