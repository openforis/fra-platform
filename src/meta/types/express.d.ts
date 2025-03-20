import { Country } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'

export interface RequestContext {
  assessment?: Assessment
  cycle?: Cycle
  country?: Country
}

declare module 'express' {
  interface Request {
    context: RequestContext
  }
}

export {}
