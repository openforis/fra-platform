import { Request } from 'express'

import { CountryIso } from 'meta/area'
import { AssessmentName, CycleName, SectionName } from 'meta/assessment'

// base params
export type CycleParams = {
  authContext?: string // authContext is a string created as encodeURIComponent(JSON.stringify({assessmentName, cycleName}))
  assessmentName: AssessmentName
  countryIso: CountryIso
  cycleName: CycleName
}

export type CycleDataParams = CycleParams & {
  sectionName: SectionName
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

// layers
export type { ForestAgreementLayerRequest, LayerRequest } from './geo/layer'

// user
export type { UsersRequest } from './admin/users'

// file
export type { BiomassStockFileRequest } from './file/biomassStockFile'
