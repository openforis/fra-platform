import { Country } from 'meta/area'

export interface RequestContext {
  // assessment?: Assessment
  // cycle?: Cycle
  country?: Country
}

declare module 'express' {
  interface Request {
    context: RequestContext
  }
}

export {}
